import React, { Component } from "react";
import "../styles/cell.scss";

class Cell extends Component {
  render() {
    return (
      <td
        className="cell"
        value={this.props.value}
        onClick={e =>
          this.props.handleLeftClick(e, this.props.value, this.props.indexes)
        }
        onContextMenu={e =>
          this.props.handleRightClick(e, this.props.value, this.props.indexes)
        }
      >
        {this.props.status === "hidden" && <div className="cell hidden" />}
        {this.props.status === "flagged" && (
          <div className="cell hidden flag">
            <i class="fas fa-flag" />
          </div>
        )}
        {this.props.status === "revealed" && this.props.value === "X" && (
          <div>
            <i class="fas fa-bomb" />
          </div>
        )}
        {this.props.status === "revealed" &&
          this.props.value !== "X" &&
          this.props.value}
      </td>
    );
  }
}

export default Cell;
