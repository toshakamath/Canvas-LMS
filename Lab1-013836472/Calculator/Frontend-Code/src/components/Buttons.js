import React, { Component } from "react";

class Buttons extends Component {
  submit = (e) => {
    this.props.sv(e.target.value);
  };

  render() {
    return (
      <div className="button">
        <div id="row0">
          <button
            onClick={this.submit}
            value="Cls"
            id="Cls"
            class="btn btn-warning"
          >
            Cls
          </button>
          <button
            onClick={this.submit}
            value="*"
            id="multiply"
            class="btn btn-info"
          >
            *
          </button>
        </div>
        <div id="row1">
          <button
            onClick={this.submit}
            value="7"
            id="seven"
            class="btn btn-primary"
          >
            7
          </button>
          <button
            onClick={this.submit}
            value="8"
            id="eight"
            class="btn btn-primary"
          >
            8
          </button>
          <button
            onClick={this.submit}
            value="9"
            id="nine"
            class="btn btn-primary"
          >
            9
          </button>
          <button
            onClick={this.submit}
            value="/"
            id="divide"
            class="btn btn-info"
          >
            /
          </button>
        </div>
        <div id="row2">
          <button
            onClick={this.submit}
            value="4"
            id="four"
            class="btn btn-primary"
          >
            4
          </button>
          <button
            onClick={this.submit}
            value="5"
            id="five"
            class="btn btn-primary"
          >
            5
          </button>
          <button
            onClick={this.submit}
            value="6"
            id="six"
            class="btn btn-primary"
          >
            6
          </button>
          <button
            onClick={this.submit}
            value="-"
            id="subtract"
            class="btn btn-info"
          >
            -
          </button>
        </div>
        <div id="row3">
          <button
            onClick={this.submit}
            value="1"
            id="one"
            class="btn btn-primary"
          >
            1
          </button>
          <button
            onClick={this.submit}
            value="2"
            id="two"
            class="btn btn-primary"
          >
            2
          </button>
          <button
            onClick={this.submit}
            value="3"
            id="three"
            class="btn btn-primary"
          >
            3
          </button>
          <button onClick={this.submit} value="+" id="add" class="btn btn-info">
            +
          </button>
        </div>
        <div id="row4">
          <button
            onClick={this.submit}
            value="0"
            id="zero"
            class="btn btn-primary"
          >
            0
          </button>
          <button
            onClick={this.submit}
            value="."
            id="decimal"
            class="btn btn-primary"
          >
            .
          </button>
          <button
            onClick={this.submit}
            value="="
            id="equalto"
            class="btn btn-success"
          >
            =
          </button>
        </div>
      </div>
    );
  }
}

export default Buttons;
