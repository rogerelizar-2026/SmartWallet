import { SmartFinance } from './core/index.js';

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  const app = new SmartFinance({
    container: '#app',
    debug: import.meta.env.DEV,
  });

  app.init();

  // Expose to window for debugging in development mode
  if (import.meta.env.DEV) {
    window.SmartFinance = app;
  }
});
