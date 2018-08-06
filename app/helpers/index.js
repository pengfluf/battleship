import nanoid from 'nanoid';

export function generateGrid(size) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    const row = [];
    for (let j = 0; j < size; j += 1) {
      row.push({
        id: nanoid(7),
        isShip: false,
        checked: false,
      });
    }
    result.push(row);
  }
  return result;
}

export function generateIDList(size) {
  const result = [];
  const length = Math.floor(size / 2);
  for (let i = 0; i < size; i += 1) {
    result.push(nanoid(length));
  }
  return result;
}

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
    // Conditions in loops need for the edges of the grid
    for (
      let i = y > 0 ? -1 : 0;
      y === layout.length - 1 ? i < 1 : i < 2;
      i += 1
    ) {
      for (
        let j = x > 0 ? -1 : 0;
        x === layout.length - 1 ? j < 1 : j < 2;
        j += 1
      ) {
        if (!layout[y + i][x + j].isShip) {
          coordsAreCorrect = true;
        }
      }
    }
    trials += 1;
    if (trials > layout.length * 2) break;
  }

  if (!coordsAreCorrect) coords.splice(0, coords.length);

  // Returns the [y, x] coordinates of the cell,
  // if valid cell is found. Otherwise returns [];

  return coords;
}
