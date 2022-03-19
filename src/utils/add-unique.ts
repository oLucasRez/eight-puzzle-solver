// ---------------------------------------------------------------------< utils
import { includes } from '.';
// ============================================================================
export function addUnique<Type>(array: Type[], ...items: Type[]) {
  const newArray = array.filter((item) => !includes(items, item));
  newArray.unshift(...items);

  while (array.length) array.pop();
  array.push(...newArray);
}
