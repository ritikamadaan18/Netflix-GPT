import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // const handleGptSearchClick = async (event) => {
  //   event.preventDefault(); // Stop event propagation (important for form submissions)

  //   if (isLoading) return; // Prevent multiple clicks
  //   setIsLoading(true);

  //   try {
  //     console.log("Button Clicked:", searchText.current.value);

  //     const gptQuery =
  //       "Act as a Movie Recommendation system and suggest some movies for the query : " +
  //       searchText.current.value +
  //       ". Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

  //     // const gptResults = await openai.chat.completions.create({
  //     //   messages: [{ role: "user", content: gptQuery }],
  //     //   model: "gpt-3.5-turbo",
  //     // });

  //     const gptResults = await openai.responses.create({
  //       model: "gpt-3.5-turbo",
  //       instructions: gptQuery,
  //       input: gptQuery,
  //     });

  //     console.log("GPT Results:", gptResults);
  //   } catch (error) {
  //     console.error("Error fetching GPT results:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // search for movie details in tmdb
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async (event) => {
    event.preventDefault(); // Stop event propagation (important for form submissions)

    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const response = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `bearer ${process.env.REACT_APP_COHERE_API_KEY}`, // or use your actual key here
        },
        body: JSON.stringify({
          model: "command-a-03-2025",
          messages: [
            {
              role: "user",
              content: gptQuery,
            },
          ],
        }),
      });

      const data = await response.json();

      const gptMovies = data.message?.content?.[0]?.text.split(",");

      // For each movie we call TMDB api

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]

      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error fetching Cohere results:", error);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full mx-4  bg-black grid grid-cols-12 md:w-1/2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-2 m-2 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-2 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
