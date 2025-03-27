import React from "react";
import GptSearchBar from "./GptSearchBar";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img
          className="h-screen object-cover w-screen"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <GptSearchBar />
    </div>
  );
};

export default GptSearch;
