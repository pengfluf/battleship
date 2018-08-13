import generateGrid from 'helpers/generators/generateGrid';

import validateCells from '../validateCells';

describe('validateCells', () => {
  let grid = [];
  const y = 5;
  const x = 5;

  beforeEach(() => {
    grid = generateGrid(10);
  });

  // Expected result is the same for all modes because
  // all of the cells of a new grid around [5,5] cell are
  // valid, existing and unchecked
  const expected = [
    [4, 4],
    [4, 5],
    [4, 6],
    [5, 4],
    [5, 5],
    [5, 6],
    [6, 4],
    [6, 5],
    [6, 6],
  ];

  // There's some divergence between the helper function
  // and a dispatched redux action. So we like duplicate
  // the clicked cell, but actually we don't.
  // It's more of a bug that's needed to be fixed.
  const expectedWhenClicked = [
    [4, 4],
    [4, 5],
    [4, 6],
    [5, 4],
    [5, 5],
    [5, 6],
    [6, 4],
    [6, 5],
    [6, 6],
    [5, 5],
  ];

  it('Returns the correct result in the standard validation mode', () => {
    expect(validateCells(y, x, grid)).toEqual(expected);
  });

  it('Returns an empty array in standard validation mode when some of the cells are not valid', () => {
    grid[6][4] = undefined;
    grid[6][5].isShip = true;
    grid[6][6].occupied = true;

    expect(validateCells(y, x, grid)).toEqual([]);
  });

  it("Returns the correct result in the 'uncheckedAndEmpty' mode", () => {
    expect(validateCells(y, x, grid, 'uncheckedAndEmpty')).toEqual(
      expectedWhenClicked,
    );
  });

  it("Returns the correct result in the 'unchecked' mode", () => {
    expect(validateCells(y, x, grid, 'unchecked')).toEqual(expected);
  });

  it('Returns an empty array when y or x are less than 0', () => {
    expect(validateCells(-5, -5, grid)).toEqual([]);
  });

  it('Returns an empty array when y or x are greater than the grid.length - 1', () => {
    expect(
      validateCells(y + grid.length, x + grid.length, grid),
    ).toEqual([]);
  });
});
