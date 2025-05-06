import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <img
      className="w-36 md:w-48 mr-4"
      alt="Movie Card"
      src={IMG_CDN_URL + posterPath}
    />
  );
};

export default MovieCard;
