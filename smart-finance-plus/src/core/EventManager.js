/**
 * EventManager - Handles application events and listeners
 */
export class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  /**
   * Add event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => this.off(event, callback);
  }

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  off(event, callback) {
    if (!this.listeners.has(event)) return;
    
    const callbacks = this.listeners.get(event);
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  /**
   * Emit event
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emit(event, data = {}) {
    if (!this.listeners.has(event)) return;
    
    const callbacks = this.listeners.get(event);
    callbacks.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event listener for "${event}":`, error);
      }
    });
  }

  /**
   * Setup global event listeners
   * @param {SmartFinance} app - Application instance
   */
  setupListeners(app) {
    // Form submissions
    document.addEventListener('submit', (e) => this.handleFormSubmit(e, app));
    
    // Button clicks
    document.addEventListener('click', (e) => this.handleClick(e, app));
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboard(e, app));
    
    // Window resize
    window.addEventListener('resize', () => {
      this.emit('window:resize', { width: window.innerWidth, height: window.innerHeight });
    });
  }

  /**
   * Handle form submissions
   */
  handleFormSubmit(e, app) {
    const form = e.target.closest('form');
    if (!form) return;

    const eventType = form.dataset.event;
    if (eventType) {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      this.emit(eventType, { form, data, app });
    }
  }

  /**
   * Handle click events
   */
  handleClick(e, app) {
    const button = e.target.closest('[data-action]');
    if (button) {
      const action = button.dataset.action;
      this.emit(`action:${action}`, { button, event: e, app });
    }
  }

  /**
   * Handle keyboard events
   */
  handleKeyboard(e, app) {
    // Ctrl+S or Cmd+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      this.emit('keyboard:save', { event: e, app });
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
      this.emit('keyboard:close', { event: e, app });
    }
  }

  /**
   * Remove all listeners
   */
  removeAllListeners() {
    this.listeners.clear();
  }
}
