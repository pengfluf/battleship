import getValidationInit from '../../cell/getValidationInit';

describe('getValidationInit', () => {
  const y = 5;
  const x = 5;

  describe('Tail coordinates', () => {
    const type = 'tail';

    it('Returns the correct result for the up direction', () => {
      expect(getValidationInit(y, x, 'up', type)).toEqual([3, 4]);
    });

    it('Returns the correct result for the right direction', () => {
      expect(getValidationInit(y, x, 'right', type)).toEqual([4, 7]);
    });

    it('Returns the correct result for the down direction', () => {
      expect(getValidationInit(y, x, 'down', type)).toEqual([7, 4]);
    });

    it('Returns the correct result for the left direction', () => {
      expect(getValidationInit(y, x, 'left', type)).toEqual([4, 3]);
    });

    it('Returns an empty array when direction specified incorrectly', () => {
      expect(getValidationInit(y, x, 'wrongdirection', type)).toEqual(
        [],
      );
    });
  });

  describe('Body coordinates', () => {
    const type = 'body';

    it('Returns the correct result for the up direction', () => {
      expect(getValidationInit(y, x, 'up', type)).toEqual([2, 5]);
    });

    it('Returns the correct result for the right direction', () => {
      expect(getValidationInit(y, x, 'right', type)).toEqual([5, 8]);
    });

    it('Returns the correct result for the down direction', () => {
      expect(getValidationInit(y, x, 'down', type)).toEqual([8, 5]);
    });

    it('Returns the correct result for the left direction', () => {
      expect(getValidationInit(y, x, 'left', type)).toEqual([5, 2]);
    });

    it('Returns an empty array when direction specified incorrectly', () => {
      expect(getValidationInit(y, x, 'wrongdirection', type)).toEqual(
        [],
      );
    });
  });
});
