import { isSingularOrPlural } from '../isSingularOrPlural';

describe('isSingularOrPlural', () => {
  const singular = 'year';
  const plural = 'years';

  it('should return singular for value of 1', () => {
    expect(isSingularOrPlural(1, singular, plural)).toBe(singular);
  });

  it('should return plural for value of 0', () => {
    expect(isSingularOrPlural(0, singular, plural)).toBe(plural);
  });

  it('should return plural for value of 2', () => {
    expect(isSingularOrPlural(2, singular, plural)).toBe(plural);
  });

  it('should return plural for negative values', () => {
    expect(isSingularOrPlural(-1, singular, plural)).toBe(plural);
  });

  it('should return singular for values between 0 and 2 (exclusive of 0)', () => {
    expect(isSingularOrPlural(0.5, singular, plural)).toBe(singular);
    expect(isSingularOrPlural(1.5, singular, plural)).toBe(singular);
  });

  it('should return plural for values greater than or equal to 2', () => {
    expect(isSingularOrPlural(10, singular, plural)).toBe(plural);
  });
});
