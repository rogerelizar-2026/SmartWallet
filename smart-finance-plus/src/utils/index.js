/**
 * Utils Module - Utility functions
 */

/**
 * Format currency value
 * @param {number} value - Value to format
 * @param {string} locale - Locale (default: pt-BR)
 * @param {string} currency - Currency code (default: BRL)
 */
export function formatCurrency(value, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Format date
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale (default: pt-BR)
 */
export function formatDate(date, locale = 'pt-BR') {
  return new Date(date).toLocaleDateString(locale);
}

/**
 * Format datetime
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale (default: pt-BR)
 */
export function formatDateTime(date, locale = 'pt-BR') {
  return new Date(date).toLocaleString(locale);
}

/**
 * Generate unique ID
 * @param {string} prefix - Optional prefix
 */
export function generateId(prefix = '') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get nested property from object
 * @param {Object} obj - Object to query
 * @param {string} path - Dot notation path
 */
export function getNestedProperty(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Set nested property in object
 * @param {Object} obj - Object to modify
 * @param {string} path - Dot notation path
 * @param {*} value - Value to set
 */
export function setNestedProperty(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((acc, key) => (acc[key] = acc[key] || {}), obj);
  target[lastKey] = value;
}

/**
 * Validate email
 * @param {string} email - Email to validate
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate CPF (Brazilian tax ID)
 * @param {string} cpf - CPF to validate
 */
export function isValidCPF(cpf) {
  if (!cpf) return false;
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  if (remainder >= 10) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  if (remainder >= 10) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;
  
  return true;
}

/**
 * Parse number from string (handles currency formats)
 * @param {string} str - String to parse
 */
export function parseNumber(str) {
  if (typeof str === 'number') return str;
  if (!str) return 0;
  
  // Remove currency symbols and whitespace
  const cleaned = str.replace(/[^\d,-]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string|Function} key - Key or function to group by
 */
export function groupBy(array, key) {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    (result[groupKey] = result[groupKey] || []).push(item);
    return result;
  }, {});
}

/**
 * Sort array by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - Order (asc/desc)
 */
export function sortBy(array, key, order = 'asc') {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Calculate percentage
 * @param {number} value - Value
 * @param {number} total - Total
 */
export function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
}

/**
 * Format percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Decimal places
 */
export function formatPercentage(value, decimals = 2) {
  return `${Number(value).toFixed(decimals)}%`;
}
