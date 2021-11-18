import React from 'react'
import Board from './Board';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2)===0
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if (winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });

    }

    render() {
        let chances;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            chances = move;
            const desc = move ? 'Step ' + move : 'Start...';
            return (
                <>
                <li  key={move}>
                    <button className=' btn btn-primary' onClick={() => { this.jumpTo(move) }}>
                        {desc}
                    </button>
                </li>
                </>
            )
        });

        let status;
        if (winner) {
            status = 'Winner is ' + winner  + '!';
        }else if(!winner && chances=== 9){
            status = 'It is a tie!';
        }
         else {
            status = 'Attempt of player ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="game">
                 <h1>Tic Tac Toe</h1>
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)}
                        squares={current.squares} />
                </div>
                <div className="game-info">
                    <div className='status'>{status}</div>
                    <div className='reach'>
                    <h2 className='goto'>Go To:</h2>
                    <ul class=' flex justify-center align-center'>
                      
                       
                        {moves}
                        </ul>

                        </div>
                </div>

            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

export default App;