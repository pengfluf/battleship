// Returns an array with occupied cells if the cell
// is valid. Otherwise returns an empty array.
export function checkNearCells(y, x, layout) {
  const result = [];
  console.log(y);
  console.log(x);
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
      console.log(`Check ${y + i} ${x + j}`);
      console.log(layout[y + i][x + j]);
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
    }
  }
  return result;
}

export function checkNearToTail(y, x, direction, layout) {
  const result = [];
  if (y < 0 || x < 0) return result;
  if (y > layout.length - 1 || x > layout.length - 1) return result;

  if (direction === 'up' || direction === 'right') {
    for (let i = 0; i < 3; i += 1) {
      console.log(`Check tail ${y} ${x + i}`);
      if (
        layout[y][x + i] === undefined ||
        layout[y][x + i].isShip ||
        layout[y][x + i].occupied
      ) {
        result.splice(0, result.length);
        return result;
      }
      result.push([y + i, x]);
    }
  } else {
    for (let i = 0; i < 3; i += 1) {
      console.log(`Check tail ${y} ${x + i}`);
      if (
        layout[y][x + i] === undefined ||
        layout[y][x].isShip ||
        layout[y][x + i].occupied
      ) {
        result.splice(0, result.length);
        return result;
      }
      result.push([y + i, x]);
    }
  }

  return result;
}
