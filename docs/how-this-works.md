# How this really works?

Make sure you've already checked [Useful Terms](how-this-really-works.md) section. This will make reading and understanding the current section much easier.

I will not go into how the grid is generated. It's dead simple.
I'll describe in more detail the building of ships.

## It all starts with the Initial Cell

At first we randomly choose the initial cell. It must be valid and have the surroundings valid cells too.

```javascript
const grid = generateGrid(10);
const initCell = getInit(grid); // e.g., [5,5]
```

## Body Building 💪⛵️

Next, we start building the ship body with the ```buildBody(initCell, bodyLength, grid)```.

The ```buildBody()``` randomly chooses the **direction**, in which the ship will be built. For example, *up* from the initial cell.

  * If the type of the ship is `dotShaped`, bodyLength will be equal to 1.
  * If the ship is regular, `bodyLength` is 4.
  * If `LShaped`, then 3. Wait, why 3 and not 4? It's because the body of the ship is only the straight part of the ship, but the `LShaped` ship isn't completely straight and its last cell is curved. This is the **tail**. Don't worry, we'll build it later.

Before starting the actual construction, we want to be sure, that we can do it and all cells incuding the occupied ones are valid. So, obviously, let's validate using ```validateCells(y, x, grid, mode)```. In its default mode it will return the array of valid **occupied cells** or, if at least one cell is invalid, am empty array.

Also it has two additionals modes: `'uncheckedAndEmpty'` and `'unchecked'`. It's simple. The first one returns only the unchecked and cells that don't have ships. The second one returns all the unchecked cells.

For utility there's a ```getValidationInit(y, x, direction, type)``` function, that accepts the initial cell coordinates and returns the new cell coordinates for starting **any** validation. ```validateCells(y, x, grid, mode)``` uses `y` and `x` from ```getValidationInit()```.

If all validations passed, the ```construct(y, x, direction, bodyLength)``` will be called. It will return the actual coordinates of the ship and these coordinates will be pushed to the final result.

```javascript
// continuation
const body = buildBody([5,5], 3, 'LShaped');
```

## Tail Building 🐈

Okay, that's all for regular or `dotShaped` ship, but what about `LShaped` ship and its tail? Let's build it. We'll be using ```buildTail(lastCell, bodyDirection, grid)``` all further steps.

The direction of the tail is always fixed. Let's assume, that the building direction of the body is *up*, then the tail direction will be *left* (just rotate the 'L' letter). ```buildTail()``` uses ```getTailDirection(bodyDirection)``` for this operation.

Next, we ```validateCells()``` and pass it result to the ```validateTail(y, x, direction, grid)```. If at least one cell is invalid, ```validateTail()``` will return an empty array, otherwise it will return cells **occupied** by the tail additionally.

All the next steps are pretty similar. If validations are passed, the tail will be ```construct()```ed.

```javascript
// continuation
const tail = buildTail([3,5], 'up', grid);
```

## Combine it all 🚢🚣

4. At the moment we have the body and the tail both, you can use it however you want. If you want to combine all of it into one ship, just use ```buildShip()```. It does all the operations from the above and finally combines it.
