class StorageServiceClass {
  private isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isStorageAvailable()) return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    if (!this.isStorageAvailable()) return null;
    
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    if (!this.isStorageAvailable()) return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  clear(): void {
    if (!this.isStorageAvailable()) return;
    
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
}

export const StorageService = new StorageServiceClass();