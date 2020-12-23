const TEMP_KEY = 'can_write';

export const localStorageIsAvailable = (): boolean => {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(TEMP_KEY, 'yes');
      if (localStorage.getItem(TEMP_KEY) === 'yes') {
        localStorage.removeItem(TEMP_KEY);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};
