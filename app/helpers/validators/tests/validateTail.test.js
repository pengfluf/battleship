import generateGrid from 'helpers/generators/generateGrid';

import validateTail from '../validateTail';

describe('validateTail', () => {
  let grid = [];
  const y = 5;
  const x = 5;

  beforeEach(() => {
    grid = generateGrid(10);
  });

  // Validation starts from the shifted initial cell, which
  // was calculated especially for it
  const horizontalCheck = [[5, 5], [5, 6], [5, 7]];
  const verticalCheck = [[5, 5], [6, 5], [7, 5]];

  it('Returns the correct result when the direction is up', () => {
    expect(validateTail(y, x, 'up', grid)).toEqual(horizontalCheck);
  });

  it('Returns an empty array if some of the cells are not valid when the direction is up', () => {
    grid[5][6] = undefined;
    grid[6][5].isShip = true;
    expect(validateTail(y, x, 'up', grid)).toEqual([]);
  });

  it('Returns the correct result when the direction is right', () => {
    expect(validateTail(y, x, 'right', grid)).toEqual(verticalCheck);
  });

  it('Returns an empty array if some of the cells are not valid when the direction is right', () => {
    grid[5][6] = undefined;
    grid[6][5].isShip = true;
    expect(validateTail(y, x, 'right', grid)).toEqual([]);
  });

  it('Returns the correct result when the direction is down', () => {
    expect(validateTail(y, x, 'down', grid)).toEqual(horizontalCheck);
  });

  it('Returns an empty array if some of the cells are not valid when the direction is down', () => {
    grid[5][6] = undefined;
    grid[6][5].isShip = true;
    expect(validateTail(y, x, 'down', grid)).toEqual([]);
  });

  it('Returns the correct result when the direction is left', () => {
    expect(validateTail(y, x, 'left', grid)).toEqual(verticalCheck);
  });

  it('Returns an empty array if some of the cells are not valid when the direction is left', () => {
    grid[5][6] = undefined;
    grid[6][5].isShip = true;
    expect(validateTail(y, x, 'left', grid)).toEqual([]);
  });
});
