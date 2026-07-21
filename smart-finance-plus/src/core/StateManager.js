/**
 * StateManager - Handles application state persistence
 */
export class StateManager {
  constructor() {
    this.state = {
      transactions: [],
      accounts: [],
      categories: [],
      settings: {
        currency: 'BRL',
        language: 'pt-BR',
        theme: 'light',
      },
      lastSync: null,
    };
    
    this.storageKey = 'smartfinance_plus_state';
  }

  /**
   * Get current state
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Update state
   * @param {Object} updates - State updates
   */
  setState(updates) {
    this.state = {
      ...this.state,
      ...updates,
    };
  }

  /**
   * Load state from storage
   */
  async load() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
        console.log('State loaded from storage');
      }
    } catch (error) {
      console.error('Failed to load state:', error);
      // Use default state on error
    }
    return this.state;
  }

  /**
   * Save state to storage
   */
  async save() {
    try {
      this.state.lastSync = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      console.log('State saved to storage');
      return true;
    } catch (error) {
      console.error('Failed to save state:', error);
      return false;
    }
  }

  /**
   * Clear state
   */
  clear() {
    this.state = {
      transactions: [],
      accounts: [],
      categories: [],
      settings: {
        currency: 'BRL',
        language: 'pt-BR',
        theme: 'light',
      },
      lastSync: null,
    };
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Get specific state property
   */
  get(key) {
    return this.state[key];
  }

  /**
   * Set specific state property
   */
  set(key, value) {
    this.state[key] = value;
  }
}
