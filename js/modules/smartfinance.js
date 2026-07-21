/**
 * Smart Finance - Módulo Principal da Aplicação
 * Classe SmartFinance com métodos de gerenciamento financeiro
 */

import { 
    PAYMENT_METHODS, 
    DEFAULT_CATEGORIES, 
    CATEGORY_KEYWORDS, 
    FINANCIAL_QUOTES,
    TRANSLATIONS, 
    CURRENCIES,
    VERSION,
    APP_NAME
} from './constants.js';

import {
    parseDate,
    formatDate,
    formatCurrency,
    parseCurrency,
    generateId,
    deepClone,
    debounce,
    downloadFile,
    readFileAsText,
    readFileAsJSON,
    arrayBufferToBase64,
    base64ToArrayBuffer,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    isSameMonth,
    isSameDay,
    addMonths,
    sumBy,
    groupBy,
    sortBy,
    normalizeText,
    fuzzyMatch
} from './utils.js';

import {
    encryptBackupData,
    decryptBackupData,
    isEncrypted,
    validatePasswordStrength
} from './crypto.js';

export class SmartFinance {
    constructor() {
        this.currentMonth = new Date();
        this.currentMonth.setDate(1);
        this.currentMonth.setHours(0, 0, 0, 0);
        this.transactions = [];
        this.categories = [];
        this.accounts = [];
        this.cards = [];
        this.investments = [];
        this.cardModalMonth = new Date();
        this.cardModalMonth.setDate(1);
        this.currentTransactionType = 'expense';
        this.currentEditType = 'expense';
        this.currentEditId = null;
        this.darkMode = true;
        this.privacyOn = false;
        this.charts = {};
        this.searchTimeout = null;
        this.toastT = null;
        this._cache = {};
        this.currentInvoiceCardId = null;
        this.currentInvoiceOffset = 0;
        this.sortColumn = 'date';
        this.sortDirection = 'desc';
        this.swipeInitialized = false;
        this.isSaving = false;
        this.currentPage = 1;
        this.pageSize = 20;
        this.demoMode = false;
        this.settings = {
            alertNegativeBalance: true,
            blockNegativeBalance: false,
            autoBackupEnabled: false,
            notifyBills: false,
            pageSize: 20
        };
        
        // Exporta constantes para uso global quando necessário
        window.PAYMENT_METHODS = PAYMENT_METHODS;
        window.DEFAULT_CATEGORIES = DEFAULT_CATEGORIES;
        window.CATEGORY_KEYWORDS = CATEGORY_KEYWORDS;
        window.FINANCIAL_QUOTES = FINANCIAL_QUOTES;
        window.TRANSLATIONS = TRANSLATIONS;
        window.CURRENCIES = CURRENCIES;
        
        this.loadData();
        this.loadSettings();
        this.init();
    }

    /**
     * Carrega dados do localStorage
     */
    loadData() {
        try {
            const t = localStorage.getItem('smartfinance_transactions');
            if (t) this.transactions = JSON.parse(t);
            
            const c = localStorage.getItem('smartfinance_categories');
            if (c) {
                this.categories = JSON.parse(c);
            } else {
                this.categories = deepClone(DEFAULT_CATEGORIES);
            }
            
            const a = localStorage.getItem('smartfinance_accounts');
            if (a) this.accounts = JSON.parse(a);
            
            const cd = localStorage.getItem('smartfinance_cards');
            if (cd) this.cards = JSON.parse(cd);
            
            const inv = localStorage.getItem('smartfinance_investments');
            if (inv) this.investments = JSON.parse(inv);
            
            const dm = localStorage.getItem('smartfinance_dark');
            if (dm !== null) this.darkMode = dm === 'true';
            
            const pv = localStorage.getItem('smartfinance_privacy');
            if (pv !== null) this.privacyOn = pv === 'true';
            
            const demo = localStorage.getItem('smartfinance_demo');
            if (demo !== null) this.demoMode = demo === 'true';
        } catch (e) {
            console.error('[SmartFinance] Erro ao carregar:', e);
        }
    }

    /**
     * Salva transações no localStorage
     */
    saveTransactions() {
        try {
            localStorage.setItem('smartfinance_transactions', JSON.stringify(this.transactions));
        } catch(e) {}
    }

    /**
     * Salva categorias no localStorage
     */
    saveCategories() {
        try {
            localStorage.setItem('smartfinance_categories', JSON.stringify(this.categories));
        } catch(e) {}
    }

    /**
     * Salva contas no localStorage
     */
    saveAccounts() {
        try {
            localStorage.setItem('smartfinance_accounts', JSON.stringify(this.accounts));
        } catch(e) {}
    }

    /**
     * Salva cartões no localStorage
     */
    saveCards() {
        try {
            localStorage.setItem('smartfinance_cards', JSON.stringify(this.cards));
        } catch(e) {}
    }

    /**
     * Salva investimentos no localStorage
     */
    saveInvestments() {
        try {
            localStorage.setItem('smartfinance_investments', JSON.stringify(this.investments));
        } catch(e) {}
    }

    /**
     * Limpa cache
     */
    clearCache() {
        this._cache = {};
    }

    /**
     * Carrega configurações do localStorage
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('smartfinance_settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
                this.pageSize = this.settings.pageSize || 20;
            }
        } catch (e) {}
    }

    /**
     * Salva configurações no localStorage
     */
    saveSettings() {
        try {
            localStorage.setItem('smartfinance_settings', JSON.stringify(this.settings));
        } catch (e) {}
    }

