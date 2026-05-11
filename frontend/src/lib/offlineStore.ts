/**
 * Saves data to local storage for offline use.
 * @param key The storage key (e.g., 'offline_trips')
 * @param value The data to store (will be JSON stringified)
 */
export async function setOfflineData<T>(key: string, value: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (e) {
    console.warn(`Failed to save offline data for key: ${key}`, e);
  }
}

/**
 * Retrieves data from local storage.
 * @param key The storage key
 * @returns The parsed data or null if not found
 */
export async function getOfflineData<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn(`Failed to retrieve offline data for key: ${key}`, e);
    return null;
  }
}

/**
 * Removes a specific key from local storage.
 * @param key The storage key
 */
export async function removeOfflineData(key: string): Promise<void> {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`Failed to remove offline data for key: ${key}`, e);
  }
}

/**
 * Clears all SAFAR offline data.
 */
export async function clearAllOfflineData(): Promise<void> {
  try {
    localStorage.clear();
  } catch (e) {
    console.warn('Failed to clear offline data', e);
  }
}
