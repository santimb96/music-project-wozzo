import React, { useEffect, useState, useRef } from "react";
import inTheArmyNow from "../audio/inTheArmyNow.mp3"


const MediaPlayer = ({ song }) => {
  const [playing, setPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  const audioRef = useRef(new Audio(inTheArmyNow));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const {duration} = audioRef.current;




  useEffect(() => {
    playing ? console.warn(audioRef.current.pause()) : console.warn(audioRef.current.play(), audioRef.current.currentTime);   
  }, [playing])
  
  return (
    <div className="row d-flex justify-content-center mt-2">
      <div className="col-12 col-md-10 p-0 bg-dark">
        <div className="bg-light">
          <div className="d-flex justify-content-center p-2">
            {playing ? (
              <i onClick={() => setPlaying(false)} class="fa-solid fa-pause fs-4"></i>
            ) : (
              <i onClick={() => setPlaying(true)} className="fa-solid fa-play fs-4"></i>
            )}
          </div>
          <div className="d-flex justify-content-center p-2">
            <div className="progress-bar">
              <div className="progress-buffered">hi</div>
              <div className="progress-played"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
