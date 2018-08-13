import generateGrid from 'helpers/generators/generateGrid';

import getValidationInit from 'helpers/getters/cell/getValidationInit';

import validateCells from 'helpers/validators/validateCells';

import buildBody from 'helpers/builders/modules/buildBody';

describe('buildBody', () => {
  let grid = [];
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
    grid = generateGrid(10);
  });

  afterEach(() => {
    body = null;
  });

  it('Returns the correct result', () => {
    body = buildBody(initCell, bodyLength, grid);
    shiftedInit = getValidationInit(y, x, body.direction, 'body');
    const occupiedCoords = validateCells(
      shiftedInit[0],
      shiftedInit[1],
      grid,
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
    grid = [];

    body = buildBody(initCell, bodyLength, grid);

    expect(body).toHaveProperty('direction');
    expect(body).toHaveProperty('coords');
    expect(body).toHaveProperty('occupiedCoords');

    expect(body.coords).toEqual([]);
    expect(body.occupiedCoords).toEqual([]);
  });
});
