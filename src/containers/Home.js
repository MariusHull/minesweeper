import React, { Component } from "react";
import ModalSettings from "./Settings";
import Game from "./Game";
import "../styles/game.scss";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      level: "Beginner",
      row: 8,
      col: 8,
      mines: 10
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  // Sets the number of mines and tiles
  onChange = (level, rows, cols, mines) => {
    console.log(level, rows, cols, mines);
    this.setState({ level: level, row: rows, col: cols, mines: mines });
  };

  render() {
    const { open, level, row, col, mines } = this.state;
    return (
      <div className="container">
        <ModalSettings
          closeModal={this.onCloseModal}
          onOpenModal={this.onOpenModal}
          open={open}
          level={level}
          onChange={this.onChange}
        />
        <h1>Welcome in the minesweeper game !</h1>

        <Game
          row={row}
          col={col}
          mines={mines}
          onOpenModal={this.onOpenModal}
        />
      </div>
    );
  }
}

export default HomePage;
