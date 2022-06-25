export function booleanToIntValue(booleanValue) {
    const finalValue = booleanValue.toLowerCase()== 'true' ? 1 : 0;
  return finalValue;
}