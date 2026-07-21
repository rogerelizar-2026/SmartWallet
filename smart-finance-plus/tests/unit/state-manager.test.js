import { describe, it, expect, beforeEach } from 'vitest';
import { StateManager } from '../src/core/StateManager.js';

describe('StateManager', () => {
  let stateManager;

  beforeEach(() => {
    stateManager = new StateManager();
    localStorage.clear();
  });

  describe('getState', () => {
    it('should return initial state', () => {
      const state = stateManager.getState();
      
      expect(state).toHaveProperty('transactions');
      expect(state).toHaveProperty('accounts');
      expect(state).toHaveProperty('categories');
      expect(state).toHaveProperty('settings');
      expect(Array.isArray(state.transactions)).toBe(true);
      expect(Array.isArray(state.accounts)).toBe(true);
    });

    it('should return a copy of state', () => {
      const state1 = stateManager.getState();
      const state2 = stateManager.getState();
      
      expect(state1).toEqual(state2);
      expect(state1).not.toBe(state2);
    });
  });

  describe('setState', () => {
    it('should update state with new values', () => {
      const updates = {
        transactions: [{ id: '1', description: 'Test' }],
        settings: { currency: 'USD' },
      };
      
      stateManager.setState(updates);
      const state = stateManager.getState();
      
      expect(state.transactions).toHaveLength(1);
      expect(state.settings.currency).toBe('USD');
    });

    it('should merge updates with existing state', () => {
      stateManager.setState({ transactions: [{ id: '1' }] });
      stateManager.setState({ accounts: [{ id: '1' }] });
      
      const state = stateManager.getState();
      expect(state.transactions).toHaveLength(1);
      expect(state.accounts).toHaveLength(1);
    });
  });

  describe('load and save', () => {
    it('should save state to localStorage', async () => {
      stateManager.setState({ transactions: [{ id: '1', description: 'Test' }] });
      await stateManager.save();
      
      const saved = localStorage.getItem('smartfinance_plus_state');
      expect(saved).toBeTruthy();
      
      const parsed = JSON.parse(saved);
      expect(parsed.transactions).toHaveLength(1);
    });

    it('should load state from localStorage', async () => {
      const testData = {
        transactions: [{ id: '1', description: 'Loaded' }],
        accounts: [{ id: 'acc1', name: 'Test Account' }],
      };
      
      localStorage.setItem('smartfinance_plus_state', JSON.stringify(testData));
      await stateManager.load();
      
      const state = stateManager.getState();
      expect(state.transactions).toHaveLength(1);
      expect(state.accounts).toHaveLength(1);
      expect(state.transactions[0].description).toBe('Loaded');
    });

    it('should use default state if localStorage is empty', async () => {
      await stateManager.load();
      const state = stateManager.getState();
      
      expect(state.transactions).toHaveLength(0);
      expect(state.accounts).toHaveLength(0);
    });
  });

  describe('get and set', () => {
    it('should get specific property', () => {
      stateManager.setState({ transactions: [{ id: '1' }] });
      const transactions = stateManager.get('transactions');
      
      expect(transactions).toHaveLength(1);
    });

    it('should set specific property', () => {
      stateManager.set('accounts', [{ id: '1', name: 'Test' }]);
      const accounts = stateManager.get('accounts');
      
      expect(accounts).toHaveLength(1);
      expect(accounts[0].name).toBe('Test');
    });
  });

  describe('clear', () => {
    it('should reset state to defaults', () => {
      stateManager.setState({
        transactions: [{ id: '1' }],
        accounts: [{ id: '1' }],
      });
      
      stateManager.clear();
      const state = stateManager.getState();
      
      expect(state.transactions).toHaveLength(0);
      expect(state.accounts).toHaveLength(0);
      expect(localStorage.getItem('smartfinance_plus_state')).toBeNull();
    });
  });
});
