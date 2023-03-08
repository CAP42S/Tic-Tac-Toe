const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {
     this.playerTurn = "X";


    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    Screen.addCommand(`up`, `Move Up`, this.cursor.up.bind(this.cursor));
    Screen.addCommand(`down`, `Move Down`, this.cursor.down.bind(this.cursor));
    Screen.addCommand(`left`, `Move Left`, this.cursor.left.bind(this.cursor));
    Screen.addCommand(`right`, `Move Right`, this.cursor.right.bind(this.cursor));
    Screen.addCommand(`return`, `Player turn: ${this.playerTurn}`, this.playMove.bind(this));

    this.cursor.resetBackgroundColor();
    this.cursor.setBackgroundColor();

    Screen.render();
  }

  playMove() {
    const row = this.cursor.row;
    const col = this.cursor.col;
    this.grid[row][col] = this.playerTurn;
    Screen.setGrid(row, col, this.playerTurn);
    Screen.setTextColor(row, col, 'black');
    const win = TTT.checkWin(this.grid);
    if(win) {
      TTT.endGame(win);
    }
    this.playerTurn === 'O' ? this.playerTurn = 'X' : this.playerTurn = 'O';
  }

  static checkWin(grid) {

    const possibleWinsHorizontal = [['00','01','02'],
                                    ['10','11','12'],
                                    ['20','21','22']];

    const possibleWinsVertical = [['00','10','20'],
                                  ['01','11','21'],
                                  ['02','12','22']];

    const possibleWinsDiagnol = [['00','11','22'],
                                 ['02','11','20']];

    let x_coordintes = [];
    let o_coordintes = [];
    let emptySpace = false;

    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid.length; j++) {
        grid[i][j] === 'X' ?  x_coordintes.push(`${i}${j}`) :
        grid[i][j] === 'O' ? o_coordintes.push(`${i}${j}`) :
        emptySpace = true;
      }
    }
    const possibleWins = [possibleWinsHorizontal, possibleWinsVertical, possibleWinsDiagnol];
    let winner;
    let x_counter = 0;
    let o_counter = 0;
    possibleWins.forEach( checkCoordintes => {
      for(let i = 0; i < checkCoordintes.length; i++) {
        for(let j = 0; j < checkCoordintes[i].length; j++) {
          let value =  checkCoordintes[i][j];
          x_coordintes.includes(value) ? x_counter++ :
          o_coordintes.includes(value) ? o_counter++ :
          null;
        }
        if( x_counter === 3 ) {
          winner = 'X';
          return;
        }
        else if( o_counter === 3 ) {
          winner = 'O';
          return;
        }
        else {
          x_counter = 0;
          o_counter = 0;
        }
      }
      });
      return winner ? winner :
             emptySpace ? false :
             'T';
    }





  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
