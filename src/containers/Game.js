import React, { Component } from "react";
import Board from "../components/Board";

class GamePage extends Component {
  render() {
    return (
      <div>
        Game <Board board={[[1, 0, 0], [0, 0, 1], [1, 0, 0]]} />
      </div>
    );
  }
}

export default GamePage;
