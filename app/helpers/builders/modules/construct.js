/**
 * Constructs a part of the ship. Uses after all validations.
 * @param {number} y - Vertical coordinate of the initial cell.
 * @param {number} x - Horizontal coordinate of the initial cell.
 * @param {string} direction - Determines in which direction the ship
 * will be built.
 * @param {number} bodyLength - Body length of the constructed part
 * or the whole ship.
 * @returns {Array} - Array of ship (or its' part) coordinates.
 */

export default function construct(y, x, direction, bodyLength) {
  const shipCoords = [];
  let tailShift = 0;

  // If bodyLength equals 1, it means that we're
  // constructing a tail, so we need to shift
  // its initial coordinates.
  if (bodyLength === 1) tailShift = 1;

  switch (direction) {
    case 'up':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        shipCoords.push([y - i, x]);
      }
      break;
    case 'right':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        shipCoords.push([y, x + i]);
      }
      break;
    case 'down':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        shipCoords.push([y + i, x]);
      }
      break;
    case 'left':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        shipCoords.push([y, x - i]);
      }
      break;
    default:
      return shipCoords;
  }
  // Coords means coordinates, but it's too looooong
  return shipCoords;
}
