import generateGrid from 'helpers/generators/generateGrid';

import buildShip from '../buildShip';

describe('buildShip', () => {
  const grid = generateGrid(10);

  it('Returns the correct result for the regular ship', () => {
    const ship = buildShip(grid, 'regular');

    expect(ship).toHaveProperty('shipCoords');
    expect(ship).toHaveProperty('occupiedCoords');

    expect(ship.shipCoords.length).toEqual(4);
    expect(ship.occupiedCoords.length).toBeGreaterThanOrEqual(1);
  });

  it('Returns the correct result for the L shaped ship', () => {
    const ship = buildShip(grid, 'LShaped');

    expect(ship).toHaveProperty('shipCoords');
    expect(ship).toHaveProperty('occupiedCoords');

    expect(ship.shipCoords.length).toEqual(4);
    expect(ship.occupiedCoords.length).toBeGreaterThanOrEqual(1);
  });

  it('Returns the correct result for the dot shaped ship', () => {
    const ship = buildShip(grid, 'dotShaped');

    expect(ship).toHaveProperty('shipCoords');
    expect(ship).toHaveProperty('occupiedCoords');

    expect(ship.shipCoords.length).toEqual(1);
    expect(ship.occupiedCoords.length).toBeGreaterThanOrEqual(1);
  });

  it("Returns empty arrays when the ship wasn't built", () => {
    const ship = buildShip([], 'regular');

    expect(ship).toHaveProperty('shipCoords');
    expect(ship).toHaveProperty('occupiedCoords');

    expect(ship.shipCoords).toEqual([]);
    expect(ship.occupiedCoords).toEqual([]);
  });

  it("Returns empty arrays when the ship isn't built for a long time", () => {
    // Creating a grid which making it hard to
    // build a regular 4 cell length ship, but still
    // allowing to find a valid initial cell
    const bigGrid = generateGrid(20);
    bigGrid.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (rowIndex % 2 !== 0 && cellIndex % 2 !== 0) {
          /* eslint-disable no-param-reassign */
          cell.isShip = true;
          cell.checked = true;
        } else if (rowIndex % 2 !== 0) {
          cell.isShip = true;
          cell.checked = true;
          /* eslint-enable */
        }
      });
    });

    const ship = buildShip(bigGrid, 'regular');

    expect(ship).toHaveProperty('shipCoords');
    expect(ship).toHaveProperty('occupiedCoords');

    expect(ship.shipCoords).toEqual([]);
    expect(ship.occupiedCoords).toEqual([]);
  });
});
