import { EventManager } from './EventManager.js';
import { StateManager } from './StateManager.js';
import { Renderer } from '../modules/render.js';
import { TransactionManager } from '../modules/transactions.js';
import { AccountManager } from '../modules/accounts.js';

/**
 * Main SmartFinance Application Class
 */
export class SmartFinance {
  constructor(options = {}) {
    this.options = {
      container: '#app',
      debug: false,
      ...options,
    };

    this.container = document.querySelector(this.options.container);
    if (!this.container) {
      throw new Error(`Container element "${this.options.container}" not found`);
    }

    // Initialize core managers
    this.eventManager = new EventManager();
    this.stateManager = new StateManager();
    
    // Initialize feature modules
    this.renderer = new Renderer(this);
    this.transactions = new TransactionManager(this);
    this.accounts = new AccountManager(this);

    this.initialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    if (this.initialized) {
      console.warn('SmartFinance already initialized');
      return;
    }

    try {
      // Load saved state
      await this.stateManager.load();
      
      // Render initial UI
      this.renderer.render();
      
      // Setup event listeners
      this.eventManager.setupListeners(this);
      
      this.initialized = true;
      
      if (this.options.debug) {
        console.log('SmartFinance+ initialized successfully');
      }
      
      // Emit initialization event
      this.eventManager.emit('app:initialized', { app: this });
    } catch (error) {
      console.error('Failed to initialize SmartFinance:', error);
      throw error;
    }
  }

  /**
   * Destroy the application and cleanup resources
   */
  destroy() {
    this.eventManager.removeAllListeners();
    this.container.innerHTML = '';
    this.initialized = false;
    
    if (this.options.debug) {
      console.log('SmartFinance+ destroyed');
    }
  }

  /**
   * Get current application state
   */
  getState() {
    return this.stateManager.getState();
  }

  /**
   * Save current state
   */
  async saveState() {
    return this.stateManager.save();
  }
}
