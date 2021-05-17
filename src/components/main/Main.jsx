import React, {useState, useEffect} from "react";
import "./Main.scss";
import axios from "axios";
import JokeCard from "./JokeCard";

const URL = "https://api.chucknorris.io/jokes";
// https://api.chucknorris.io/jokes/random?category={category}
// https://api.chucknorris.io/jokes/search?query={query}

const Main = () => {
  const [joke, setJoke] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [getJokeWith, setGetJokeWith] = useState("random");

  useEffect(() => {
    axios
      .get(`${URL}/categories`)
      .then((response) => setCategories(response.data));
    console.log(joke);
  }, [joke]);

  const fetchJoke = () => {
    if (getJokeWith === "categories") {
      axios
        .get(`${URL}/random?category=${selectedCategory}`)
        .then((response) => setJoke(response.data));
    } else if (getJokeWith === "search") {
      axios
        .get(`${URL}/search?query=${textSearch}`)
        .then((response) => setJoke(response.data));
    } else {
      axios.get(`${URL}/random`).then((response) => setJoke(response.data));
    }
  };

  const handleChangeRadio = ({target}) => {
    setGetJokeWith(target.value);
  };

  const handleChangeCategory = ({target}) => {
    setSelectedCategory(target.id);
  };

  const handleChangeTextSearch = ({target}) => {
    setTextSearch(target.value);
  };

  return (
    <div className="main">
      <div className="main__title">
        <h2>Hey!</h2>
        <h3>Let's try to find a joke for you:</h3>
      </div>
      <div className="main__control">
        <div className="control-item">
          <input
            checked={getJokeWith === "random"}
            onChange={handleChangeRadio}
            type="radio"
            name="control"
            id="random"
            value="random"
          />
          <label htmlFor="random">Random</label>
        </div>
        <div className="control-item">
          <input
            checked={getJokeWith === "categories"}
            onChange={handleChangeRadio}
            type="radio"
            name="control"
            id="categories"
            value="categories"
          />
          <label htmlFor="categories">From categories</label>
          {getJokeWith === "categories" && (
            <ul className="categories-list">
              {categories.map((category) => (
                <li
                  key={category}
                  id={category}
                  onClick={handleChangeCategory}
                  className={`categories-item ${
                    category === selectedCategory ? "active" : ""
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="control-item">
          <input
            checked={getJokeWith === "search"}
            onChange={handleChangeRadio}
            type="radio"
            name="control"
            id="search"
            value="search"
          />
          <label htmlFor="search">Search</label>
          {getJokeWith === "search" && (
            <input
              value={textSearch}
              onChange={handleChangeTextSearch}
              type="text"
              className="input-text"
              placeholder="Free text search..."
            />
          )}
        </div>
      </div>
      <button className="main__btn" onClick={fetchJoke}>
        Get a joke
      </button>
      {joke.value && <JokeCard joke={joke} />}
    </div>
  );
};

export default Main;
