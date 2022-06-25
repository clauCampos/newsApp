export function booleanToIntValue(booleanValue) {
    const integerValue = booleanValue.toLowerCase()== 'true' ? 1 : 0;
  return integerValue;
}