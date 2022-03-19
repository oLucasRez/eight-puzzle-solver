// ============================================================================
export function getRandom<Type>(array: Type[]) {
  return array[Math.floor(Math.random() * array.length)];
}
