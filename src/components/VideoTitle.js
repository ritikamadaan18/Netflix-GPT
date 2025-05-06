import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block w-1/4 py-6 text-lg">{overview}</p>
      <div className="my-4 md:m-0">
        <button className="bg-white py-1 md:py-2 px-3 md:px-6 text-lg text-black rounded-md mr-2 hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 p-2 px-6 text-lg text-white rounded-md mr-2 bg-opacity-50">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
