import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";

class ModalSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 8,
      col: 8,
      mines: 10,
      selected: "Beginner"
    };
  }

  // Updates the custom values.
  onCustom = e => {
    switch (e.target.id) {
      case "row":
        this.setState({ row: e.target.value });
        break;
      case "col":
        this.setState({ col: e.target.value });
        break;
      case "mines":
        this.setState({ mines: e.target.value });
        break;

      default:
        break;
    }
  };

  // Changes the number of columns, rows and mines passed to the game component.
  onChange = e => {
    switch (e.target.value) {
      case "beginner":
        this.setState({ selected: "Beginner" });
        this.props.onChange("Beginner", 8, 8, 10);
        break;
      case "inter":
        this.setState({ selected: "Intermediate" });
        this.props.onChange("Intermediate", 16, 16, 40);
        break;
      case "expert":
        this.setState({ selected: "Expert" });
        this.props.onChange("Expert", 32, 16, 100);
        break;

      case "custom":
        this.setState({ selected: "Custom" });
        this.props.onChange(
          "Custom",
          this.state.row,
          this.state.col,
          this.state.mines
        );
        break;

      default:
        break;
    }
  };

  // Checks if another update is required (value modified after clicking custom) and closes the modal
  confirm = () => {
    const { row, col, mines, selected } = this.state;
    if (selected === "Custom") {
      if (
        row < 17 &&
        row > -1 &&
        col > -1 &&
        col < 33 &&
        mines > 0 &&
        mines < row * col
      ) {
        this.props.onChange(
          "Custom",
          this.state.row,
          this.state.col,
          this.state.mines
        );
        this.props.closeModal();
      } else {
        window.alert(
          "Please enter a number of rows between 0 and 16, of columns between 0 and 32 and at least 1 mine!"
        );
      }
    } else {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <Modal
        style={{ zIndex: 10 }}
        open={this.props.open}
        onClose={this.props.closeModal}
        center
      >
        <br />
        <p>You can choose the game settings here !</p>
        <br />
        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio1"
            name="customRadio"
            class="custom-control-input"
            value={"beginner"}
            onChange={this.onChange}
            checked={this.props.level === "Beginner"}
          />
          <label className="custom-control-label" for="customRadio1">
            Beginner (8x8, 10 mines)
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio2"
            name="customRadio"
            class="custom-control-input"
            value={"inter"}
            onChange={this.onChange}
            checked={this.props.level === "Intermediate"}
          />
          <label className="custom-control-label" for="customRadio2">
            Intermediate (16x16 , 40 mines)
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio3"
            name="customRadio"
            class="custom-control-input"
            value={"expert"}
            onChange={this.onChange}
            checked={this.props.level === "Expert"}
          />
          <label className="custom-control-label" for="customRadio3">
            Expert (32x16 , 100 mines)
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio4"
            name="customRadio"
            class="custom-control-input"
            value={"custom"}
            onChange={this.onChange}
            checked={this.props.level === "Custom"}
          />
          <label className="custom-control-label" for="customRadio4">
            Custom :{" "}
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  id={"row"}
                  className="form-control"
                  placeholder="Rows"
                  value={this.state.row}
                  onChange={this.onCustom}
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  id={"col"}
                  className="form-control"
                  placeholder="Columns"
                  value={this.state.col}
                  onChange={this.onCustom}
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  id={"mines"}
                  className="form-control"
                  placeholder="Mines"
                  value={this.state.mines}
                  onChange={this.onCustom}
                />
              </div>
            </div>
          </label>
        </div>
        <br />
        <button type="button" className="btn btn-dark" onClick={this.confirm}>
          Confirm
        </button>
      </Modal>
    );
  }
}

export default ModalSettings;
