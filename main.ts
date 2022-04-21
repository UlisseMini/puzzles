import { Queens } from "./puzzles/nqueens/main";
import { greedyLocalSearch } from "./algorithms/localsearch/main";

const maxSteps = 20;

const board = new Queens(8);
board.randomInit();

console.log(board.toString());
console.log(`conflicts: ${board.conflicts()}`);

const solved = greedyLocalSearch(board, maxSteps);
if (solved) {
  console.log("------- Solved -------");
  console.log(solved.toString());
} else {
  console.log(`failed to solve after ${maxSteps} steps`);
}
