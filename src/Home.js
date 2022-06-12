import React from "react";
import "./App.css";

var hero = {
  backgroundImage: `url('/marsEdited2.jpg')`,
};

function Home() {
  return (
    <div className="homepage" style={hero}>
      <h1 className="titleStyle">Discover Mars</h1>
      <h4 className="subText">Through the eyes of a rover</h4>
    </div>
  );
}

export default Home;
