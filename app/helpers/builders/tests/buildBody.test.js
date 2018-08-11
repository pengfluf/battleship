import generateGrid from 'helpers/generators/generateGrid';

import calcShiftedInit from 'helpers/calcs/calcShiftedInit';

import checkNearCells from 'helpers/checkers/checkNearCells';

import buildBody from '../buildBody';

describe('buildBody', () => {
  let layout = [];
  let body = null;
  let shiftedInit = [];
  const bodyLength = 3;
  const initCell = [5, 5];
  const [y, x] = [initCell[0], initCell[1]];

  const bodyUp = [[5, 5], [4, 5], [3, 5]];
  const bodyRight = [[5, 5], [5, 6], [5, 7]];
  const bodyDown = [[5, 5], [6, 5], [7, 5]];
  const bodyLeft = [[5, 5], [5, 4], [5, 3]];

  beforeEach(() => {
    layout = generateGrid(10);
  });

  afterEach(() => {
    body = null;
  });

  it('Returns the correct result', () => {
    body = buildBody(initCell, bodyLength, layout);
    shiftedInit = calcShiftedInit(y, x, body.direction, 'body');
    const occupiedCoords = checkNearCells(
      shiftedInit[0],
      shiftedInit[1],
      layout,
      'filter',
    );

    expect(body.coords).toHaveLength(3);

    expect(body).toHaveProperty('direction');
    expect(body).toHaveProperty('coords');
    expect(body).toHaveProperty('occupiedCoords');

    expect(occupiedCoords).toEqual(body.occupiedCoords);

    switch (body.direction) {
      case 'up':
        expect(body.coords).toEqual(bodyUp);
        break;
      case 'right':
        expect(body.coords).toEqual(bodyRight);
        break;
      case 'down':
        expect(body.coords).toEqual(bodyDown);
        break;
      case 'left':
        expect(body.coords).toEqual(bodyLeft);
        break;
      default:
    }
  });

  it('Returns empty arrays when the ship body cannot be built', () => {
    layout = [];

    body = buildBody(initCell, bodyLength, layout);

    expect(body).toHaveProperty('direction');
    expect(body).toHaveProperty('coords');
    expect(body).toHaveProperty('occupiedCoords');

    expect(body.coords).toEqual([]);
    expect(body.occupiedCoords).toEqual([]);
  });
});
