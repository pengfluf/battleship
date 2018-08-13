import construct from 'helpers/builders/modules/construct';

describe('construct', () => {
  const y = 5;
  const x = 5;

  describe('Tail', () => {
    it('Returns the correct result for the up direction', () => {
      expect(construct(y, x, 'up', 1)).toEqual([[4, 5]]);
    });
    it('Returns the correct result for the right direction', () => {
      expect(construct(y, x, 'right', 1)).toEqual([[5, 6]]);
    });
    it('Returns the correct result for the down direction', () => {
      expect(construct(y, x, 'down', 1)).toEqual([[6, 5]]);
    });
    it('Returns the correct result for the left direction', () => {
      expect(construct(y, x, 'left', 1)).toEqual([[5, 4]]);
    });
    it('Returns an empty array if the direction is incorrect', () => {
      expect(construct(y, x, 'wrongdirection', 1)).toEqual([]);
    });
  });

  describe('Body', () => {
    it('Returns the correct result for the up direction', () => {
      expect(construct(y, x, 'up', 3)).toEqual([
        [5, 5],
        [4, 5],
        [3, 5],
      ]);
    });
    it('Returns the correct result for the right direction', () => {
      expect(construct(y, x, 'right', 3)).toEqual([
        [5, 5],
        [5, 6],
        [5, 7],
      ]);
    });
    it('Returns the correct result for the down direction', () => {
      expect(construct(y, x, 'down', 3)).toEqual([
        [5, 5],
        [6, 5],
        [7, 5],
      ]);
    });
    it('Returns the correct result for the left direction', () => {
      expect(construct(y, x, 'left', 3)).toEqual([
        [5, 5],
        [5, 4],
        [5, 3],
      ]);
    });
    it('Returns an empty array if the direction is incorrect', () => {
      expect(construct(y, x, 'wrongdirection', 3)).toEqual([]);
    });
  });
});
