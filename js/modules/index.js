/**
 * Smart Finance - Módulo Principal (Entry Point)
 * Exporta todos os módulos da aplicação
 */

export {
    PAYMENT_METHODS,
    DEFAULT_CATEGORIES,
    CATEGORY_KEYWORDS,
    FINANCIAL_QUOTES,
    TRANSLATIONS,
    CURRENCIES,
    VERSION,
    APP_NAME
} from './constants.js';

export {
    parseDate,
    formatDate,
    formatCurrency as formatCurrencyUtil,
    parseCurrency,
    generateId,
    deepClone,
    debounce,
    throttle,
    downloadFile,
    readFileAsText,
    readFileAsJSON,
    arrayBufferToBase64,
    base64ToArrayBuffer,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    isSameMonth,
    isSameDay,
    addDays,
    addMonths,
    daysBetween,
    sumBy,
    groupBy,
    sortBy,
    uniqueBy,
    truncateText,
    capitalizeWords,
    normalizeText,
    fuzzyMatch,
    formatNumber,
    isElementInViewport,
    getUrlParam,
    addUrlParams
} from './utils.js';

export {
    encryptBackupData,
    decryptBackupData,
    isEncrypted,
    validatePasswordStrength
} from './crypto.js';

export { SmartFinance } from './smartfinance.js';
