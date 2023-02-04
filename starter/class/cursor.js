const Screen = require("./screen");
class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';
    this.setBackgroundColor();

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    // Move cursor up
    this.resetBackgroundColor.call(this);
    if(this.row !== 0) this.row -= 1;
    this.setBackgroundColor.call(this);
    Screen.render();
  }

  down() {
    // Move cursor down
    this.resetBackgroundColor();
    if(this.row !== 2) this.row += 1;
    this.setBackgroundColor();
    Screen.render();

  }

  left() {
    // Move cursor left
    this.resetBackgroundColor();
    if(this.col !== 0) this.col -= 1;
    this.setBackgroundColor();
    Screen.render();

  }

  right() {
    // Move cursor right
    this.resetBackgroundColor();
    if(this.col !== 2) this.col += 1;
    this.setBackgroundColor();
    Screen.render();

  }

}


module.exports = Cursor;
