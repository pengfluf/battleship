import generateGrid from 'helpers/generators/generateGrid';

import checkNearCells from '../checkNearCells';

describe('checkNearCells', () => {
  let layout = [];
  const y = 5;
  const x = 5;

  beforeEach(() => {
    layout = generateGrid(10);
  });

  // Expected result is the same for all modes because
  // all of the cells of a new layout around [5,5] cell are
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

  it('Returns the correct result in the filtrating mode', () => {
    expect(checkNearCells(y, x, layout, 'filter')).toEqual(expected);
  });

  it('Returns an empty array in filtrating mode when some of the cells are not valid', () => {
    layout[6][4] = undefined;
    layout[6][5].isShip = true;
    layout[6][6].occupied = true;

    expect(checkNearCells(y, x, layout, 'filter')).toEqual([]);
  });

  it('Returns the correct result in the collect mode', () => {
    expect(checkNearCells(y, x, layout, 'collect')).toEqual(
      expectedWhenClicked,
    );
  });

  it('Returns the correct result in the findUnchecked mode', () => {
    expect(checkNearCells(y, x, layout, 'findUnchecked')).toEqual(expected);
  });

  it('Returns an empty array when y or x are less than 0', () => {
    expect(checkNearCells(-5, -5, layout)).toEqual([]);
  });

  it('Returns an empty array when y or x are greater than the layout.length - 1', () => {
    expect(
      checkNearCells(y + layout.length, x + layout.length, layout),
    ).toEqual([]);
  });
});
