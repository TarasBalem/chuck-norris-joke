import React, {useState} from "react";
import "./Main.scss";
import axios from "axios";
import JokeCard from "./JokeCard";

const URL = "https://api.chucknorris.io/jokes/random";

const Main = () => {
  const [joke, setJoke] = useState({});

  const getRandomJoke = () => {
    axios.get(URL).then((response) => setJoke(response.data));
    console.log(joke);
  };

  return (
    <div className="main">
      <div className="main__title">
        <h2>Hey!</h2>
        <h3>Let's try to find a joke for you:</h3>
      </div>
      <div className="main__control">
        <input
          type="radio"
          name="control"
          className="control-item"
          id="random"
        />
        <label htmlFor="random">Random</label>
        <br />
        <input
          type="radio"
          name="control"
          className="control-item"
          id="categories"
        />
        <label htmlFor="categories">From categories</label>
        <br />
        <ul className="categories-list">categories</ul>
        <input
          type="radio"
          name="control"
          className="control-item"
          id="search"
        />
        <label htmlFor="search">Search</label>
        <br />
        <input
          type="text"
          className="input-text"
          placeholder="Free text search..."
        />
      </div>
      <button className="main__btn" onClick={getRandomJoke}>
        Get a joke
      </button>
      <JokeCard joke={joke} />
    </div>
  );
};

export default Main;
