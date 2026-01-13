const readline = require("node:readline/promises"); // import promise readline, callback one isn't async
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]; //board state

function PrintBoard() {
  console.log(`\n${board[0]} | ${board[1]} | ${board[2]}\n_________\n${board[3]} | ${board[4]} | ${board[5]}\n_________\n${board[6]} | ${board[7]} | ${board[8]}   
        `);
}

// all right now we need to know how to get user input in node.

// rl.question("What do you think of Node.js? ", (answer) => {
//   console.log(`Thank you for your valuable feedback: ${answer}`);
//   rl.close();
// });
// now that we know how to get user input, lets make the game loop!

async function GameLoop() {
  PrintBoard();
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
      // console.clear();
      // console.log("Console was cleared!");
      PrintBoard();
    } else {
      console.log("Square Taken, Choose another one!");
    }
    // console.log("Evualting Game!");
    var result = evaluateGameState();
    // console.log(`Result: ${result}`);
    if (result !== "") {
      loop_state = false;
      console.log(`Player ${result} won the Game!`);
      handleGameEnd();
    } else {
      let draw = true;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === " ") draw = false;
      }
      if (draw) {
        loop_state = false;
        console.log("Draw");
        handleGameEnd();
      }
    }
  }
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
  // console.log(
  //   `First Condition: ${
  //     board[0] === board[1] && board[0] === board[2]
  //   }\n Second Condition: ${board[0] === "X" || board[0] === "O"}\n
  //   Third Condition: ${board[1] !== " "}`
  // );
  if (board[0] === board[1] && board[0] === board[2] && board[0] !== " ") {
    //first horizontal
    console.log("Win from First Row");
    winner = board[0];
  } else if (
    board[3] === board[4] &&
    board[3] === board[5] &&
    board[3] !== " "
  ) {
    //second horizontal

    console.log("Win from Second Row");
    winner = board[3];
  } else if (
    board[6] === board[7] &&
    board[6] === board[8] &&
    board[6] !== " "
  ) {
    //third horizontal
    console.log("Win form Third Row");
    winner = board[6];
  }
  //vertical
  if (board[0] === board[3] && board[0] === board[6] && board[0] !== " ") {
    //first vertical
    console.log("Win from First Column");
    winner = board[0];
  } else if (
    board[1] === board[4] &&
    board[1] === board[7] &&
    board[1] !== " "
  ) {
    //second vertical
    console.log("Win from Second Column");
    winner = board[1];
  } else if (
    board[2] === board[5] &&
    board[2] === board[8] &&
    board[2] !== " "
  ) {
    //third vertical
    console.log("Win from Third Column");
    winner = board[2];
  }
  //diagonal
  if (board[0] === board[4] && board[0] === board[8] && board[0] !== " ") {
    //first diagonal
    console.log("Win from First Diagonal");
    winner = board[0];
  } else if (
    board[2] === board[4] &&
    board[2] === board[6] &&
    board[2] !== " "
  ) {
    //second diagonal
    console.log("Win from Second Diagonal");
    winner = board[2];
  }
  return winner;
}
// now we need to integrate this evualtion function into the gameloop.
//now we need draw logic at the end!

async function handleGameEnd() {
  const response = await rl.question("Play again? (Y/N)");
  if (response === "y" || response === "Y") {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    GameLoop();
  } else {
    process.exit(0);
  }
}
