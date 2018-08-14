/**
 * Depends on the specified mode returns
 * either only valid surrounding cells or just all.
 * @param {number} y - Vertical coordinate of the
 * validation initial cell.
 * @param {number} x - Horizontal coordinate of the
 * validation initial cell.
 * @param {Array} grid - Grid with cell coordinates.
 * @param {string} mode - Specifies, will it return the
 * only valid cells, uncheckedAndEmpty them all or find only those
 * that are needed for the full ship destroying.
 * @returns {Array} - Coordinates of valid or just
 * uncheckedAndEmpty or unchecked cells.
 */
export default function validateCells(y, x, grid, mode) {
  const result = [];
  // Prevent going beyond the grid borders
  if (y < 0 || x < 0) return result;
  if (y > grid.length - 1 || x > grid.length - 1) return result;

  // We always check the 3x3 square from the
  // upper left corner or, if we are
  // extremely close to the border, the 2x3 square.
  for (
    let i = y > 0 ? -1 : 0;
    y === grid.length - 1 ? i < 1 : i < 2;
    i += 1
  ) {
    for (
      let j = x > 0 ? -1 : 0;
      x === grid.length - 1 ? j < 1 : j < 2;
      j += 1
    ) {
      if (mode === 'uncheckedAndEmpty') {
        // Find all the unchecked cells
        // without ships
        if (
          !grid[y + i][x + j].isShip &&
          !grid[y + i][x + j].checked
        ) {
          result.push([y + i, x + j]);
        }
      } else if (mode === 'unchecked') {
        // Find all the unchecked cells near
        // the initial
        if (!grid[y + i][x + j].checked) {
          result.push([y + i, x + j]);
        }
      } else {
        // Standard validation mode
        if (
          grid[y + i][x + j] === undefined ||
          grid[y + i][x + j].isShip ||
          grid[y + i][x + j].occupied
        ) {
          // Clean the array if the cell isn't valid
          result.splice(0, result.length);
          return result;
        }
        // Memorize occupied cells while the
        // cell is valid
        result.push([y + i, x + j]);
      }
    }
  }
  // Push the initial (clicked) cell too
  if (mode === 'uncheckedAndEmpty') {
    result.push([y, x]);
  }
  return result;
}
