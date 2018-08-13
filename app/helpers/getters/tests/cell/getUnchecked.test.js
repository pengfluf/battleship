import generateGrid from 'helpers/generators/generateGrid';

import getUnchecked from 'helpers/getters/cell/getUnchecked';

describe('getUnchecked', () => {
  let grid = [];

  beforeEach(() => {
    grid = generateGrid(1);
  });

  it('Returns the correct result', () => {
    expect(getUnchecked(grid)).toEqual([0, 0]);
  });

  it("Returns an empty array when there's no unchecked cell", () => {
    grid[0][0].checked = true;
    expect(getUnchecked(grid)).toEqual([]);
  });
});
