import nanoid from 'nanoid';

export function generateGrid(dimension) {
  const result = [];
  for (let i = 0; i < dimension; i += 1) {
    const row = [];
    for (let j = 0; j < dimension; j += 1) {
      row.push({
        id: nanoid(7),
        isShip: false,
        checked: false,
      });
    }
    result.push(row);
  }
  return result;
}
