import nanoid from 'nanoid';

/**
 * @typedef {Object} Cell
 * @property {string} id - Unique ID. Needs for React
 * list rendering, useful for validiting, filtrating etc.
 * @property {boolean} isShip - Indicates whether there is
 * a ship on this cell or not.
 * @property {boolean} occupied - Indicates whether this cell
 * is occupied by some ship or not. Ship occupy all the
 * nearest cells.
 * @property {boolean} checked - Indicates whether this cell
 * is cheked by user or not.
 */

/**
 *
 * @param {number} size - Specifies grid size (e.g. 10x10).
 * @returns {Array} - The whole grid with rows and
 * cells inside.
 */
export default function generateGrid(size) {
  const grid = [];
  for (let i = 0; i < size; i += 1) {
    const row = [];
    for (let j = 0; j < size; j += 1) {
      row.push({
        id: nanoid(7),
        isShip: false,
        occupied: false,
        checked: false,
      });
    }
    grid.push(row);
  }
  return grid;
}
