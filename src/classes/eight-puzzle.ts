// ---------------------------------------------------------------------< types
import {
  copy,
  aStar,
  vector,
  delay,
  stringfy,
  getRandom,
  remove,
  distanceBetween,
} from '../utils';
// -----------------------------------------------------------------< constants
import { infinity } from '../constants';
// ---------------------------------------------------------------------< types
import { Snapshot, Vector } from '../types';
// ============================================================================
export class EightPuzzle<ValueType> {
  private start: Snapshot<ValueType>;

  private width: number;
  private height: number;

  public constructor(
    private readonly goal: Snapshot<ValueType>,
    private readonly empty: ValueType
  ) {
    this.height = goal.length;
    this.width = goal[0]?.length;
    const isIrregular =
      !this.width || goal.some((row) => row.length !== this.width);

    if (isIrregular) throw new Error('Puzzle irregular');

    this.start = this.shuffle(this.goal);
  }

  public shuffle(snapshot: Snapshot<ValueType>) {
    let cameFrom = snapshot;
    let current = snapshot;

    for (let i = 0; i < 22; i++) {
      const neighbors = this.neighbors(current);
      remove(neighbors, cameFrom);
      cameFrom = current;
      current = getRandom(neighbors);
    }

    return current;
  }

  public async resolve() {
    const { start, goal } = this;

    const path = await aStar(
      start,
      goal,
      (node) => this.neighbors(node),
      (current, goal) => this.heuristicCost(current, goal)
    );
    let i = 1;
    for (const snapshot of path) {
      console.clear();

      console.log(`passo ${i++} de ${path.length}`);
      this.printSnapshot<ValueType>(snapshot);

      await delay(500);
    }
  }

  private printSnapshot<ValueType>(snapshot: Snapshot<ValueType>) {
    console.log(
      snapshot
        .map((row) => row.map((value) => stringfy(value)).join(' '))
        .join('\n')
        .replace(new RegExp(stringfy(this.empty), 'g'), ' ')
    );
  }

  private heuristicCost(
    current: Snapshot<ValueType>,
    goal: Snapshot<ValueType>
  ) {
    let cost = 0;

    const values: ValueType[] = [];

    current.map((row) => row.map((value) => values.push(value)));

    for (const value of values) {
      const currentVector = this.getPositions(current, value);
      const goalVector = this.getPositions(goal, value);

      let diff = infinity;

      currentVector.map((c) =>
        goalVector.map((g) => {
          const _diff = distanceBetween(c, g);

          diff = diff < _diff ? diff : _diff;
        })
      );

      cost += diff;
    }

    return cost;
  }

  private neighbors(snapshot: Snapshot<ValueType>) {
    const positions = this.getPositions(snapshot, this.empty);

    const height = snapshot.length;
    const width = snapshot[0].length;

    const neighbors: Snapshot<ValueType>[] = [];

    positions.map(({ x, y }) => {
      const movements = [
        vector(x + 1, y),
        vector(x - 1, y),
        vector(x, y + 1),
        vector(x, y - 1),
      ].filter((m) => 0 <= m.x && m.x < height && 0 <= m.y && m.y < width);

      neighbors.push(
        ...movements.map((movement) => {
          const neighbor = copy(snapshot);
          neighbor[movement.x][movement.y] = snapshot[x][y];
          neighbor[x][y] = snapshot[movement.x][movement.y];

          return neighbor;
        })
      );
    });

    return neighbors;
  }

  private getPositions(snapshot: Snapshot<ValueType>, value: ValueType) {
    let empty: Vector[] = [];

    this.iterate(
      snapshot,
      (_value, [x, y]) => _value === value && empty.push(vector(x, y))
    );

    return empty;
  }

  private iterate(
    snapshot: Snapshot<ValueType>,
    callback: (value: ValueType, coords: [number, number]) => any
  ) {
    snapshot.map((row, x) => row.map((value, y) => callback(value, [x, y])));
  }

  private calcCost() {
    const two = 4;
    const three = (this.height - 2) * 2 + (this.width - 2) * 2;
    const four = (this.height - 2) * (this.width - 2);
    const breadth = (2 * two + 3 * three + 4 * four) / (two + three + four);

    console.log(breadth);
  }
}
