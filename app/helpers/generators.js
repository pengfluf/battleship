import nanoid from 'nanoid';

export function generateGrid(size) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    const row = [];
    for (let j = 0; j < size; j += 1) {
      row.push({
        id: nanoid(7),
        isShip: false,
        occupied: false,
        checked: false,
      });
    }
    result.push(row);
  }
  return result;
}

export function generateIDList(size) {
  const result = [];
  const length = Math.floor(size / 2);
  for (let i = 0; i < size; i += 1) {
    result.push(nanoid(length));
  }
  return result;
}
