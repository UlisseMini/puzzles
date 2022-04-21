type Tile = number;
type Grid = Tile[][];

function conflicts(grid: Grid): number {
  let numConflicts = 0;
  const n = grid.length; // n = 9 for standard sudoku

  // Vertical and Horizontal conflicts
  for (let i = 0; i < n; i++) {
    const seenVert = new Set();
    const seenHori = new Set();
    for (let j = 0; j < n; j++) {
      seenVert.has(grid[i][j]) ? numConflicts++ : seenVert.add(grid[i][j]);
      seenHori.has(grid[j][i]) ? numConflicts++ : seenHori.add(grid[j][i]);
    }
  }

  // Conflicts in squares
  for (let sq = 0; sq < n; sq++) {
    const seen = new Set();
    for (let i = 0; i < TODO; i++) {
      for (let j = 0; j < TODO; j++) {
        seen.has(grid[i][j]) ? numConflicts++ : seen.add(grid[i][j]);
      }
    }
  }

  return numConflicts;
}
