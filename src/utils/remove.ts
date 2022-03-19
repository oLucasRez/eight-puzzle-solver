// ---------------------------------------------------------------------< utils
import { equals } from '.';
// ============================================================================
export function remove<Type>(array: Type[], item: Type) {
  const newArray = array.filter((_item) => !equals(_item, item));

  while (array.length) array.pop();
  array.push(...newArray);
}
