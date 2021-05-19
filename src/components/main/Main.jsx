import React, {useState, useEffect} from "react";
import "./Main.scss";
import axios from "axios";
import JokeContext from "../../contexts/JokeContext";
import JokesList from "./JokesList";

const URL = "https://api.chucknorris.io/jokes";

const Main = () => {
  const [jokes, setJokes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [getJokeWith, setGetJokeWith] = useState("random");

  useEffect(() => {
    axios
      .get(`${URL}/categories`)
      .then((response) => setCategories(response.data));
  }, []);

  const fetchJoke = () => {
    if (getJokeWith === "categories") {
      axios
        .get(`${URL}/random?category=${selectedCategory}`)
        .then((response) => setJokes([{favorite: false, ...response.data}]));
    } else if (getJokeWith === "search") {
      axios
        .get(`${URL}/search?query=${textSearch}`)
        .then((response) => response.data.result)
        .then((data) => {
          data = data.map((d) => ({favorite: false, ...d}));
          return data;
        })
        .then((jokes) => setJokes(jokes));
    } else {
      axios
        .get(`${URL}/random`)
        .then((response) => setJokes([{favorite: false, ...response.data}]));
    }
  };

  const handleChangeRadio = ({target}) => {
    setSelectedCategory("");
    setTextSearch("");
    setGetJokeWith(target.value);
  };

  const handleChangeCategory = ({target}) => setSelectedCategory(target.id);

  const handleChangeTextSearch = ({target}) => setTextSearch(target.value);

  const handleFavorite = (id) => {
    setJokes((jokes) =>
      jokes.map((f) => (f.id === id ? {...f, favorite: !f.favorite} : f))
    );
  };

  return (
    <JokeContext.Provider value={{handleFavorite}}>
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
        <JokesList jokes={jokes} />
      </div>
    </JokeContext.Provider>
  );
};

export default Main;
