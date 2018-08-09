/**
 * Return the coordinates of the shifted initial cell,
 * which is the starting point for checking / validiting cells.
 * @param {number} y - Vertical coordinate of the initial cell.
 * @param {number} x - Horizontal coordinate of the initial cell.
 * @param {string} direction - The building direction of the
 * ship body or tail.
 * @param {string} type - Specifying for which instance (tail or body)
 * we want to calculate the coordinates of a shifted cell.
 * @returns {number[]} - Coordinates of a shifted cell.
 */
export default function calcShiftedInit(y, x, direction, type) {
  const coords = [];
  if (type === 'tail') {
    // For tail
    switch (direction) {
      case 'up':
        coords.push(y - 2, x - 1);
        break;
      case 'right':
        coords.push(y - 1, x + 2);
        break;
      case 'down':
        coords.push(y + 2, x - 1);
        break;
      case 'left':
        coords.push(y - 1, x - 2);
        break;
      default:
        return coords;
    }
  } else {
    // For body ship
    switch (direction) {
      case 'up':
        coords.push(y - 3, x);
        break;
      case 'right':
        coords.push(y, x + 3);
        break;
      case 'down':
        coords.push(y + 3, x);
        break;
      case 'left':
        coords.push(y, x - 3);
        break;
      default:
        return coords;
    }
  }
  return coords;
}
