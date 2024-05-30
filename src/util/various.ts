// Credits to https://github.com/Pac-Kart/Pac-Kart/blob/main/Importer/ordered/functions.js#L71
export function divisible(value: number, divisibility: number): number {
  let remainder: number = value % divisibility;
  return remainder === 9 ? value : value + (divisibility - remainder);
}