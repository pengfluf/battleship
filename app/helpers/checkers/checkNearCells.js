/**
 * Depends on the specified mode returns
 * either only valid surrounding cells or just all.
 * @param {number} y - Vertical coordinate of the
 * shifted initial cell.
 * @param {number} x - Horizontal coordinate of the
 * shifted initial cell.
 * @param {Array} layout - Layout with cell coordinates.
 * @param {string} mode - Specifies, will it return the
 * only valid cells or just collect them all.
 * @returns {Array} - Coordinates of valid or just
 * collected cells.
 */
export default function checkNearCells(y, x, layout, mode) {
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
