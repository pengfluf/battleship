import generateGrid from 'helpers/generators/generateGrid';

import getInit from '../../cell/getInit';

describe('getInit', () => {
  let grid = [];

  beforeEach(() => {
    grid = generateGrid(1);
  });

  it('Returns the correct result', () => {
    expect(getInit(grid)).toEqual([0, 0]);
  });

  it("Returns an empty array when there's no valid cell", () => {
    grid[0][0].isShip = true;
    expect(getInit(grid)).toEqual([]);
  });
});
