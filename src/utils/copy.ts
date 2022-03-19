// ---------------------------------------------------------------------< utils
import { parse, stringfy } from '.';
// ============================================================================
export function copy<Type>(original: Type) {
  return parse<Type>(stringfy(original));
}
