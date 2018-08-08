import { calcInitCell, calcShiftedInit } from './calcs';
import { checkNearCells, checkNearToTail } from './checkers';

export function constructPart(y, x, direction, bodyLength) {
  const result = [];
  let tailShift = 0;

  if (bodyLength === 1) tailShift = 1;

  switch (direction) {
    case 'up':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        result.push([y - i, x]);
      }
      break;
    case 'right':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        result.push([y, x + i]);
      }
      break;
    case 'down':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        result.push([y + i, x]);
      }
      break;
    case 'left':
      for (let i = tailShift; i < bodyLength + tailShift; i += 1) {
        result.push([y, x - i]);
      }
      break;
    default:
      return result;
  }
  return result;
}

export function buildShip(layout, type) {
  const directions = ['up', 'right', 'down', 'left'];
  let direction = '';
  let dirIndex = null;
  let directionIsCorrect = false;
  const shipCoords = [];
  const occupiedCoords = [];
  let trials = 0;

  const initCell = calcInitCell(layout);
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

    // TODO: Create separate function for the validation. DRY

    // Calculate the initial shifted cell for further checking
    const shiftedInit = calcShiftedInit(y, x, direction, 'ship');

    // Utility
    const [shiftedY, shiftedX] = [shiftedInit[0], shiftedInit[1]];

    // Getting coords of cells occupied by the ship
    occupiedCoords.push(...checkNearCells(shiftedY, shiftedX, layout));

    // If we didn't get occupied coords at all, it means that
    // the direction is wrong, so we don't actually need it.
    // directionIsCorrect variable is needed for better readability.
    directionIsCorrect = !!occupiedCoords.length;

    // If we are still in a loop, that means the direction is wrong.
    directions.splice(dirIndex, 1);

    trials += 1;
    if (trials > layout.length) break;
  }

  if (directionIsCorrect) {
    shipCoords.push(...constructPart(y, x, direction, bodyLength));
  }

  if (type === 'LShaped') {
    const lastCell = shipCoords[shipCoords.length - 1];
    const tail = buildTail(lastCell, direction, layout);

    console.log('TAIL');
    console.log(tail);

    if (tail.tailCoords.length) {
      shipCoords.push(...tail.tailCoords);
      occupiedCoords.push(...tail.occupiedCoords);
    } else {
      shipCoords.splice(0, shipCoords.length);
      occupiedCoords.splice(0, occupiedCoords.length);
    }
  }

  console.log('SHIP COORDS');
  console.log(shipCoords);
  console.log('OCCUPIED COORDS');
  console.log(occupiedCoords);

  return {
    shipCoords,
    occupiedCoords,
  };
}

export function buildTail(lastCell, direction, layout) {
  console.log(lastCell);
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

  // Utility
  const [y, x] = [lastCell[0], lastCell[1]];

  while (!tailDirIsCorrect) {
    dirIndex = Math.floor(Math.random() * tailDirections.length);
    tailDirection = tailDirections[dirIndex];

    // TODO: Create separate function for the validation. DRY

    // Calculate the initial shifted cell for further checking
    const shiftedInit = calcShiftedInit(y, x, tailDirection, 'tail');

    console.log('TAIL DIRECTION');
    console.log(tailDirection);

    console.log('SHIFTED INIT');
    console.log(shiftedInit);

    // Utility
    const [shiftedY, shiftedX] = [shiftedInit[0], shiftedInit[1]];

    if (
      shiftedY >= 0 &&
      shiftedX >= 0 &&
      shiftedY <= layout.length - 1 &&
      shiftedX <= layout.length - 1
    ) {
      // Getting coords of cells occupied by the ship
      occupiedCoords.push(
        ...checkNearToTail(shiftedY, shiftedX, tailDirection, layout),
      );
    }

    // If we didn't get occupied coords at all, it means that
    // the direction is wrong, so we don't actually need it.
    // tailDirIsCorrect variable is needed for better readability.
    tailDirIsCorrect = !!occupiedCoords.length;

    if (!tailDirIsCorrect) tailDirections.splice(dirIndex, 1);

    if (!tailDirIsCorrect && !tailDirections.length) break;
  }

  if (tailDirIsCorrect) {
    console.log('CONSTRUCT PART GIVES:');
    console.log(constructPart(y, x, tailDirection, 1));
    tailCoords.push(...constructPart(y, x, tailDirection, 1));
  }

  return {
    tailCoords,
    occupiedCoords,
  };
}
