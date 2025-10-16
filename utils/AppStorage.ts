import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Universal key-value storage that works across iOS, Android, Web, and SSR.
 * 
 * - iOS/Android: Uses AsyncStorage
 * - Web (client): Uses localStorage
 * - Web (SSR): No-op (prevents crashes)
 */
class UniversalStorage {
  private isSSR: boolean;
  private storage: Storage | typeof AsyncStorage | null = null;

  constructor() {
    // Detect SSR environment
    this.isSSR = typeof window === 'undefined';

    if (this.isSSR) {
      // SSR mode: no-op storage
      this.storage = null;
    } else if (Platform.OS === 'web') {
      // Web client: use localStorage
      this.storage = window.localStorage;
    } else {
      // iOS/Android: use AsyncStorage
      this.storage = AsyncStorage;
    }
  }

  /**
   * Store a value
   */
  async setItem(key: string, value: string): Promise<void> {
    if (this.isSSR || !this.storage) {
      return Promise.resolve();
    }

    try {
      if (Platform.OS === 'web') {
        (this.storage as Storage).setItem(key, value);
        return Promise.resolve();
      } else {
        return await (this.storage as typeof AsyncStorage).setItem(key, value);
      }
    } catch (error) {
      console.error(`AppStorage.setItem error for key "${key}":`, error);
      throw error;
    }
  }

  /**
   * Retrieve a value
   */
  async getItem(key: string): Promise<string | null> {
    if (this.isSSR || !this.storage) {
      return Promise.resolve(null);
    }

    try {
      if (Platform.OS === 'web') {
        const value = (this.storage as Storage).getItem(key);
        return Promise.resolve(value);
      } else {
        return await (this.storage as typeof AsyncStorage).getItem(key);
      }
    } catch (error) {
      console.error(`AppStorage.getItem error for key "${key}":`, error);
      return null;
    }
  }

  /**
   * Remove a value
   */
  async removeItem(key: string): Promise<void> {
    if (this.isSSR || !this.storage) {
      return Promise.resolve();
    }

    try {
      if (Platform.OS === 'web') {
        (this.storage as Storage).removeItem(key);
        return Promise.resolve();
      } else {
        return await (this.storage as typeof AsyncStorage).removeItem(key);
      }
    } catch (error) {
      console.error(`AppStorage.removeItem error for key "${key}":`, error);
      throw error;
    }
  }

  /**
   * Clear all values
   */
  async clear(): Promise<void> {
    if (this.isSSR || !this.storage) {
      return Promise.resolve();
    }

    try {
      if (Platform.OS === 'web') {
        (this.storage as Storage).clear();
        return Promise.resolve();
      } else {
        return await (this.storage as typeof AsyncStorage).clear();
      }
    } catch (error) {
      console.error('AppStorage.clear error:', error);
      throw error;
    }
  }

  /**
   * Get all keys (useful for debugging)
   */
  async getAllKeys(): Promise<string[]> {
    if (this.isSSR || !this.storage) {
      return Promise.resolve([]);
    }

    try {
      if (Platform.OS === 'web') {
        const keys = Object.keys(this.storage as Storage);
        return Promise.resolve(keys);
      } else {
        const keys = await (this.storage as typeof AsyncStorage).getAllKeys();
        return keys.slice();
      }
    } catch (error) {
      console.error('AppStorage.getAllKeys error:', error);
      return [];
    }
  }

  /**
   * Store an object (automatically stringifies)
   */
  async setObject<T>(key: string, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    return this.setItem(key, jsonValue);
  }

  /**
   * Retrieve an object (automatically parses)
   */
  async getObject<T>(key: string): Promise<T | null> {
    const jsonValue = await this.getItem(key);
    if (jsonValue === null) {
      return null;
    }

    try {
      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`AppStorage.getObject parse error for key "${key}":`, error);
      return null;
    }
  }
}

// Export singleton instance
const AppStorage = new UniversalStorage();

export default AppStorage;