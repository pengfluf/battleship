# Helpers

## Builders
There is the `buildShip()` in the folder root, which uses `buildBody()` and `buildTail()` from builders/modules.

`construct()` returns the ship coordinates, finally constructs the ship when all validations are done.

Builders, obviously, are needed for the final stage – actual ship building.

## Generators
Generators are `generateGrid()` and `generateIDList()`. The first one is obvious, the second one is just a utility for the correct React list rendering.

## Getters
All that is located in getters/cell we need to get something about cells.

We have here:
* `getInit()` for getting initial cell for ship building
* `getUnchecked()` for getting all unchecked cells around specified one. In this project it's used for finding all the unchecked cells around the clicked cell.
* `getValidationInit()` for getting the initial cell for validation. It is **not** starting point of ship building, but the starting point of **any kind of validation**.

Also in the root you can find `getTailDirection()`, which is needed for getting tail direction, when we've already built the body and know its direction. Read more about [how this really works](how-this-really-works.md) and check out the [Useful Terms](useful-terms.md) section.

## Validators
`validateCells()` and `validateTail()` in addition to validation, return the array of valid data.

There's an exception for `validateCells()`. It returns an empty array in default mode, when at least one cell is invalid, but in other modes returns all the cells that satisfy the provided condition.
