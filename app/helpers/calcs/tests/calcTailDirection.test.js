import calcTailDirection from '../calcTailDirection';

describe('calcTailDirection', () => {
  it('Returns the correct result when the direction is up', () => {
    expect(calcTailDirection('up')).toEqual('left');
  });

  it('Returns the correct result when the direction is right', () => {
    expect(calcTailDirection('right')).toEqual('up');
  });

  it('Returns the correct result when the direction is down', () => {
    expect(calcTailDirection('down')).toEqual('right');
  });

  it('Returns the correct result when the direction is left', () => {
    expect(calcTailDirection('left')).toEqual('down');
  });

  it('Returns an empty string when the direction is incorrect', () => {
    expect(calcTailDirection('wrongdirection')).toEqual('');
  });
});
