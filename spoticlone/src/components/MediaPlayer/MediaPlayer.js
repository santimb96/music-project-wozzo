import React, { useEffect, useState, useRef } from "react";
import inTheArmyNow from "../../audio/inTheArmyNow.mp3";
import format from "format-duration";
import "./index.scss";

const MediaPlayer = ({ song, nextSong }) => {
  const [playing, setPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volControl, setVolControl] = useState(0.3);
  const [mute, setMute] = useState(false);
  const [loop, setLoop] = useState(false);
  const [ended, setEnded] = useState(false);

  const audioRef = useRef(new Audio(""));
  const intervalRef = useRef();

  const progressBarRef = useRef();
  const volBarRef = useRef();
  const loopRef = useRef();
  const { duration } = audioRef.current;

  useEffect(() => {
    audioRef.current.src = song.audioUrl;
    setTrackProgress(0);
    audioRef.current.play();
    setPlaying(true);
  }, [song]);

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
    }, [1000]);
  };

  useEffect(() => {
    loop
      ? loopRef.current.classList.add("loop-button-active")
      : loopRef.current.classList.remove("loop-button-active");
    audioRef.current.onended = () => {
      if (loop) {
        setPlaying(true);
        onPlay();
      } else {
        setPlaying(false);
        setEnded(true);
        clearInterval(intervalRef.current);
        nextSongToPlay();
      }
    };
  }, [loop]);

  const nextSongToPlay = () => {
    nextSong();
  };

  const onLoop = () => {
    setLoop((prev) => (prev ? false : true));
  };

  const onPlay = () => {
    if (playing) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    onPlay();
  }, [playing]);

  useEffect(() => {
    if (mute) {
      audioRef.current.volume = 0;
      setVolControl(0);
    } else if (!mute && volControl > 0) {
      audioRef.current.volume = volControl;
      setVolControl(audioRef.current.volume);
    } else {
      audioRef.current.volume = 0.3;
      setVolControl(0.3);
    }
  }, [mute]);

  useEffect(() => {
    if (volControl === 0) setMute(true);
    audioRef.current.volume = volControl;
  }, [volControl]);

  const onChangeTrack = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
    startTimer();
  };

  const onChangeVol = (value) => {
    setVolControl(value / 100);
  };

  const volIconRender = () => {
    if (mute && volControl === 0) {
      return (
        <i
          onClick={() => setMute((prev) => (prev ? false : true))}
          className="fa-solid fa-volume-xmark pe-3 text-light vol-icon"
        ></i>
      );
    } else if (volControl <= 0.5 && volControl !== 0) {
      return (
        <i
          onClick={() => setMute((prev) => (prev ? false : true))}
          className="fa-solid fa-volume-down pe-3 text-light vol-icon"
        ></i>
      );
    } else {
      return (
        <i
          onClick={() => setMute((prev) => (prev ? false : true))}
          className="fa-solid fa-volume-high pe-3 text-light vol-icon"
        ></i>
      );
    }
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
              {playing ? (
                <i
                  onClick={() => setPlaying(false)}
                  className="fa-solid fa-circle-pause player-buttons"
                ></i>
              ) : (
                <i
                  onClick={() => setPlaying(true)}
                  className="fa-solid fa-circle-play player-buttons"
                ></i>
              )}
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center pt-3">
              {volIconRender()}
              <input
                ref={volBarRef}
                type="range"
                value={volControl * 100}
                step="1"
                min="0"
                max="100"
                className="slider-vol"
                onChange={(e) => onChangeVol(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center player">
            <p className="current-time-player">
              {format(trackProgress * 1000)}
            </p>
            <div className="progress-bar">
              <input
                ref={progressBarRef}
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                className="slider"
                onChange={(e) => onChangeTrack(e.target.value)}
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
