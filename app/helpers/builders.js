import { calcInitCell } from './';
import { checkNearCells, checkNearToTail } from './checkers';

export function buildShip(layout, type) {
  console.log('START SHIP BUILDING');

  const directions = ['up', 'right', 'down', 'left'];
  let direction = '';
  let dirIndex = null;
  let directionIsCorrect = false;
  const shipCoords = [];
  const occupiedCoords = [];

  const initCell = calcInitCell(layout);
  console.log(`initCell is ${initCell}`);
  const [y, x] = [initCell[0], initCell[1]];

  if (type === 'dotShaped') {
    shipCoords.push(initCell);
    occupiedCoords.push(checkNearCells(y, x, layout));
    return {
      shipCoords,
      occupiedCoords,
    };
  }

  // TODO: If bodyLength % 3 === 0, then it has
  // a tail, so we have to check its nearest cells
  // in the end
  let bodyLength = 4;

  if (type === 'LShaped') {
    bodyLength = 3;
  }

  while (!directionIsCorrect) {
    dirIndex = Math.floor(Math.random() * directions.length);
    direction = directions[dirIndex];
    console.log(`Building ship to ${direction}`);

    // TODO: checkNearCells with for loop if ships
    // bodyLength will be longer
    switch (direction) {
      case 'up':
        occupiedCoords.push(...checkNearCells(y - 3, x, layout));
        directionIsCorrect = !!occupiedCoords.length;
        break;
      case 'right':
        occupiedCoords.push(...checkNearCells(y, x + 3, layout));
        directionIsCorrect = !!occupiedCoords.length;
        break;
      case 'down':
        occupiedCoords.push(...checkNearCells(y + 3, x, layout));
        directionIsCorrect = !!occupiedCoords.length;
        break;
      case 'left':
        occupiedCoords.push(...checkNearCells(y, x - 3, layout));
        directionIsCorrect = !!occupiedCoords.length;
        break;
      default:
        directionIsCorrect = false;
    }

    console.log(`OCCUPIED COORDS`);
    console.log(checkNearCells(y - 3, x, layout));
    console.log(directionIsCorrect);
    console.log(occupiedCoords);

    if (directionIsCorrect) {
      switch (direction) {
        case 'up':
          for (let i = 0; i < bodyLength; i += 1) {
            shipCoords.push([y - i, x]);
          }
          break;
        case 'right':
          for (let i = 0; i < bodyLength; i += 1) {
            shipCoords.push([y, x + i]);
          }
          break;
        case 'down':
          for (let i = 0; i < bodyLength; i += 1) {
            shipCoords.push([y + i, x]);
          }
          break;
        case 'left':
          for (let i = 0; i < bodyLength; i += 1) {
            shipCoords.push([y, x - i]);
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

  if (type === 'LShaped') {
    const lastCell = shipCoords[shipCoords.length - 1];
    console.log(`lastCell is ${lastCell}`);
    const tail = buildTail(lastCell, direction, layout);
    shipCoords.push(tail.tailCoords);
    occupiedCoords.push(tail.occupiedCoords);
  }

  return {
    shipCoords,
    occupiedCoords,
  };
}

export function buildTail(lastCell, direction, layout) {
  const tailDirections = [];
  let dirIndex = null;
  let tailDirection = null;
  let tailDirIsCorrect = false;
  const tailCoords = [];
  const occupiedCoords = [];

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
        occupiedCoords.push(
          ...checkNearToTail(y - 2, x - 1, direction, layout),
        );
        tailDirIsCorrect = !!occupiedCoords.length;
        break;
      case 'right':
        occupiedCoords.push(
          ...checkNearToTail(y - 1, x + 2, direction, layout),
        );
        tailDirIsCorrect = !!occupiedCoords.length;
        break;
      case 'down':
        occupiedCoords.push(
          ...checkNearToTail(y + 2, x - 1, direction, layout),
        );
        tailDirIsCorrect = !!occupiedCoords.length;
        break;
      case 'left':
        occupiedCoords.push(
          ...checkNearToTail(y - 1, x - 2, direction, layout),
        );
        tailDirIsCorrect = !!occupiedCoords.length;
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

  return {
    tailCoords,
    occupiedCoords,
  };
}
