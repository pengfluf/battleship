/**
 * Constructs the part of the ship, if there will be a tail.
 * If not, just returns the coordinates of the whole ship.
 * @param {number} y - Vertical coordinate of the initial cell.
 * @param {number} x - Horizontal coordinate of the initial cell.
 * @param {string} direction - Determines in which direction the ship
 * will be built.
 * @param {number} bodyLength - Body length of the constructed part
 * or the whole ship.
 * @returns {Array} - Array of ship (or its' part) coordinates.
 */

export default function constructPart(y, x, direction, bodyLength) {
  const result = [];
  let tailShift = 0;

  if (bodyLength === 1) tailShift = 1;

  switch (direction) {
    case 'up':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        result.push([y - i, x]);
      }
      break;
    case 'right':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        result.push([y, x + i]);
      }
      break;
    case 'down':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        result.push([y + i, x]);
      }
      break;
    case 'left':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        result.push([y, x - i]);
      }
      break;
    default:
      return result;
  }
  return result;
}
