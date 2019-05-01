import React, { Component } from "react";

class Board extends Component {
  handleLeftClick = e => {
    console.log("LB click ! ", e.button, e.target.key);
  };

  handleRightClick = e => {
    e.preventDefault();
    console.log("RB click ! ", e.button);
  };

  render() {
    let rowIndex = 0;
    let colIndex = 0;
    return (
      <table>
        <tbody>
          {this.props.board.map(row => {
            rowIndex += 1;
            return (
              <tr key={rowIndex}>
                {row.map(cell => {
                  colIndex += 1;
                  return (
                    <td
                      key={colIndex}
                      onClick={this.handleLeftClick}
                      onContextMenu={this.handleRightClick}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Board;