    /**
     * Obtém meses traduzidos
     * @param {string} type - 'full' ou 'short'
     * @returns {Array} - Array de meses
     */
    getMonths(type = 'full') {
        const lang = this.getLanguage();
        const translations = TRANSLATIONS[lang] || TRANSLATIONS['pt-BR'];
        return type === 'short' ? translations.monthsShort : translations.months;
    }

    /**
     * Valida campos de formulário
     * @param {Array} fields - Campos a validar
     * @returns {boolean} - True se válido
     */
    validateForm(fields) {
        for (const field of fields) {
            const element = document.getElementById(field.id);
            if (!element) continue;
            
            const value = element.value?.trim();
            
            if (field.required && !value) {
                this.showToast('❌ ' + field.label);
                element.focus();
                return false;
            }
            
            if (field.type === 'number' && value) {
                const num = parseCurrency(value);
                if (isNaN(num)) {
                    this.showToast('❌ ' + field.label + ' inválido');
                    element.focus();
                    return false;
                }
                if (field.min !== undefined && num < field.min) {
                    this.showToast('❌ ' + field.label + ' muito baixo');
                    element.focus();
                    return false;
                }
                if (field.max !== undefined && num > field.max) {
                    this.showToast('❌ ' + field.label + ' muito alto');
                    element.focus();
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Tradução de textos
     * @param {string} key - Chave da tradução
     * @param {Object} params - Parâmetros para substituição
     * @returns {string} - Texto traduzido
     */
    t(key, params = {}) {
        const lang = this.getLanguage();
        let text = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || 
                   TRANSLATIONS['pt-BR'][key] || key;
        
        if (typeof text !== 'string') return key;
        
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp('\\{' + param + '\\}', 'g'), params[param]);
        });
        
        return text;
    }

    /**
     * Tradução com pluralização
     * @param {string} keyBase - Chave base
     * @param {number} count - Contagem para plural
     * @returns {string} - Texto traduzido
     */
    tCount(keyBase, count) {
        const suffix = count === 1 ? '_singular' : '_plural';
        return this.t(keyBase + suffix);
    }

    /**
     * Obtém idioma atual
     * @returns {string} - Código do idioma
     */
    getLanguage() {
        return localStorage.getItem('smartfinance_language') || 'pt-BR';
    }

    /**
     * Define idioma
     * @param {string} lang - Código do idioma
     */
    setLanguage(lang) {
        localStorage.setItem('smartfinance_language', lang);
        document.documentElement.lang = lang;
        this.applyLanguage();
        this.showToast(this.t('languageChanged'));
    }

    /**
     * Aplica idioma na interface
     */
    applyLanguage() {
        const titleEl = document.querySelector('.header-title');
        if (titleEl) titleEl.textContent = this.t('appTitle');
        
        const subtitleEl = document.querySelector('.header-subtitle');
        if (subtitleEl) subtitleEl.textContent = this.t('appSubtitle');
        
        this.updateMonthDisplay();
        this.populateCardFilter();
        this.clearCache();
        this.render();
        this.updateCharts();
    }

    /**
     * Obtém moeda atual
     * @returns {string} - Código da moeda
     */
    getCurrency() {
        return localStorage.getItem('smartfinance_currency') || 'BRL';
    }

    /**
     * Define moeda
     * @param {string} currency - Código da moeda
     */
    setCurrency(currency) {
        if (!CURRENCIES[currency]) return;
        localStorage.setItem('smartfinance_currency', currency);
        this.applyCurrency();
        this.showToast(this.t('currencyChanged'));
    }

    /**
     * Aplica moeda na interface
     */
    applyCurrency() {
        this.clearCache();
        this.render();
        this.updateCharts();
        this.updateCurrencySelectorVisibility();
    }

    /**
     * Atualiza visibilidade do seletor de moeda
     */
    updateCurrencySelectorVisibility() {
        const lang = this.getLanguage();
        const currencyItem = document.getElementById('currencyMenuItem');
        if (currencyItem) {
            currencyItem.style.display = lang === 'en-US' ? 'flex' : 'none';
        }
    }

    /**
     * Formata valor monetário
     * @param {number} value - Valor a formatar
     * @returns {string} - Valor formatado
     */
    formatCurrency(value) {
        const currency = this.getCurrency();
        const data = CURRENCIES[currency];
        return new Intl.NumberFormat(data.locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            notation: 'standard'
        }).format(value || 0);
    }

    /**
     * Inicializa aplicação
     */
    init() {
        console.log(`✅ ${APP_NAME} v${VERSION} inicializado`);
        this.applyTheme();
        this.applyPrivacy();
        this.applyDemoBadge();
        this.setupEventListeners();
        this.setupFocusTrap();
        this.setDefaultDate();
        this.updateMonthDisplay();
        this.populateCategorySelects();
        this.populatePaymentMethodSelects();
        this.populateAccountSelects();
        this.populateCardFilter();
        this.restoreFilters();
        this.render();
        this.initCharts();
        this.updateAlertBadge();
        this.applyLanguage();
        this.applyCurrency();
        this.checkVersionUpdate();
        this.checkAutoBackup();
        this.checkNegativeBalance();
        
        if (window.innerWidth <= 640 && !this.swipeInitialized) {
            this.initSwipeGestures();
            this.swipeInitialized = true;
        }
    }

    // =========================================================================
    // Métodos adicionais serão implementados nos próximos módulos
    // =========================================================================
}

// Exporta instância global quando carregado como módulo
if (typeof window !== 'undefined') {
    window.SmartFinanceClass = SmartFinance;
}
