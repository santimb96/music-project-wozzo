import React, { useEffect, useState, useRef } from "react";
import inTheArmyNow from "../audio/inTheArmyNow.mp3";
import format from "format-duration";

const MediaPlayer = ({ song }) => {
  const [playing, setPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volControll, setVolControll] = useState(0.3);

  const audioRef = useRef(new Audio(inTheArmyNow));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const progressBarRef = useRef();
  const volBarRef = useRef();

  const { duration } = audioRef.current;

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setPlaying(false);
        clearInterval(intervalRef.current);
      } else {
        setTrackProgress(audioRef.current.currentTime);
        
      }
    }, [1000]);
  };

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    audioRef.current.volume = volControll;
  }, [volControll])

  const onChangeTrack = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
    startTimer();
  };

  console.log(audioRef.current);

  const onChangeVol = (value) => {
    setVolControll(value/100);
  }

  const volIconRender = () => {
    if(volControll === 0){
      return <i className="fa-solid fa-volume-xmark pe-2 text-light"></i>
    } else if (volControll <= 0.5){
      return <i class="fa-solid fa-volume-down pe-2 text-light"></i>
    } else {
      return <i class="fa-solid fa-volume-high pe-2 text-light"></i>
    }
  }

  return (
    <div className="row d-flex justify-content-center mt-2 media-container">
      <div className="col-12 col-md-10 p-0 bg-dark">
        <div className="player-container">
          <div className="row">
            <div className="col-4 d-flex jutify-content-center flex-column pt-3">
                <h5 className=" song-title-player">{song.name}</h5>
                <h6 className=" song-artist-name-player">{song.artistName}</h6>
            </div>
          <div className="col-2 d-flex justify-content-end p-2">
            {playing ? (
              <i
                onClick={() => setPlaying(false)}
                class="fa-solid fa-circle-pause player-buttons"
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
                value={volControll * 100}
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
              {/* <div className="progress-buffered">hi</div> */}
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
              {format(audioRef.current.duration * 1000)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
