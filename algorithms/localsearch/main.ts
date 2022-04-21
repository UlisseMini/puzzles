// To understand these interfaces imagine some examples
// n-queens, 15-puzzle, CSP/Sat solver

interface Instance<M> {
  // How many conflicts there are, zero means solved/satisfied
  conflicts(): number;

  // What mutations we can apply
  mutations(): M[];

  // Apply a mutation (mutating self)
  apply(mutation: M): void;

  // Undo a mutation (mutating self)
  undo(mutation: M): void;
}

// Heuristic for local search, pick the mutation minimizing the number of conflicts
export function minConflicts<M>(instance: Instance<M>): M {
  let bestMutation;
  let bestMutationConflicts = Infinity;

  // Pick the mutation that reduces conflicts the most
  for (const mutation of instance.mutations()) {
    instance.apply(mutation);
    const conflicts = instance.conflicts();
    if (conflicts < bestMutationConflicts) {
      bestMutationConflicts = conflicts;
      bestMutation = mutation;
    }
    instance.undo(mutation);
  }

  if (!bestMutation) {
    throw new Error("No mutations possible (there must always be mutations)");
  }

  return bestMutation;
}

/*

Start with a random solution that doesn't satisfy the constraints, then mutate
it until it does. Good on Constraint Satisfication problems (e.g. n-queens, sudoku)
when solutions are densely distributed (since it's a local search)
*/

export function greedyLocalSearch<M>(
  instance: Instance<M>,
  maxSteps: number
): Instance<M> | null {
  for (let i = 0; i < maxSteps; i++) {
    const mutation = minConflicts(instance);

    instance.apply(mutation);
    if (instance.conflicts() == 0) return instance;
  }

  return null;
}
