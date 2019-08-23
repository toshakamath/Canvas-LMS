import React, { Component } from "react";
import axios from "axios";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      answer: ""
    };
  }

  // sendValue = (value) => {
  //   if (value === "=") {
  //     this.setState({
  //       answer: eval(this.state.answer) //because we use eval it becomes easier to calculate the expression
  //     });
  //   } else if (value === "Cls") {
  //     this.setState({
  //       answer: ""
  //     });
  //   } else {
  //     this.setState({
  //       answer: this.state.answer + value //12+3*4
  //     });
  //   }
  // };

  sendValue = (value) => {
    this.setState({
      answer: this.state.answer + value //12+3*4
    });
    if (value === "=") {
      const data = {
        answer: this.state.answer
      };
      axios.post("http://localhost:3001", data).then((response) => {
        console.log("answer : ", response.data);
        this.setState({ answer: response.data });
      });
    } else if (value === "Cls") {
      this.setState({ answer: "" });
    }
  };

  render() {
    return (
      <div>
        <div className="calculator-body">
          <h1>Calculator</h1>
          <Display
            a={
              this.state
                .answer /**you are accessing the same value of answer in App.js using this.state.answer and in Display.js using <Display "answer" wala "answer" */
            }
          />
          <Buttons sv={this.sendValue} />
        </div>
      </div>
    );
  }
}

export default App;
