import React from 'react';
import './TicTacToe.css';

class TicTacToe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matrix: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            player: 1,
            moves: 9
        }
    }

    render() {
        return <div className="game">
            <div>Player: {this.state.player}</div>
            {
                this.state.matrix.map((row, rowIndex) => {
                    return <div key={rowIndex} className="row">
                        {
                            row.map((col, colIndex) => {
                                return <div onClick={() => this.handleClick(rowIndex, colIndex)} className="col" key={colIndex}>
                                    {col}
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>;
    }

    handleClick(rowIndex, colIndex) {
        const currentPlayer = this.state.player === 1 ? 2 : 1;
        const lastPlayer = this.state.player;
        const symbol = this.state.player === 1 ? 'X' : 'O';
        const updatedMatrix = this.state.matrix;
        const updatedMoves = this.state.moves - 1;

        updatedMatrix[rowIndex][colIndex] = symbol;
        this.setState({
            player: currentPlayer,
            matrix: updatedMatrix,
            moves: updatedMoves
        });

        const winner = this.checkForWinner(lastPlayer);
        if (!winner && updatedMoves < 1) {
            alert("Game over! It's a draw!");
        }
    }

    checkForWinner(player) {
        const symbol = player === 1 ? 'X' : 'O';
        const lines = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];
        for(let i = 0; i < lines.length; i++) {
            const [r1, r2, r3] = lines[i];
            if (
                this.state.matrix[r1[0]][r1[1]] === symbol
                && this.state.matrix[r2[0]][r2[1]] === symbol
                && this.state.matrix[r3[0]][r3[1]] === symbol
            ) {
                alert(`Player ${player} won!`);
                return true;
            }
        }
       return false;
    }
}

export default TicTacToe;