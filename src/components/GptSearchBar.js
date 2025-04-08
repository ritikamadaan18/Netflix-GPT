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

  const handleGptSearchClick = async () => {
    console.log("Button Clicked:", searchText.current.value);
    console.count("API Call Count"); // To check how many times API is hit

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query : ${searchText.current.value}. Only give me names of 5 movies, comma-separated like this example: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;
    try {
      // const response = await fetch(
      //   "https://api.openai.com/v1/chat/completions",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${OPENAI_KEY}`,
      //     },
      //     body: JSON.stringify({
      //       model: "gpt-4o",
      //       messages: [{ role: "user", content: gptQuery }],
      //     }),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error(`Error: ${response.status}`);
      // }

      // const gptResults = await response.json();

      // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

      const gptMovies = [
        "Andaz Apna Apna",
        "Hera Pheri",
        "Chupke Chupke",
        "Jaane Bhi Do Yaaro",
        "Padosan",
      ];

      // For each movie we call TMDB api

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error fetching GPT results:", error);
    }
  };

  return (
    <div className="pt-[20%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
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
