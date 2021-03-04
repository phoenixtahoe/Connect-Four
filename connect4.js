/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */


const makeBoard = () => {
  for (let i = 0; i < HEIGHT; i++)
  {
    let row = []
    for (let j = 0; j < WIDTH; j++)
    {
      row.push(null)
    }
    board.push(row)
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  let htmlBoard = document.getElementById('board') // Creates a board
  let top = document.createElement("tr"); // Creates a row called top
  top.setAttribute("id", "column-top"); // Gives the row top the id of column-top
  top.addEventListener("click", handleClick); // add's an eventlistener the id top

  for (let x = 0; x < WIDTH; x++) { // Creates cell's to fill the top row and assign it a id of the current number of cells
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell); // add's each cell to the top row
  }
  htmlBoard.append(top); // add's it too the board

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); // Creates the ammount of row's needed to satisfy the height of the board
    for (let x = 0; x < WIDTH; x++) {         
      const cell = document.createElement("td"); // Creates a cell to fill into each row at the size of WIDTH
      cell.setAttribute("id", `${y}-${x}`); // creates an id of the current position of the table and add's it too each cell
      row.append(cell); // add's each cell to the current row
    }
    htmlBoard.append(row); // add's the row to the board
  }
}
/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  for (let y = HEIGHT - 1; y >= 0; y--) // Starts a the bottom (5) of the col and work's it way up until it reaches it 0
  { 
    if (board[y][x] === null) // check's if the current place is empty
    {
      return y;
    }
  }
  return null; // returns null if col is full
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  board[y][x] = currPlayer
  let piece = document.createElement('div');
  let row = document.getElementById(`${y}-${x}`);
  piece.classList.add('piece', `p${currPlayer}`);
  row.append(piece);
}

/** endGame: announce game end */

const endGame = (msg) => alert(msg)

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
    // get x from ID of clicked cell
    let x = +evt.target.id;
    // get next spot in column (if none, ignore click)
    let y = findSpotForCol(x);
    if (y === null) {
      return;
    }
    // place piece in board and add to HTML table
    placeInTable(y, x);
    // check for win
    if (checkForWin())
    {
      return endGame(`Player ${currPlayer} won!`);
    }
    // check for tie
    if (board.every(row => !row.includes(null)))
    { //Check if all rows contain a cell
      return endGame(`The game has tied!`)
    }
    // switch players
    currPlayer === 1 ? currPlayer = 2 : currPlayer = 1
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
