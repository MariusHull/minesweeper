import React, { Component } from "react";
import Cell from "./Cell";
import "../styles/global.scss";
import "../styles/game.scss";

class Board extends Component {
  handleLeftClick = (e, value, indexes) => {
    console.log("LB click ! ", e.button);
    console.log("Cell value : ", value);
    console.log("Index value : ", indexes[0], indexes[1]);
    this.props.reveal(indexes[0], indexes[1]);
  };

  handleRightClick = (e, value, indexes) => {
    e.preventDefault();
    console.log("RB click ! ", e.button);
    console.log("Cell value", value);
    console.log("Index value : ", indexes[0], indexes[1]);
    this.props.flag(indexes[0], indexes[1]);
  };

  render() {
    let rowIndex = -1;
    let colIndex = -1;
    return (
      <div className="card col-md-auto overflow-auto">
        &nbsp;
        <table>
          <tbody>
            {this.props.board !== undefined &&
              this.props.board.map(row => {
                rowIndex += 1;
                colIndex = -1;
                return (
                  <tr key={rowIndex}>
                    {row.map(cell => {
                      colIndex += 1;
                      const indexes = [rowIndex, colIndex];
                      return (
                        <Cell
                          key={[rowIndex, colIndex]}
                          colIndex={colIndex}
                          value={cell.value}
                          indexes={indexes}
                          status={cell.status}
                          handleLeftClick={this.handleLeftClick}
                          handleRightClick={this.handleRightClick}
                        />
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
