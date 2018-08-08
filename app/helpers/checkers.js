// Returns an array with occupied cells if the cell
// is valid. Otherwise returns an empty array.
export function checkNearCells(y, x, layout, mode) {
  const result = [];
  if (y < 0 || x < 0) return result;
  if (y > layout.length - 1 || x > layout.length - 1) return result;

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
      // Set whether we filtrate or just collect coordinates
      if (mode !== 'collect') {
        if (
          layout[y + i][x + j] === undefined ||
          layout[y + i][x + j].isShip ||
          layout[y + i][x + j].occupied
        ) {
          // Clean the array if the cell isn't valid
          result.splice(0, result.length);
          return result;
        }
        // Memorize occupied cells while the
        // checking cell is valid
        result.push([y + i, x + j]);
      } else if (!layout[y + i][x + j].isShip) {
        result.push([y + i, x + j]);
      }
    }
    // Add clicked cell to the checked ones
    if (mode === 'collect') {
      result.push([y, x]);
    }
  }
  return result;
}

export function checkNearToTail(y, x, direction, layout) {
  const result = [];

  if (direction === 'up' || direction === 'down') {
    for (let i = 0; i < 3; i += 1) {
      if (
        layout[y][x + i] === undefined ||
        layout[y][x + i].isShip ||
        layout[y][x + i].occupied
      ) {
        result.splice(0, result.length);
        return result;
      }
      result.push([y, x + i]);
    }
  } else if (direction === 'left' || direction === 'right') {
    for (let i = 0; i < 3; i += 1) {
      if (
        layout[y + i][x] === undefined ||
        layout[y + i][x].isShip ||
        layout[y + i][x].occupied
      ) {
        result.splice(0, result.length);
        return result;
      }
      result.push([y + i, x]);
    }
  }

  console.log('CHECK NEAR TO TAIL RESULT');
  console.log(result);

  return result;
}

export function collectNearCells(y, x, layout) {
  const result = [];
  if (y < 0 || x < 0) return result;
  if (y > layout.length - 1 || x > layout.length - 1) return result;

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
      // Memorize occupied cells while the
      // checking cell is valid
      result.push([y + i, x + j]);
    }
  }
  return result;
}
