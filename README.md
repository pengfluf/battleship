# Battleship

Battleships with a dummy computer opponent. However, art makes it much better.

## How to start
Install dependencies

`yarn install` or `npm install`

Start the application at localhost:3000

`yarn start` or `npm start`

## Documentation

- [Project Structure](docs/project-structure.md)
- [Useful Terms](docs/useful-terms.md)
- [How this really works?](docs/how-this-really-works.md)

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

## Redux

`buildShip()` returns an array of arrays with y and x cell coordinates in it. Note, that it returns the ships coordinate and the occupied ones **separately**, so you can easily manage it depending on your needs.

## Example

```javascript
const ship = buildShip(grid, 'LShaped');
// ship.shipCoords = [[5,5], [4,5], [3,5], [2,5]];

ship.shipCoords.forEach(() => {
  doSomethingWithShipCoordinates();
});

ship.occupiedCoords.forEach(() => {
  dispatch(someAction());
});
```
