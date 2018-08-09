export default function calcRandomUnchecked(layout) {
  const coords = [];
  let y = null;
  let x = null;
  let trials = 0;

  while (trials < layout.length * 10) {
    // Clear array if it's not empty
    if (coords.length) coords.splice(0, coords.length);

    // Randomly choose the coordinates
    for (let i = 0; i < 2; i += 1) {
      coords.push(Math.floor(Math.random() * layout.length));
    }

    // For utility
    [y, x] = [coords[0], coords[1]];

    // If unchecked cell is found return its' coordinates.
    if (!layout[y][x].checked) {
      return coords;
    }

    // Limit the number of attempts to find a valid cell
    trials += 1;
  }

  // Clean up the array of the non-valid data.
  coords.splice(0, coords.length);

  // Return an empty array, because the unchecked cell
  // wasn't found.
  return coords;
}
