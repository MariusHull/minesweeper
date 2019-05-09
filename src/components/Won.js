import React, { Component } from "react";
import nyan from "../assets/nyan.gif";
import "../styles/game.scss";

class Won extends Component {
  render() {
    return (
      <div className="container">
        <h3>You won in {this.props.score} seconds, well done!!! </h3>
        <img src={nyan} alt="loading" />
      </div>
    );
  }
}

export default Won;
