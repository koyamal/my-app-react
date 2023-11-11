import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   const newHistories = this.state.squaresHistories.slice();
  //   if(squares[i] || calculateWinner(squares)) return;
  //   squares[i] = this.state.xIsNest? 'X': 'O';
  //   newHistories.push(squares);

  //   this.setState({
  //     squares: squares,
  //     xIsNest: !this.state.xIsNest,
  //     squaresHistories: newHistories,
  //   });
  // }

  backBefore() {
    if(this.state.squaresHistories.length === 1) return;
    const newHistories = this.state.squaresHistories.slice(0, this.state.squaresHistories.length - 1);
    console.log(newHistories);
    this.setState({
      squares: newHistories[newHistories.length - 1],
      squaresHistories: newHistories,
      xIsNest: !this.state.xIsNest,
    })
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button onClick={() => {this.backBefore()}}>ひとつ前へ</button>
      </div>
    );
  }
}

class Game extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     history: [{
  //       squares: Array(9).fill(null),
  //     }],
  //     xIsNext: true,
  //   };
  // }
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    console.log(this.state)
    console.log(this.state.xIsNext);
    const squares = this.state.history[this.state.history.length - 1].slice();
    const newHistories = this.state.squaresHistories.slice();
    if(squares[i] || calculateWinner(squares)) return;
    squares[i] = this.state.xIsNest? 'X': 'O';

    this.setState({
      history: this.state.history.push(squares),
      xIsNest: !this.state.xIsNest,
    });
  }
  render() {
    const winner = calculateWinner(this.state.history[this.state.history.length - 1]);
    let status = '';
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext? 'X': 'O');
    }
    return (
      <div className="game">
        <div>
          <button>a</button>
        </div>
        <p>{status}</p>
        <div className="game-board">
          <Board
            squares={this.state.history[this.state.history.length - 1]}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    {
      return squares[a];
    }
  }
  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
