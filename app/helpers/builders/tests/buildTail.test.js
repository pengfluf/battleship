import generateGrid from 'helpers/generators/generateGrid';

import buildTail from '../buildTail';

describe('buildTail', () => {
  const layout = generateGrid(10);
  const lastCell = [5, 5];

  it('Returns the correct result when the body direction is up', () => {
    const tail = buildTail(lastCell, 'up', layout);

    expect(tail.coords).toEqual([[5, 4]]);
    expect(tail.occupiedCoords.length).toBeGreaterThanOrEqual(1);
  });

  it('Returns the correct result when the body direction is right', () => {
    const tail = buildTail(lastCell, 'right', layout);

    expect(tail.coords).toEqual([[4, 5]]);
    expect(tail.occupiedCoords.length).toBeGreaterThanOrEqual(1);
  });

  it('Returns the correct result when the body direction is down', () => {
    const tail = buildTail(lastCell, 'down', layout);

    expect(tail.coords).toEqual([[5, 6]]);
    expect(tail.occupiedCoords.length).toBeGreaterThanOrEqual(1);
  });

  it('Returns the correct result when the body direction is left', () => {
    const tail = buildTail(lastCell, 'left', layout);

    expect(tail.coords).toEqual([[6, 5]]);
    expect(tail.occupiedCoords.length).toBeGreaterThanOrEqual(1);
  });

  it('Returns empty arrays when the direction is incorrect', () => {
    const tail = buildTail(lastCell, 'wrongdirection', layout);

    expect(tail.coords).toEqual([]);
    expect(tail.occupiedCoords).toEqual([]);
  });
});
