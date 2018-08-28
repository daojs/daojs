import sum from './sum';

describe('sum', () => {
  it('sum 2 + 3', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('sum 1 + 1', () => {
    expect(sum(1, 1)).toBe(2);
  });
});
