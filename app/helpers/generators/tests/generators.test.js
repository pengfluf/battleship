import generateGrid from '../generateGrid';
import generateIDList from '../generateIDList';

describe('Generators', () => {
  describe('generateGrid', () => {
    it('Returns the correct result', () => {
      const grid = generateGrid(1);
      expect(grid).toHaveLength(1);

      const row = grid[0];
      const cell = row[0];
      expect(row).toHaveLength(1);
      expect(cell).toHaveProperty('id');
      expect(cell).toHaveProperty('isShip', false);
      expect(cell).toHaveProperty('occupied', false);
      expect(cell).toHaveProperty('checked', false);
    });
  });

  describe('generateIDList', () => {
    it('Returns the correct result', () => {
      const list = generateIDList(5);
      expect(list).toHaveLength(5);
    });
  });
});
