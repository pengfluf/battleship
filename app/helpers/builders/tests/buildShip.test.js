import generateGrid from 'helpers/generators/generateGrid';

import buildShip from '../buildShip';

describe('buildShip', () => {
  const layout = generateGrid(10);

  it('Returns the correct result for the regular ship', () => {
    const ship = buildShip(layout, 'regular');

    expect(ship).toHaveProperty('shipCoords');
    expect(ship).toHaveProperty('occupiedCoords');

    expect(ship.shipCoords.length).toEqual(4);
    expect(ship.occupiedCoords.length).toBeGreaterThanOrEqual(1);
  });

  it('Returns the correct result for the L shaped ship', () => {
    const ship = buildShip(layout, 'LShaped');

    expect(ship).toHaveProperty('shipCoords');
    expect(ship).toHaveProperty('occupiedCoords');

    expect(ship.shipCoords.length).toEqual(4);
    expect(ship.occupiedCoords.length).toBeGreaterThanOrEqual(1);
  });

  it('Returns the correct result for the dot shaped ship', () => {
    const ship = buildShip(layout, 'dotShaped');

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
    // Creating a layout which doesn't allow
    // to build a regular 4 cell length ship, but allowing
    // to find an initial cell
    const bigLayout = generateGrid(31);
    bigLayout.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (rowIndex % 3 === 0 && cellIndex % 3 === 0) {
          // eslint-disable-next-line
          cell.isShip = true;
        } else if (rowIndex % 3 === 0) {
          // eslint-disable-next-line
          cell.isShip = true;
        }
      });
    });

    const ship = buildShip(bigLayout, 'regular');

    expect(ship).toHaveProperty('shipCoords');
    expect(ship).toHaveProperty('occupiedCoords');

    expect(ship.shipCoords).toEqual([]);
    expect(ship.occupiedCoords).toEqual([]);
  });
});
