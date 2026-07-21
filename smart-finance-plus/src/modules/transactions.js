/**
 * TransactionManager Module - Handles transaction operations
 */
export class TransactionManager {
  constructor(app) {
    this.app = app;
  }

  /**
   * Add a new transaction
   * @param {Object} transaction - Transaction data
   */
  async add(transaction) {
    const state = this.app.stateManager.getState();
    const newTransaction = {
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      ...transaction,
    };

    state.transactions.push(newTransaction);
    this.app.stateManager.setState(state);
    
    await this.app.stateManager.save();
    this.app.eventManager.emit('transaction:added', { transaction: newTransaction });
    
    return newTransaction;
  }

  /**
   * Update existing transaction
   * @param {string} id - Transaction ID
   * @param {Object} updates - Updates to apply
   */
  async update(id, updates) {
    const state = this.app.stateManager.getState();
    const index = state.transactions.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new Error('Transaction not found');
    }

    state.transactions[index] = {
      ...state.transactions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.app.stateManager.setState(state);
    await this.app.stateManager.save();
    this.app.eventManager.emit('transaction:updated', { transaction: state.transactions[index] });
    
    return state.transactions[index];
  }

  /**
   * Delete transaction
   * @param {string} id - Transaction ID
   */
  async delete(id) {
    const state = this.app.stateManager.getState();
    const transaction = state.transactions.find(t => t.id === id);
    
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    state.transactions = state.transactions.filter(t => t.id !== id);
    this.app.stateManager.setState(state);
    await this.app.stateManager.save();
    this.app.eventManager.emit('transaction:deleted', { id, transaction });
    
    return true;
  }

  /**
   * Get transaction by ID
   * @param {string} id - Transaction ID
   */
  getById(id) {
    const state = this.app.stateManager.getState();
    return state.transactions.find(t => t.id === id);
  }

  /**
   * Get all transactions
   * @param {Object} filters - Optional filters
   */
  getAll(filters = {}) {
    const state = this.app.stateManager.getState();
    let transactions = [...state.transactions];

    if (filters.type) {
      transactions = transactions.filter(t => t.type === filters.type);
    }

    if (filters.category) {
      transactions = transactions.filter(t => t.category === filters.category);
    }

    if (filters.startDate) {
      transactions = transactions.filter(t => new Date(t.date) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      transactions = transactions.filter(t => new Date(t.date) <= new Date(filters.endDate));
    }

    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Import transactions from file
   * @param {Array} transactions - Array of transactions to import
   */
  async import(transactions) {
    const state = this.app.stateManager.getState();
    const imported = transactions.map(t => ({
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      ...t,
    }));

    state.transactions = [...state.transactions, ...imported];
    this.app.stateManager.setState(state);
    await this.app.stateManager.save();
    this.app.eventManager.emit('transactions:imported', { count: imported.length });
    
    return imported;
  }

  /**
   * Export transactions to JSON
   */
  export(filters = {}) {
    const transactions = this.getAll(filters);
    return JSON.stringify(transactions, null, 2);
  }
}
