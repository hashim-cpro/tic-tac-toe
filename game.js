const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]; //board state

function PrintBoard() {
  console.log(`\n${board[0]} | ${board[1]} | ${board[2]}\n_________\n${board[3]} | ${board[4]} | ${board[5]}\n_________\n${board[6]} | ${board[7]} | ${board[8]}   
        `);
}

PrintBoard();
// all right now we need to know how to get user input in node.

// rl.question("What do you think of Node.js? ", (answer) => {
//   console.log(`Thank you for your valuable feedback: ${answer}`);
//   rl.close();
// });
// now that we know how to get user input, lets make the game loop!

function GameLoop() {
  let loop_state = true;
  for (; loop_state; ) {
    rl.question(
      "What move would you like to make? e.g 12 = row 1 column 2",
      (answer) => {
        console.log(answer);
        var [row, column] = answer.split();
        console.log(`Row ${row}, \nColumn ${column}`);
        rl.close();
      }
    );
    loop_state = false;
  }
}
GameLoop();
