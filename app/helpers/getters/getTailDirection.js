/**
 * Gets the tail direction depending on the
 * ship building direction.
 * Can be rewritten using array iteration and bounding
 * nearest ship and tail directions (e.g. up and right,
 * right and down etc.).
 * @param {string} shipDirection - Ship building direction.
 * @returns {string} - Tail building direction or just an
 * empty string if tail cannot be built.
 */

// Tail direction of L letter is always fixed,
// can't be mirrored and has only 4 possible positions.
export default function getTailDirection(bodyDirection) {
  switch (bodyDirection) {
    case 'up':
      return 'left';
    case 'right':
      return 'up';
    case 'down':
      return 'right';
    case 'left':
      return 'down';
    default:
      return '';
  }
}
