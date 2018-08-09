import nanoid from 'nanoid';

/**
 * Generate static list of unique keys for the rows.
 * Usually the server do it for us and gives us the items
 * with the unique IDs. It's needed for React
 * list rendering.
 * @param {number} size - Rows amount. Equals to layout size.
 * @returns {string[]} - ID list.
 */
export default function generateIDList(size) {
  const result = [];
  const length = Math.floor(size / 2);
  for (let i = 0; i < size; i += 1) {
    result.push(nanoid(length));
  }
  return result;
}
