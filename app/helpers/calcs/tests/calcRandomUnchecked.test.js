import generateGrid from 'helpers/generators/generateGrid';

import calcRandomUnchecked from '../calcRandomUnchecked';

describe('calcRandomUnchecked', () => {
  let layout = [];

  beforeEach(() => {
    layout = generateGrid(1);
  });

  it('Returns the correct result', () => {
    expect(calcRandomUnchecked(layout)).toEqual([0, 0]);
  });

  it("Returns an empty array when there's no unchecked cell", () => {
    layout[0][0].checked = true;
    expect(calcRandomUnchecked(layout)).toEqual([]);
  });
});
