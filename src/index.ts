// -------------------------------------------------------------------< classes
import { EightPuzzle } from './classes';
// ======================================================================< main
const eightPuzzle = new EightPuzzle(
  [
    [' ', '1', '2'],
    ['4', '5', '6'],
    ['8', '9', 'A'],
  ],
  ' '
);

eightPuzzle.resolve();
