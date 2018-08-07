import { calcInitCell } from './';
import { checkNearCells, checkNearToTail } from './checkers';

export function buildShip(layout, type) {
  const directions = ['up', 'right', 'down', 'left'];
  let direction = '';
  let dirIndex = null;
  let directionIsCorrect = false;
  const coords = [];

  const initCell = calcInitCell(layout);
  console.log(`initCell is ${initCell}`);
  const [y, x] = [initCell[0], initCell[1]];

  while (!directionIsCorrect) {
    dirIndex = Math.floor(Math.random() * directions.length);
    direction = directions[dirIndex];
    console.log(`Building ship to ${direction}`);

    switch (direction) {
      case 'up':
        directionIsCorrect = checkNearCells(y - 3, x, layout);
        break;
      case 'right':
        directionIsCorrect = checkNearCells(y, x + 3, layout);
        break;
      case 'down':
        directionIsCorrect = checkNearCells(y + 3, x, layout);
        break;
      case 'left':
        directionIsCorrect = checkNearCells(y, x - 3, layout);
        break;
      default:
        directionIsCorrect = false;
    }

    if (directionIsCorrect) {
      switch (direction) {
        case 'up':
          for (let i = 0; i < 3; i += 1) {
            coords.push([y - i, x]);
          }
          break;
        case 'right':
          for (let i = 0; i < 3; i += 1) {
            coords.push([y, x + i]);
          }
          break;
        case 'down':
          for (let i = 0; i < 3; i += 1) {
            coords.push([y + i, x]);
          }
          break;
        case 'left':
          for (let i = 0; i < 3; i += 1) {
            coords.push([y, x - i]);
          }
          break;
        default:
          directionIsCorrect = false;
      }
    } else {
      directions.splice(dirIndex, 1);
    }

    if (!directionIsCorrect && !directions.length) break;
  }

  const lastCell = coords[coords.length - 1];
  console.log(`lastCell is ${lastCell}`);
  if (type === 'LShaped') {
    coords.push(buildTail(lastCell, direction, layout));
  }

  return coords;
}

export function buildTail(lastCell, direction, layout) {
  const tailDirections = [];
  let dirIndex = null;
  let tailDirection = null;
  let tailDirIsCorrect = false;
  const tailCoords = [];

  if (direction === 'up' || direction === 'down') {
    tailDirections.push('left', 'right');
  } else {
    tailDirections.push('up', 'down');
  }

  const [y, x] = [lastCell[0], lastCell[1]];

  while (!tailDirIsCorrect) {
    dirIndex = Math.floor(Math.random() * tailDirections.length);
    tailDirection = tailDirections[dirIndex];
    console.log(`Tail direction is ${tailDirection}`);
    switch (tailDirection) {
      case 'up':
        tailDirIsCorrect = checkNearToTail(y - 2, x - 1, direction, layout);
        break;
      case 'right':
        tailDirIsCorrect = checkNearToTail(y - 1, x + 2, direction, layout);
        break;
      case 'down':
        tailDirIsCorrect = checkNearToTail(y + 2, x - 1, direction, layout);
        break;
      case 'left':
        tailDirIsCorrect = checkNearToTail(y - 1, x - 2, direction, layout);
        break;
      default:
        tailDirIsCorrect = false;
    }

    if (!tailDirIsCorrect) tailDirections.splice(dirIndex, 1);

    if (!tailDirIsCorrect && !tailDirections.length) break;
  }

  if (tailDirIsCorrect) {
    switch (tailDirection) {
      case 'up':
        tailCoords.push(y - 1, x);
        break;
      case 'right':
        tailCoords.push(y, x + 1);
        break;
      case 'down':
        tailCoords.push(y + 1, x);
        break;
      case 'left':
        tailCoords.push(y, x - 1);
        break;
      default:
        tailDirIsCorrect = false;
    }
  }

  return tailCoords;
}
