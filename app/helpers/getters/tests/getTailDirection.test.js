import getTailDirection from '../getTailDirection';

describe('getTailDirection', () => {
  it('Returns the correct result when the direction is up', () => {
    expect(getTailDirection('up')).toEqual('left');
  });

  it('Returns the correct result when the direction is right', () => {
    expect(getTailDirection('right')).toEqual('up');
  });

  it('Returns the correct result when the direction is down', () => {
    expect(getTailDirection('down')).toEqual('right');
  });

  it('Returns the correct result when the direction is left', () => {
    expect(getTailDirection('left')).toEqual('down');
  });

  it('Returns an empty string when the direction is incorrect', () => {
    expect(getTailDirection('wrongdirection')).toEqual('');
  });
});
