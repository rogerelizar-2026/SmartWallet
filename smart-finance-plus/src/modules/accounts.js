/**
 * AccountManager Module - Handles account operations
 */
export class AccountManager {
  constructor(app) {
    this.app = app;
  }

  /**
   * Add a new account
   * @param {Object} account - Account data
   */
  async add(account) {
    const state = this.app.stateManager.getState();
    const newAccount = {
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      balance: account.initialBalance || 0,
      ...account,
    };

    state.accounts.push(newAccount);
    this.app.stateManager.setState(state);
    
    await this.app.stateManager.save();
    this.app.eventManager.emit('account:added', { account: newAccount });
    
    return newAccount;
  }

  /**
   * Update existing account
   * @param {string} id - Account ID
   * @param {Object} updates - Updates to apply
   */
  async update(id, updates) {
    const state = this.app.stateManager.getState();
    const index = state.accounts.findIndex(a => a.id === id);
    
    if (index === -1) {
      throw new Error('Account not found');
    }

    state.accounts[index] = {
      ...state.accounts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.app.stateManager.setState(state);
    await this.app.stateManager.save();
    this.app.eventManager.emit('account:updated', { account: state.accounts[index] });
    
    return state.accounts[index];
  }

  /**
   * Delete account
   * @param {string} id - Account ID
   */
  async delete(id) {
    const state = this.app.stateManager.getState();
    const account = state.accounts.find(a => a.id === id);
    
    if (!account) {
      throw new Error('Account not found');
    }

    // Check if account has transactions
    const hasTransactions = state.transactions.some(t => t.accountId === id);
    if (hasTransactions) {
      throw new Error('Cannot delete account with existing transactions');
    }

    state.accounts = state.accounts.filter(a => a.id !== id);
    this.app.stateManager.setState(state);
    await this.app.stateManager.save();
    this.app.eventManager.emit('account:deleted', { id, account });
    
    return true;
  }

  /**
   * Get account by ID
   * @param {string} id - Account ID
   */
  getById(id) {
    const state = this.app.stateManager.getState();
    return state.accounts.find(a => a.id === id);
  }

  /**
   * Get all accounts
   */
  getAll() {
    const state = this.app.stateManager.getState();
    return [...state.accounts];
  }

  /**
   * Get account balance including transactions
   * @param {string} id - Account ID
   */
  getBalance(id) {
    const state = this.app.stateManager.getState();
    const account = state.accounts.find(a => a.id === id);
    
    if (!account) {
      return null;
    }

    const accountTransactions = state.transactions.filter(t => t.accountId === id);
    const transactionBalance = accountTransactions.reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);

    return account.balance + transactionBalance;
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Transfer between accounts
   * @param {string} fromId - Source account ID
   * @param {string} toId - Destination account ID
   * @param {number} amount - Amount to transfer
   * @param {string} description - Transfer description
   */
  async transfer(fromId, toId, amount, description = 'Transferência') {
    if (fromId === toId) {
      throw new Error('Cannot transfer to the same account');
    }

    const fromBalance = this.getBalance(fromId);
    if (fromBalance < amount) {
      throw new Error('Insufficient funds');
    }

    // Create expense transaction for source account
    await this.app.transactions.add({
      type: 'expense',
      accountId: fromId,
      amount,
      description: `${description} (transferência)`,
      category: 'Transferência',
      date: new Date().toISOString(),
    });

    // Create income transaction for destination account
    await this.app.transactions.add({
      type: 'income',
      accountId: toId,
      amount,
      description: `${description} (transferência)`,
      category: 'Transferência',
      date: new Date().toISOString(),
    });

    this.app.eventManager.emit('account:transfer', { fromId, toId, amount });
    
    return true;
  }
}
