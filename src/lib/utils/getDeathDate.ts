export function getDeathDate(age: number, lifeExpectancy: number) {
  const yearsRemaining = lifeExpectancy - age;
  const millisecondsRemaining = yearsRemaining * 365.25 * 24 * 60 * 60 * 1000;
  return Date.now() + millisecondsRemaining;
}
