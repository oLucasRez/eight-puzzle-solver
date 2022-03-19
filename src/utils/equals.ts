// ---------------------------------------------------------------------< utils
import { stringfy } from '.';
// ============================================================================
export function equals<Type>(...values: Type[]) {
  return !values.some((value) => stringfy(value) !== stringfy(values[0]));
}
