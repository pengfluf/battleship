// Returns boolean which indicates if nearest cells
// are actually existing and free of another ships
export function checkNearCells(y, x, layout) {
  if (y < 0 || x < 0) return false;
  if (y > layout.length - 1 || x > layout.length - 1) return false;

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
      if (layout[y + i][x + j] === undefined || layout[y + i][x + j].isShip) {
        return false;
      }
    }
  }
  return true;
}

export function checkNearToTail(y, x, direction, layout) {
  if (y < 0 || x < 0) return false;
  if (y > layout.length - 1 || x > layout.length - 1) return false;

  if (direction === 'up' || direction === 'right') {
    for (let i = 0; i < 3; i += 1) {
      if (layout[y][x + i].isShip) return false;
    }
  } else {
    for (let i = 0; i < 3; i += 1) {
      if (layout[y + i][x].isShip) return false;
    }
  }

  return true;
}
