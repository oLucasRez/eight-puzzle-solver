// -------------------------------------------------------------------< classes
import { Puzzle } from './classes';
// ======================================================================< main
const puzzle = new Puzzle(
  [
    [' ', '1', '2'],
    ['4', '5', '6'],
    ['8', '9', 'A'],
  ],
  ' '
);

puzzle.resolve();