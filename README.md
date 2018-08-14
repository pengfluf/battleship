# Battleship

Battleships with a dummy computer opponent. However, art makes it much better.

## How to start
Install dependencies

`yarn install` or `npm install`

Start the application at localhost:3000

`yarn start` or `npm start`

## Documentation

[Useful Terms](docs/useful-terms.md)
[How this really works?](docs/how-this-really-works.md)

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
