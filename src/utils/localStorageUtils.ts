import { LocalStorageKeys } from "../constants";

export const getLocalStorageItem = <T>(
  key: LocalStorageKeys,
  defaultValue: T
): T => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error("Failed to retrieve item from localStorage", error);
    return defaultValue;
  }
};

export const setLocalStorageItem = <T>(
  key: LocalStorageKeys,
  value: T
): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save item to localStorage", error);
  }
};
