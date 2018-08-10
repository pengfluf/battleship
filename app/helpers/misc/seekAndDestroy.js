import checkNearCells from 'helpers/checkers/checkNearCells';
/**
 * Tries to seek and destroy the whole ship, when
 * the part of it is found. Returns recommended coordinates
 * for attacking.
 * @param {number} y - Vertical coordinate of the initial cell.
 * @param {number} x - Horizontal coordinate of the initial cell.
 * @param {Array} layout - Layout with cell coordinates.
 * @returns {Array} - Array with coordinates for attacking.
 */
export default function seekAndDestroy(y, x, layout) {
  const result = [];
  const nearestUnchecked = [];
  const nearestShips = [];
  const lastShip = [];
  let oldShipsLength = 0;

  let cellY = y;
  let cellX = x;
  let prevCellY = null;
  let prevCellX = null;

  do {
    // eslint-disable-next-line

    oldShipsLength = nearestShips.length;

    // Clear the array
    nearestUnchecked.splice(0, nearestUnchecked.length);
    // Collect all nearest unchecked cells
    if (prevCellY !== cellY && prevCellX !== cellX) {
      nearestUnchecked.push(
        ...checkNearCells(cellY, cellX, layout, 'findUnchecked'),
      );
    }

    console.log('NEAREST UNCHECKED');
    console.log(nearestUnchecked);

    // If there are none, so there's nothing to seek.
    if (nearestUnchecked.length === 0) {
      break;
    } else if (nearestUnchecked.length === 1) {
      // If there's only one available cell,
      // start seeking from it.
      [cellY, cellX] = [nearestUnchecked[0][0], nearestUnchecked[0][1]];
    }

    console.log('NEAREST SHIPS AFTER FILTERING');
    console.log(nearestShips);

    // Delete the old ships, we've already pushed it
    // to the result.
    nearestShips.splice(0, oldShipsLength);

    // For each nearest ship cell find all
    // the surrounding unchecked cells
    nearestShips.forEach(cell => {
      nearestUnchecked.push(
        ...checkNearCells(cell[0], cell[1], layout, 'findUnchecked'),
      );
    });

    // Extract only the ships from the nearest
    // unchecked cells
    nearestShips.push(
      ...nearestUnchecked.filter(cell => layout[cell[0]][cell[1]].isShip),
    );

    // Clear the array from the old data.
    lastShip.splice(0, lastShip.length);
    // Push new last ship coordinates
    lastShip.push(...nearestShips[nearestShips.length - 1]);

    // Memorize previous values
    [prevCellY, prevCellX] = [cellY, cellX];

    // Update the cell from which we start seeking.
    [cellY, cellX] = [lastShip[0], lastShip[1]];

    // Push new ships.
    result.push(...nearestShips);

    if (prevCellY === cellY && prevCellX === cellX && nearestShips.length !== 1)
      break;
  } while (result.length < 3);

  console.log('RESULT');
  console.log(result);
  return result;
}
