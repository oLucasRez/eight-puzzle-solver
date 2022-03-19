// ---------------------------------------------------------------------< utils
import { equals } from '.';
// ============================================================================
export function includes<Type>(array: Type[], item: Type) {
  return array.some((_item) => equals(_item, item));
}
