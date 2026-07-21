/**
 * Renderer Module - Handles UI rendering
 */
export class Renderer {
  constructor(app) {
    this.app = app;
    this.container = app.container;
  }

  /**
   * Render the main application UI
   */
  render() {
    this.container.innerHTML = `
      <div class="smart-finance-plus">
        <header class="sf-header">
          <h1>Smart Finance+</h1>
          <nav class="sf-nav">
            <button data-action="dashboard" class="sf-nav-btn active">Dashboard</button>
            <button data-action="transactions" class="sf-nav-btn">Transações</button>
            <button data-action="accounts" class="sf-nav-btn">Contas</button>
            <button data-action="cards" class="sf-nav-btn">Cartões</button>
            <button data-action="investments" class="sf-nav-btn">Investimentos</button>
            <button data-action="settings" class="sf-nav-btn">Configurações</button>
          </nav>
        </header>
        
        <main class="sf-main">
          <div id="sf-content" class="sf-content">
            ${this.renderDashboard()}
          </div>
        </main>
        
        <footer class="sf-footer">
          <p>Smart Finance+ v2.0.0</p>
        </footer>
      </div>
    `;

    this.attachEventListeners();
  }

  /**
   * Render dashboard view
   */
  renderDashboard() {
    const state = this.app.getState();
    const totalBalance = this.calculateTotalBalance(state);
    
    return `
      <section class="sf-dashboard">
        <div class="sf-summary-cards">
          <div class="sf-card">
            <h3>Saldo Total</h3>
            <p class="sf-amount">${this.formatCurrency(totalBalance)}</p>
          </div>
          <div class="sf-card">
            <h3>Receitas (mês)</h3>
            <p class="sf-amount sf-positive">${this.formatCurrency(this.getMonthIncome(state))}</p>
          </div>
          <div class="sf-card">
            <h3>Despesas (mês)</h3>
            <p class="sf-amount sf-negative">${this.formatCurrency(this.getMonthExpenses(state))}</p>
          </div>
        </div>
        
        <div class="sf-charts">
          <canvas id="sf-chart-expenses"></canvas>
          <canvas id="sf-chart-income"></canvas>
        </div>
        
        <div class="sf-recent-transactions">
          <h2>Transações Recentes</h2>
          <table class="sf-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              ${this.renderRecentTransactions(state.transactions)}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  /**
   * Render recent transactions rows
   */
  renderRecentTransactions(transactions) {
    const recent = transactions.slice(-5).reverse();
    if (recent.length === 0) {
      return '<tr><td colspan="4">Nenhuma transação registrada</td></tr>';
    }
    
    return recent.map(t => `
      <tr>
        <td>${this.formatDate(t.date)}</td>
        <td>${t.description}</td>
        <td>${t.category}</td>
        <td class="${t.type === 'income' ? 'sf-positive' : 'sf-negative'}">
          ${t.type === 'income' ? '+' : '-'} ${this.formatCurrency(Math.abs(t.amount))}
        </td>
      </tr>
    `).join('');
  }

  /**
   * Attach event listeners to rendered elements
   */
  attachEventListeners() {
    // Navigation buttons
    const navButtons = this.container.querySelectorAll('.sf-nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        navButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.navigateTo(e.target.dataset.action);
      });
    });
  }

  /**
   * Navigate to different sections
   */
  navigateTo(section) {
    const content = this.container.querySelector('#sf-content');
    switch(section) {
      case 'dashboard':
        content.innerHTML = this.renderDashboard();
        break;
      case 'transactions':
        content.innerHTML = this.renderTransactionsView();
        break;
      case 'accounts':
        content.innerHTML = this.renderAccountsView();
        break;
      default:
        content.innerHTML = `<h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2>`;
    }
    this.app.eventManager.emit('navigation:changed', { section });
  }

  /**
   * Render transactions view
   */
  renderTransactionsView() {
    return `<h2>Transações</h2><p>Conteúdo de transações...</p>`;
  }

  /**
   * Render accounts view
   */
  renderAccountsView() {
    return `<h2>Contas</h2><p>Conteúdo de contas...</p>`;
  }

  /**
   * Calculate total balance
   */
  calculateTotalBalance(state) {
    return state.transactions.reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);
  }

  /**
   * Get monthly income
   */
  getMonthIncome(state) {
    const now = new Date();
    return state.transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.type === 'income' && 
               date.getMonth() === now.getMonth() && 
               date.getFullYear() === now.getFullYear();
      })
      .reduce((acc, t) => acc + t.amount, 0);
  }

  /**
   * Get monthly expenses
   */
  getMonthExpenses(state) {
    const now = new Date();
    return state.transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.type === 'expense' && 
               date.getMonth() === now.getMonth() && 
               date.getFullYear() === now.getFullYear();
      })
      .reduce((acc, t) => acc + t.amount, 0);
  }

  /**
   * Format currency
   */
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  /**
   * Format date
   */
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }
}
