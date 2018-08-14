# Battleship

Battleships with a dummy computer opponent. However, art makes it much better.

## How to start
Install dependencies

`yarn install` or `npm install`

Start the application at localhost:3000

`yarn start` or `npm start`

## Usage

The proccess of creating new grid and building some ships is pretty simple.

1. At first we need to generate the grid, right? So we use `generateGrid(size)` specifying the desired size.

2. Okay, grid is created, can we already build an actual ship? Sure! Use `buildShip(grid, type)`, pass to it the grid that was created earlier and the type of the ship.

You can create these `type`s of ships:
- Regular, 4 cells. Default type, specifying isn't needed.
- L shaped, also 4 cells, `LShaped`.
- Dot shaped, 1 cell, `dotShaped`.

## Example

```javascript
const grid = generateGrid(10);
const ship = buildShip(grid, 'LShaped');
```

## Useful terms
Initial cell – random valid cell, starting point of the ship construction. Use ```javascript getInit(grid)```.

Ship body – only the straight part of the ship. For example, bodyLength of regular 4 cells ship is 4, but `LShaped` 4 cells ship has bodyLength equal to 3, because its last cell is curved. This is the **tail**.

Body direction – determines the building direction of the body. Use ```javascript buildBody(initCell, bodyLength, grid).direction```.

Ship tail – curved part of the ship. Only `LShaped` ships have it. Tail length is always equals to 1. Use ```javascript buildTail(lastCell, bodyDirection, grid)```.

Tail direction – yes, tail also has its bulding direction. The direction of the tail is always fixed ( because 'L' letter can't be mirrored) and depends on the direction of the built body. For example, if we were building the ship from the initial cell to the top, the tail direction will always be equal to 'left'.

Last cell – the last cell of the building body. Being used for building a tail.

**Note**, that built ship has not only its own coordinates, but also the coordinates of the surrounding/occupied cells. Why? According to the rules of Battleship game ships must not touch each other and must have at least one cell between them. Use ```javascript buildShip(grid, type).occupiedCoords``` ot its modules – ```javascript buildBody(initCell, bodyLength, grid).occupiedCoords``` and ```javascript buildTail(lastCell, bodyDirection, grid).occupiedCoords```.

## How this really works?

I will not go into how the grid is generated. It's dead simple.
I'll describe in more detail the building of ships.

Detailed process involves the following steps:
1. Randomly choose the initial cell. It must be valid and have the surroundings valid cells too.
```javascript
const grid = generateGrid(10);
const initCell = getInit(grid); // e.g., [5,5]
```

2. Next, we start building the ship body calling the ```javascript buildBody(initCell, bodyLength, grid)```.

2.1 The ```javascript buildBody()``` randomly chooses the **direction**, in which the ship will be built. For example, *up* from initial cell.

2.2 If the type of the ship is `dotShaped`, bodyLength will be equal to 1.
If the ship is regular, `bodyLength` is 4.
If `LShaped`, then 3. Wait, why 3 and not 4? It's because the body of the ship is only the straight part of the ship, but the `LShaped` ship isn't completely straight and its last cell is curved. This is the **tail**. Don't worry, we'll build it later.

2.3 Before starting the actual construction, we want to be sure, that we can do it and all cells incuding the occupied ones are valid. So, obviously, let's validate using ```javascript validateCells(y, x, grid, mode)```. In its default mode it will return the array of valid **occupied cells** or, if at least one cell is invalid, am empty array. Also it has two additionals modes: `'uncheckedAndEmpty'` and `'unchecked'`. It's simple. The first one returns only the unchecked and cells that don't have ships. The second one returns all the unchecked cells.

2.4 For utility there's a ```javascript getValidationInit(y, x, direction, type)``` function, that accepts the initial cell coordinates and returns the new cell coordinates for starting **any** validation. ```javascript validateCells(y, x, grid, mode)``` uses `y` and `x` from ```javascript getValidationInit()```.

2.5 If all validations passed, the ```javascript construct(y, x, direction, bodyLength)``` will be called. It will return the actual coordinates of the ship and these coordinates will be pushed to the final result.

```javascript
// continuation
const body = buildBody([5,5], 3, 'LShaped');
```

3. Okay, that's all for regular or `dotShaped` ship, but what about `LShaped` ship and its tail? Let's build it. We'll be using ```javascript buildTail(lastCell, bodyDirection, grid)``` all further steps.

3.1 The direction of the tail is always fixed. Let's assume, that the building direction of the body is *up*, then the tail direction will be *left* (just rotate the 'L' letter). ```javascript buildTail()``` uses ```javascript getTailDirection(bodyDirection)``` for this operation.

3.2 Next, we ```javascript validateCells()``` and pass it result to the ```javascript validateTail(y, x, direction, grid)```. If at least one cell is invalid, ```javascript validateTail()``` will return an empty array, otherwise it will return cells **occupied** by the tail additionally.

3.3 All the next steps are pretty similar. If validations are passed, the tail will be ```javascript construct()```ed.
```javascript
// continuation
const tail = buildTail([3,5], 'up', grid);
```

4. At the moment we have the body and the tail both, you can use it however you want. If you want to combine all of it into one ship, just use ```javascript buildShip()```. It does all the operations from the above and finally combines it.
