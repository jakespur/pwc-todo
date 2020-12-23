export const isEmpty = (obj: undefined | object): boolean => {
  if (!obj) {
    return false;
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
