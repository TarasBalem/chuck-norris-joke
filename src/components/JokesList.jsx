import React from "react";
import PropTypes from "prop-types";
import JokeCard from "./JokeCard";

const JokesList = ({jokes}) => {
  return (
    <div className="jokes-list">
      {jokes.map((joke) => (
        <JokeCard joke={joke} key={joke.id} className="jokes-list" />
      ))}
    </div>
  );
};

JokesList.propTypes = {
  jokes: PropTypes.array.isRequired,
};

JokesList.defaultProps = {
  jokes: [],
};

export default JokesList;
