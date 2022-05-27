import React, { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import format from "format-duration";
import "./index.scss";

const MediaPlayer = ({
  focus,
  selectedSong,
  goToNext,
  goToPrevious,
  isFavourite,
  onClickFavourite,
  setSelectedSong
}) => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const [playing, setPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volControl, setVolControl] = useState(0.3);
  const [loop, setLoop] = useState(false);

  const audioRef = useRef(new Audio(""));
  const intervalRef = useRef();
  const controlRef = useRef();

  const loopRef = useRef();
  const { duration } = audioRef?.current;

  useEffect(() => {
    const onSpace = (e) => {
      if (focus) return false;
      if (e.key === " " || e.code === "Space" || e.keyCode === 32) {
        if (audioRef.current.paused) {
          play(audioRef?.current?.currentTime);
        } else {
          pause();
        }
      }
    };
    document.addEventListener("keydown", onSpace);
    return () => document.removeEventListener("keydown", onSpace);
  }, [focus]);

  const play = (position) => {
    document.title = `${selectedSong?.name}`;
    audioRef.current.currentTime = position;
    audioRef.current.play();
    setPlaying(true);
  };

  const pause = () => {
    document.title = `Spoticlone`;
    audioRef.current.pause();
    setPlaying(false);
  };

  /**
   * When the song changes, change the song and play at position 0
   */

  useEffect(() => {
    play(0);
    audioRef.current.volume = volControl;
    document.title = `${selectedSong?.name}`; // Set the title
    // clear interval and add it for progress
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef?.current?.currentTime);
    }, [100]);
    return () => clearInterval(intervalRef.current);
  }, [selectedSong]);

  const onLoop = () => {
    setLoop((prev) => (prev ? false : true));
  };

  const onMute = () => {
    if (audioRef?.current?.volume === 0) {
      audioRef.current.volume = volControl; //prevous value. 0.3
    } else {
      audioRef.current.volume = 0;
    }
  };

  const volIconRender = () => {
    let cls = "fa-solid pe-3 text-light vol-icon ";

    if (audioRef?.current?.volume === 0) {
      cls = cls + "fa-volume-mute";
    } else if (
      audioRef?.current?.volume <= 0.5 &&
      audioRef?.current?.volume !== 0
    ) {
      cls = cls + "fa-volume-down";
    } else {
      cls = cls + "fa-volume-high";
    }
    return <i onClick={onMute} className={cls}></i>;
  };

  return (
    <div className="mt-2 media-container">
      <div className="player-container">
        <div className="row d-flex justify-content-center">
          <div className="col-4 d-flex d-flex justify-content-center pt-3 data-container">
          <div className="fav-icon-container">
              {isFavourite && user?._id ? (
                <i
                  onClick={() => onClickFavourite(selectedSong?._id, true)}
                  className="fa-solid fa-heart fav-icon-fav"
                ></i>
              ) : (
                <i
                  onClick={() => onClickFavourite(selectedSong?._id, false)}
                  className="fa-regular fa-heart fav-icon"
                ></i>
              )}
            </div>
           
            <div className="title-container">
              <h5 className="text-center song-title-player">
                {selectedSong?.name}
              </h5>
              <h6 className="text-center song-artist-name-player">
                {selectedSong?.artistName}
              </h6>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <i
                ref={loopRef}
                onClick={() => onLoop()}
                className={`fa-solid fa-repeat loop-button ${
                  loop ? "loop-button-active" : ""
                }`}
              ></i>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={selectedSong?.audioUrl}
            onEnded={() => {
              if (loop) {
                setPlaying(true);
                play(0);
              } else {
                pause();
                goToNext(true);
              }
            }}
          />
          <div className="col-4 pt-3 control-buttons">
            <div className="row d-flex justify-content-center">
              <div className="col-1 d-flex justify-content-center align-items-center">
                <i
                  onClick={() => goToPrevious(true)}
                  className="fa-solid fa-backward-step back-next-buttons"
                ></i>
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <i
                  ref={controlRef}
                  onClick={() =>
                    playing ? pause() : play(audioRef?.current?.currentTime)
                  }
                  className={
                    playing
                      ? "fa-solid fa-circle-pause player-buttons"
                      : "fa-solid fa-circle-play player-buttons"
                  }
                ></i>
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                <i
                  onClick={() => goToNext(true)}
                  className="fa-solid fa-forward-step back-next-buttons"
                ></i>
              </div>
            </div>
          </div>
          <div className="col-4 d-flex justify-content-start align-items-center pt-3">
            {volIconRender()}
            <input
              type="range"
              value={audioRef?.current?.volume * 100}
              step="1"
              min="0"
              max="100"
              className="slider-vol"
              onChange={(e) => {
                if (e.target.value / 100 !== audioRef.current.value) {
                  audioRef.current.volume = e.target.value / 100;
                  setVolControl(audioRef?.current?.volume);
                }
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center player">
          <p className="current-time-player">{format(trackProgress * 1000)}</p>
          <div className="progress-bar">
            <input
              type="range"
              value={trackProgress}
              step="1"
              min="0"
              max={duration ? duration : `${duration}`}
              className="slider"
              onChange={(e) => (audioRef.current.currentTime = e.target.value)}
            />
          </div>
          <p className="current-time-player">
            {audioRef && audioRef?.current?.currentTime > 0.5
              ? format(audioRef?.current?.duration * 1000)
              : "00:00"}
          </p>
        </div>
        <div className="close-button-container">
          <i onClick={() => setSelectedSong(null)} className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
