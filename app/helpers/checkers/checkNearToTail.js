/**
 *
 * @param {number} y - Vertical coordinate of the
 * shifted initial cell.
 * @param {number} x - Horizontal coordinate of the
 * shifted initial cell.
 * @param {string} direction - Building direction of the tail.
 * @param {Array} layout - Layout with cell coordinates.
 * @returns {Array} - Valid cells surrounding the tail or,
 * if there are none, empty array.
 */
export default function checkNearToTail(y, x, direction, layout) {
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

  return result;
}
