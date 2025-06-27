export function isSingularOrPlural(value: number, singular: string, plural: string) {
  if (value > 0 && value < 2) {
    return singular;
  } else {
    return plural;
  }
}