import { checkNearCells } from './checkers';

// Calculates the init cell for building a ship.
// Checks that there are no ships in nearby cells.
export function calcInitCell(layout) {
  const coords = [];
  let x = null;
  let y = null;
  let coordsAreCorrect = false;
  let trials = 0;

  while (!coordsAreCorrect) {
    // Clear array if it's not empty
    if (coords.length) coords.splice(0, coords.length);

    // Randomly choose the coordinates
    for (let i = 0; i < 2; i += 1) {
      coords.push(Math.floor(Math.random() * layout.length));
    }

    // For utility
    [y, x] = [coords[0], coords[1]];

    // Check the nearest cells for ships
    coordsAreCorrect = !!checkNearCells(y, x, layout).length;

    // Limit the number of attempts to find a valid cell
    trials += 1;
    if (trials > layout.length * 2) break;
  }

  // Clean up the array if coordinates are incorrect
  if (!coordsAreCorrect) coords.splice(0, coords.length);

  console.log(`initCell is ${coords[0]} ${coords[1]}`);

  // Returns the [y, x] coordinates of the cell
  // if valid cell is found. Otherwise returns [];
  return coords;
}
