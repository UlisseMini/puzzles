/*
 * Problem: Place N Chess Queens in a N by N board such that no two queens
 * are attacking eachother.
 */

// type Pos = [number, number];
// type Queens = Pos[];

type Pos = [number, number];
type Mutation = [Pos, Pos];

export class Queens {
  // TODO: change to map and combine x,y for perf on million x million boards.
  queens: Pos[];
  n: number;

  constructor(boardSize: number) {
    this.n = boardSize;
    this.queens = [];
  }

  toString() {
    let grid = Array(this.n)
      .fill(null)
      .map(() => Array(this.n).fill("."));
    this.queens.forEach(([i, j]) => (grid[i][j] = "Q"));
    return grid.map((row) => row.join(" ")).join("\n");
  }

  randomInit() {
    this.queens = [];
    for (let i = 0; i < this.n; i++) {
      // Generate two random numbers from [0, n) and add them to the board
      this.queens.push([
        Math.floor(Math.random() * this.n),
        Math.floor(Math.random() * this.n),
      ]);
    }
  }

  findQueen(p: Pos): number | null {
    return this.queens.findIndex((q) => p[0] === q[0] && p[1] === q[1]);
  }

  attacking(q1: Pos, q2: Pos): boolean {
    // TODO: Account for queens inbetween eachother, this works for now since
    // I'm only using this as a heuristic, and attacking() = 0 has the same meaning.

    return (
      q1[0] === q2[0] ||
      q1[1] === q2[1] ||
      Math.abs(q1[0] - q2[0]) === Math.abs(q1[1] - q2[1])
    );
  }

  // O(n^2)
  conflicts(): number {
    // TODO: Cache this, and come up with something better then O(n^2)

    let numConflicts = 0;
    for (let i = 0; i < this.queens.length; i++) {
      for (let j = i + 1; j < this.queens.length; j++) {
        if (this.attacking(this.queens[i], this.queens[j])) {
          // console.log(`attacking(${this.queens[i]}, ${this.queens[j]})`);
          numConflicts += 1;
        }
      }
    }
    return numConflicts;
  }

  // TODO: Return iterator of all possible mutations and change type in localsearch.
  // note: it might be mind numbingly slow to iterate over *all* the mutations,
  // in which case I'll have to inline everything (should be easy for simple algorithms)
  // alternatively I can implement a suite of CSP solvers then use them for everything.
  mutations(): Mutation[] {
    // Returns n^3 mutations (for n = 8, 512). this isn't feasible for large n (i'll fix it later)

    const mutations: Mutation[] = [];
    for (let q of this.queens) {
      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.n; j++) {
          mutations.push([q, [i, j]]);
        }
      }
    }

    return mutations;
  }

  apply(mutation: Mutation) {
    this.queens[this.findQueen(mutation[0])!] = mutation[1];
  }

  undo(mutation: Mutation) {
    this.queens[this.findQueen(mutation[1])!] = mutation[0];
  }
}
