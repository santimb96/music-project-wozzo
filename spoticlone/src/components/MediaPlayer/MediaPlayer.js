import React, { useEffect, useState, useRef } from "react";
import inTheArmyNow from "../../audio/inTheArmyNow.mp3";
import format from "format-duration";
import "./index.scss";

const MediaPlayer = ({ song, nextSong, focus }) => {
  const [playing, setPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [loop, setLoop] = useState(false);

  const audioRef = useRef(new Audio(""));
  const intervalRef = useRef();
  const controlRef = useRef();

  const loopRef = useRef();
  const { duration } = audioRef.current;

  
  useEffect(() => {
    const onSpace = (e) => {
      console.warn(focus);
      if(focus) return false;
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
    audioRef.current.currentTime = position;
    audioRef.current.play();
    setPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  /**
   * When the song changes, change the song and play at position 0
   */

  useEffect(() => {
    audioRef.current.src = song.audioUrl;
    play(0);

    // clear interval and add it for progress
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
    }, [100]);
    return () => clearInterval(intervalRef.current);
  }, [song]);

  useEffect(() => {
    loop
      ? loopRef.current.classList.add("loop-button-active")
      : loopRef.current.classList.remove("loop-button-active");
    audioRef.current.onended = () => {
      if (loop) {
        setPlaying(true);
        play(0);
      } else {
        pause();
        nextSong();
      }
    };
  }, [loop]);

  const onLoop = () => {
    setLoop((prev) => (prev ? false : true));
  };

  const onMute = () => {
    if (audioRef?.current?.volume === 0) {
      audioRef.current.volume = 0.3;
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
    <div className="row d-flex justify-content-center mt-2 media-container">
      <div className="col-12 col-md-10 p-0 bg-dark">
        <div className="player-container">
          <div className="row">
            <div className="col-3 d-flex d-flex justify-content-end pt-3">
              <div className="d-flex flex-column">
                <h5 className="text-center song-title-player">{song.name}</h5>
                <h6 className="text-center song-artist-name-player">
                  {song.artistName}
                </h6>
              </div>
            </div>
            <div className="col-1 d-flex justify-content-center pt-4">
              <i
                ref={loopRef}
                onClick={() => onLoop()}
                class="fa-solid fa-repeat loop-button"
              ></i>
            </div>
            <div className="col-2 d-flex justify-content-end p-2">
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
            <div className="col-6 d-flex justify-content-center align-items-center pt-3">
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
                  }
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center player">
            <p className="current-time-player">
              {format(trackProgress * 1000)}
            </p>
            <div className="progress-bar">
              <input
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                className="slider"
                onChange={(e) =>
                  (audioRef.current.currentTime = e.target.value)
                }
              />
            </div>
            <p className="current-time-player">
              {audioRef && audioRef.current.currentTime > 0
                ? format(audioRef.current.duration * 1000)
                : "00:00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

MediaPlayer.defaultProps = {
  song: {
    audioUrl: inTheArmyNow,
    name: "In The Army Now",
    artistName: "StatusQuo",
  },
};

export default MediaPlayer;
