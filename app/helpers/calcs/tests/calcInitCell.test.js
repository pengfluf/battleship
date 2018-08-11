import generateGrid from 'helpers/generators/generateGrid';

import calcInitCell from '../calcInitCell';

describe('calcInitCell', () => {
  let layout = [];

  beforeEach(() => {
    layout = generateGrid(1);
  });

  it('Returns the correct result', () => {
    expect(calcInitCell(layout)).toEqual([0, 0]);
  });

  it("Returns an empty array when there's no valid cell", () => {
    layout[0][0].isShip = true;
    expect(calcInitCell(layout)).toEqual([]);
  });
});
