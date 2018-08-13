/**
 *
 * @param {number} y - Vertical coordinate of the
 * shifted initial cell.
 * @param {number} x - Horizontal coordinate of the
 * shifted initial cell.
 * @param {string} direction - Building direction of the tail.
 * @param {Array} grid - Grid with cell coordinates.
 * @returns {Array} - Valid cells surrounding the tail or,
 * if there are none, empty array.
 */
export default function validateTail(y, x, direction, grid) {
  const result = [];

  if (direction === 'up' || direction === 'down') {
    for (let i = 0; i < 3; i += 1) {
      if (
        grid[y][x + i] === undefined ||
        grid[y][x + i].isShip ||
        grid[y][x + i].occupied
      ) {
        result.splice(0, result.length);
        return result;
      }
      result.push([y, x + i]);
    }
  } else if (direction === 'left' || direction === 'right') {
    for (let i = 0; i < 3; i += 1) {
      if (
        grid[y + i][x] === undefined ||
        grid[y + i][x].isShip ||
        grid[y + i][x].occupied
      ) {
        result.splice(0, result.length);
        return result;
      }
      result.push([y + i, x]);
    }
  }

  return result;
}
