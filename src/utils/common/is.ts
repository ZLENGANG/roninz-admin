/* eslint-disable @typescript-eslint/no-explicit-any */
export function isNull(val: any): boolean {
  return val === null;
}

export function isUndef(val: any): boolean {
  return typeof val === 'undefined';
}

export function isWhitespace(val: string): boolean {
  return val === '';
}

export function isNullOrUndef(val: any): boolean {
  return isNull(val) || isUndef(val);
}

export function isNullOrWhitespace(val: any): boolean {
  return isNullOrUndef(val) || isWhitespace(val);
}
