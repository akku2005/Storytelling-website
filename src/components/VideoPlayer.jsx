import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="my-4 cursor-pointer " onClick={handleVideoClick}>
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls={true}
        width="100%"
        height="300px"
        playing={isPlaying}
        onClick={handleVideoClick}
      />
    </div>
  );
};

export default VideoPlayer;
