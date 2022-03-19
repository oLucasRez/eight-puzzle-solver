// ---------------------------------------------------------------------< types
import { equals } from '.';
// ============================================================================
export function has<Type>(array: Type[], value: Type) {
  return array.some((_value) => equals(value, _value));
}
