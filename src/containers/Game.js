import React, { Component } from "react";
import Board from "../components/Board";
import Lost from "../components/Lost";
import Won from "../components/Won";
import "../styles/game.scss";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[]], // Stores the board.
      status: "noGame",
      mines: 30,
      minesFound: 0,
      flags: 0,
      rows: 15,
      cols: 15,
      seconds: 0
    };
  }

  timer = undefined;

  //Initiates the rows and columns to the good values on mounting.
  componentWillMount() {
    this.setState({
      rows: this.props.row,
      cols: this.props.col,
      mines: this.props.mines
    });
    // Creates the board with the props values
    this.initBoard(this.props.row, this.props.col, this.props.mines);
  }

  // Reveals the remaining mines when the user loses the game
  finishIt = () => {
    let { board } = this.state;
    board.forEach(row => {
      row.forEach(cell => {
        if (cell.value === "X" && cell.status !== "flagged") {
          cell.status = "revealed";
        }
      });
    });
    this.setState({ board });
  };

  // Resets the game status on button click
  reset = () => {
    this.initBoard(this.props.row, this.props.col, this.props.mines);
    console.log(this.timer);
    this.setState({
      seconds: 0,
      flags: 0,
      minesFound: 0,
      rows: this.props.row,
      cols: this.props.col,
      mines: this.props.mines
    });
    if (this.timer !== undefined) {
      // Clears the timer
      clearInterval(this.timer);
      this.timer = undefined;
      this.setState({
        seconds: 0
      });
    }
  };

  // Starts the timer on the first click
  launchGame = () => {
    if (this.timer === undefined) {
      this.timer = setInterval(() => {
        if (this.state.status === "inGame") {
          this.setState({ seconds: this.state.seconds + 1 });
        }
      }, 1000);
      console.log("timer loaded!");
    }
  };

  // Clears the timer if the user leaves the page
  componentWillUnmount() {
    clearInterval(this.call);
  }

  // Takes in argument the number of rows and columns R and C and returns an array of zeros of size R*C
  generate = (rows, cols) => {
    let boardRows = [];
    while (boardRows.length < rows) {
      let boardCols = [];
      while (boardCols.length < cols) {
        boardCols.push({ value: 0, status: "hidden" });
      }
      boardRows.push(boardCols);
    }
    return boardRows;
  };

  // Takes in argument the board and a number of mines and randomly places them
  mineGenerator = (nbMines, board) => {
    let placedMines = 0;
    while (placedMines < nbMines) {
      let xMine = Math.floor(Math.random() * board.length);
      let yMine = Math.floor(Math.random() * board[0].length);
      if (board[xMine][yMine].value === 0) {
        board[xMine][yMine].value = "X";
        placedMines += 1;
      }
    }
    return board;
  };
  // returns the coordinates of the neighbors of a cell of coordinates (x, y) in a board of dimensions xBoard*yBoard
  neighbors = (x, y, xBoard, yBoard) => {
    let neighbors = [];
    [
      [-1, -1],
      [-1, 1],
      [-1, 0],
      [1, -1],
      [1, 1],
      [1, 0],
      [0, -1],
      [0, 1]
    ].forEach(coordinates => {
      const newX = x + coordinates[0];
      const newY = y + coordinates[1];
      if (newX >= 0 && newX <= xBoard - 1 && newY >= 0 && newY <= yBoard - 1) {
        neighbors.push([newX, newY]);
      }
    });
    return neighbors;
  };

  // Returns the number of mines near a cell of coordinates (x, y)
  numberMines = (x, y, board) => {
    if (board[x][y].value === "X") {
      return "X";
    }
    const neighbors = this.neighbors(x, y, board.length, board[0].length);
    let adjacentBombs = 0;
    neighbors.forEach(neighbor => {
      if (board[neighbor[0]][neighbor[1]].value === "X") {
        adjacentBombs += 1;
      }
    });
    return adjacentBombs;
  };

  // Initiates a new board
  initBoard = (nbRows, nbCols, nbMines) => {
    // Builds the board and places the mines
    let board = this.mineGenerator(nbMines, this.generate(nbRows, nbCols));
    let rowCount = 0;
    // Writes the number on each cell with no mine
    while (rowCount < nbRows) {
      let colCount = 0;
      while (colCount < nbCols) {
        board[rowCount][colCount].value = this.numberMines(
          rowCount,
          colCount,
          board
        );
        colCount += 1;
      }
      rowCount += 1;
    }
    this.setState({ board: board, status: "inGame" });
  };

  // Reveals the cell of coordinates (x, y)
  reveal = (x, y) => {
    if (this.timer === undefined) {
      this.launchGame();
    }
    let { board, status } = this.state;
    if (
      board[x][y].status === "hidden" &&
      status !== "lost" &&
      status !== "won"
    ) {
      board[x][y].status = "revealed";
      if (board[x][y].value === "X") {
        status = "lost";
        this.finishIt(); // Fatality
      } else if (board[x][y].value === 0) {
        const neighbors = this.neighbors(x, y, board.length, board[0].length);
        neighbors.forEach(neighbor => {
          this.reveal(neighbor[0], neighbor[1]);
        });
      }
      this.setState({ board, status });
    } else {
      return;
    }
  };

  // Places a flag on the cell of coordinates (x, y)
  flag = (x, y) => {
    let { board, minesFound, flags, status } = this.state;
    let { mines } = this.props;
    if (board[x][y].status === "hidden" && status !== "lost") {
      board[x][y].status = "flagged";
      flags = flags + 1;
      if (board[x][y].value === "X") {
        minesFound = minesFound + 1;
      }
    } else if (board[x][y].status === "flagged") {
      board[x][y].status = "hidden";
      flags -= 1;
      if (board[x][y].value === "X") {
        minesFound -= 1;
      }
    }
    if (Number(mines) === minesFound) {
      this.setState({ status: "won" });
    }
    this.setState({ board, flags, minesFound });
  };

  render() {
    const { board, status, seconds } = this.state;
    return (
      <div className="container">
        {status === "lost" && <Lost />}
        {status === "won" && <Won score={seconds} />}
        {status === "noGame" && <div>Game loading...</div>}
        {(status === "inGame" || status === "won" || status === "lost") && (
          <div>
            <div className="row justify-content-md-center">
              <h3 className="col">Time : {seconds}</h3>
            </div>
            <div className="row justify-content-md-center">
              <Board board={board} reveal={this.reveal} flag={this.flag} />
            </div>
            <div className="row justify-content-md-center">
              <button
                type="button"
                onClick={this.props.onOpenModal}
                className="col btn btn-dark"
              >
                Settings !
              </button>
              <button
                type="button"
                onClick={this.reset}
                className="col btn btn-dark"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Game;
