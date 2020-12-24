import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.squares = 100;
    this.state = {
      player: "P1",
      point: {
        P1: 0,
        P2: 0,
      },
      dice: 0,
      result: null,
    };
    
  }

  renderSquare = (j) => {
    let { point } = this.state;
    return (
      <div className="square">
        <span>{j}</span>
        {j === point["P1"] ? "P1" : ""}
        {j === point["P2"] ? "P2" : ""}
      </div>
    );
  };
  renRow = (i, k) => {
    let squarearr = [];
    if (i % 2 === 0) {
      for (
        let j = k * i;
        j > k * i - k;
        j--
      ) {
        squarearr.push(this.renderSquare(j));
      }
    } else {
      for (
        let j = k * i - k + 1;
        j < k * i + 1;
        j++
      ) {
        squarearr.push(this.renderSquare(j));
      }
    }
    return <div className="row">{squarearr}</div>;
  };
  renBoard = (k) => {
    let rowSquare = [];
    for (let i = k; i > 0; i--) {
      rowSquare.push(this.renRow(i, k));
    }
    return <div className="board">{rowSquare}</div>;
  };
  rolldice = () => {
    let { player ,point} = this.state;
    let dice = Math.ceil(Math.random() * 6);
    point[player] += dice;
    if (point[player] > this.squares) {
      point[player] -= dice;
      this.setState({
        dice,
        player: player === "P1" ? "P2" : "P1",
        point,
      });
    } else if (point[player] === this.squares) {
      this.setState({
        dice,
        point,
        result: `${player} WON`,
      });
    } else {
      this.setState({
        dice,
        player: player === "P1" ? "P2" : "P1",
        point,
      });
    }
  };
  render() {
    return (
      <div className="app">
  
        <div className="sboard">
          {this.renBoard(10)}
        </div>
        <div className="result unselectable">
          {this.state.result ? (
            this.state.result
          ) : (
            <>
              <div className="final">
                MOVE {this.state.player }
              </div>
              <div className="button" onClick={this.rolldice}>
                 DICE
              </div>
              <div className="dice">{this.state.dice}</div>
            </>
          )}
        </div>
     
      </div>
    );
  }
}

export default App;
