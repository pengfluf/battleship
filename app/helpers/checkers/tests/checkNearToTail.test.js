import generateGrid from 'helpers/generators/generateGrid';

import checkNearToTail from '../checkNearToTail';

describe('checkNearToTail', () => {
  let layout = [];
  const y = 5;
  const x = 5;

  beforeEach(() => {
    layout = generateGrid(10);
  });

  // Checking starts from the shifted initial cell, which
  // was calculated especially for checking
  const horizontalCheck = [[5, 5], [5, 6], [5, 7]];
  const verticalCheck = [[5, 5], [6, 5], [7, 5]];

  it('Returns the correct result when the direction is up', () => {
    expect(checkNearToTail(y, x, 'up', layout)).toEqual(horizontalCheck);
  });

  it('Returns an empty array if some of the cells are not valid when the direction is up', () => {
    layout[5][6] = undefined;
    layout[6][5].isShip = true;
    expect(checkNearToTail(y, x, 'up', layout)).toEqual([]);
  });

  it('Returns the correct result when the direction is right', () => {
    expect(checkNearToTail(y, x, 'right', layout)).toEqual(verticalCheck);
  });

  it('Returns an empty array if some of the cells are not valid when the direction is right', () => {
    layout[5][6] = undefined;
    layout[6][5].isShip = true;
    expect(checkNearToTail(y, x, 'right', layout)).toEqual([]);
  });

  it('Returns the correct result when the direction is down', () => {
    expect(checkNearToTail(y, x, 'down', layout)).toEqual(horizontalCheck);
  });

  it('Returns an empty array if some of the cells are not valid when the direction is down', () => {
    layout[5][6] = undefined;
    layout[6][5].isShip = true;
    expect(checkNearToTail(y, x, 'down', layout)).toEqual([]);
  });

  it('Returns the correct result when the direction is left', () => {
    expect(checkNearToTail(y, x, 'left', layout)).toEqual(verticalCheck);
  });

  it('Returns an empty array if some of the cells are not valid when the direction is left', () => {
    layout[5][6] = undefined;
    layout[6][5].isShip = true;
    expect(checkNearToTail(y, x, 'left', layout)).toEqual([]);
  });
});
