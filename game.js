const readline = require("node:readline/promises"); // import promise readline, callback one isn't async
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

async function GameLoop() {
  let loop_state = true;
  let player = "X";
  for (; loop_state; ) {
    async function askForInput() {
      const response = await rl.question(
        "What move would you like to make? e.g 1-9"
      );
      //validate input
      if (response == 0 || response > 9) {
        console.log("Please choose between 1-9!");
        const response2 = await askForInput();
        return response2;
      } else {
        return response;
      }
    }
    const answer = await askForInput();
    // move validation
    if (board[answer - 1] === " ") {
      board[answer - 1] = player;
      // player switching
      if (player == "X") {
        player = "O";
      } else if (player == "O") {
        player = "X";
      }
      console.clear();
      // console.log("Console was cleared!");
      PrintBoard();
    } else {
      console.log("Square Taken, Choose another one!");
    }
  }
  // loop_state = false;
}
GameLoop();
// alr now i need to know when a player wins or draws the game
// well there are 8 ways to win tic tac toe
// - 3 in vertical
// - 3 in horizontal
// - 2 in diagnol
function evaluateGameState() {
  var winner = "";
  //horizontal
  if (((board[0] === board[1]) === board[2]) !== " ") {
    //first horizontal
    winner = board[0];
  } else if (((board[3] === board[4]) === board[5]) !== " ") {
    //second horizontal
    winner = board[3];
  } else if (((board[6] === board[7]) === board[8]) !== " ") {
    //third horizontal
    winner = board[6];
  }
  //vertical
  if (((board[0] === board[3]) === board[6]) !== " ") {
    //first vertical
    winner = board[0];
  } else if (((board[1] === board[4]) === board[7]) !== " ") {
    //second vertical
    winner = board[1];
  } else if (((board[2] === board[5]) === board[8]) !== " ") {
    //third vertical
    winner = board[2];
  }
  //diagonal
  if (((board[0] === board[4]) === board[8]) !== " ") {
    //first diagonal
    winner = board[0];
  } else if (((board[2] === board[4]) === board[6]) !== " ") {
    //second diagonal
    winner = board[2];
  }
  return winner;
}
// now we need to integrate this evualtion function into the gameloop.
