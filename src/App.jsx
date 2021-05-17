import React from "react";
import "./App.scss";
import Main from "./components/main/Main";
import Favorite from "./components/favorite/Favorite";

const App = () => {
  return (
    <div className="app">
      <Main />
      <Favorite />
    </div>
  );
};

export default App;
