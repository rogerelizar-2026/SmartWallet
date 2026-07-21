/**
 * Smart Finance - Funções Utilitárias
 * Módulo de funções auxiliares para manipulação de datas, números e utilidades gerais
 */

import { TRANSLATIONS, CURRENCIES } from './constants.js';

/**
 * Parse de data sem problemas de fuso horário
 * @param {string} dateString - Data no formato YYYY-MM-DD
 * @returns {Date} - Objeto Date configurado corretamente
 */
export function parseDate(dateString) {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    return date;
}

/**
 * Formata uma data para exibição
 * @param {Date|string} date - Data a formatar
 * @param {string} locale - Localidade (pt-BR, en-US, etc)
 * @returns {string} - Data formatada
 */
export function formatDate(date, locale = 'pt-BR') {
    const d = typeof date === 'string' ? parseDate(date) : new Date(date);
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

/**
 * Formata um valor monetário
 * @param {number} value - Valor a formatar
 * @param {string} currency - Código da moeda (BRL, USD, etc)
 * @returns {string} - Valor formatado
 */
export function formatCurrency(value, currency = 'BRL') {
    const config = CURRENCIES[currency] || CURRENCIES['BRL'];
    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: currency
    }).format(value);
}

/**
 * Parse de valor monetário de string
 * @param {string} value - Valor em formato de string (ex: "1.234,56" ou "1234.56")
 * @returns {number} - Valor numérico
 */
export function parseCurrency(value) {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    
    const str = String(value).trim();
    
    // Formato brasileiro: 1.234,56
    if (str.includes(',') && str.includes('.')) {
        return parseFloat(str.replace(/\./g, '').replace(',', '.'));
    }
    
    // Formato com vírgula como decimal: 1234,56
    if (str.includes(',')) {
        return parseFloat(str.replace(',', '.'));
    }
    
    // Formato americano: 1234.56
    return parseFloat(str) || 0;
}

/**
 * Gera um ID único
 * @returns {string} - ID único
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Clona um objeto profundamente
 * @param {Object} obj - Objeto a clonar
 * @returns {Object} - Cópia do objeto
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounce para funções
 * @param {Function} func - Função a aplicar debounce
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} - Função com debounce
 */
export function debounce(func, wait) {
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
 * Throttle para funções
 * @param {Function} func - Função a aplicar throttle
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} - Função com throttle
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Verifica se um elemento está visível na viewport
 * @param {Element} element - Elemento DOM
 * @returns {boolean} - True se estiver visível
 */
export function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Obtém parâmetros de URL
 * @param {string} param - Nome do parâmetro
 * @returns {string|null} - Valor do parâmetro ou null
 */
export function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Adiciona query params à URL atual
 * @param {Object} params - Objeto com parâmetros
 */
export function addUrlParams(params) {
    const url = new URL(window.location);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });
    window.history.pushState({}, '', url);
}

/**
 * Remove elementos duplicados de um array por uma propriedade
 * @param {Array} array - Array a filtrar
 * @param {string} key - Chave para verificar duplicidade
 * @returns {Array} - Array sem duplicatas
 */
export function uniqueBy(array, key) {
    const seen = new Set();
    return array.filter(item => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

/**
 * Agrupa array por uma propriedade
 * @param {Array} array - Array a agrupar
 * @param {string|Function} key - Chave ou função para agrupamento
 * @returns {Object} - Objeto com grupos
 */
export function groupBy(array, key) {
    return array.reduce((result, item) => {
        const groupKey = typeof key === 'function' ? key(item) : item[key];
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
}

/**
 * Soma valores de um array por uma propriedade
 * @param {Array} array - Array de objetos
 * @param {string} property - Propriedade a somar
 * @returns {number} - Soma total
 */
export function sumBy(array, property) {
    return array.reduce((sum, item) => sum + (Number(item[property]) || 0), 0);
}

/**
 * Ordena array por propriedade
 * @param {Array} array - Array a ordenar
 * @param {string} property - Propriedade para ordenação
 * @param {string} direction - 'asc' ou 'desc'
 * @returns {Array} - Array ordenado
 */
export function sortBy(array, property, direction = 'asc') {
    return [...array].sort((a, b) => {
        const aVal = a[property];
        const bVal = b[property];
        
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}

/**
 * Trunca texto com reticências
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Tamanho máximo
 * @returns {string} - Texto truncado
 */
export function truncateText(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Capitaliza primeira letra de cada palavra
 * @param {string} text - Texto a capitalizar
 * @returns {string} - Texto capitalizado
 */
export function capitalizeWords(text) {
    if (!text) return '';
    return text.replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Normaliza string para busca (remove acentos)
 * @param {string} text - Texto a normalizar
 * @returns {string} - Texto normalizado
 */
export function normalizeText(text) {
    if (!text) return '';
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * Verifica se string contém outra (case insensitive, sem acentos)
 * @param {string} text - Texto base
 * @param {string} search - Texto a buscar
 * @returns {boolean} - True se encontrar
 */
export function fuzzyMatch(text, search) {
    return normalizeText(text).includes(normalizeText(search));
}

/**
 * Calcula diferença entre duas datas em dias
 * @param {Date|string} date1 - Primeira data
 * @param {Date|string} date2 - Segunda data
 * @returns {number} - Diferença em dias
 */
export function daysBetween(date1, date2) {
    const d1 = typeof date1 === 'string' ? parseDate(date1) : new Date(date1);
    const d2 = typeof date2 === 'string' ? parseDate(date2) : new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Adiciona dias a uma data
 * @param {Date} date - Data base
 * @param {number} days - Dias a adicionar
 * @returns {Date} - Nova data
 */
export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Adiciona meses a uma data
 * @param {Date} date - Data base
 * @param {number} months - Meses a adicionar
 * @returns {Date} - Nova data
 */
export function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

/**
 * Obtém primeiro dia do mês
 * @param {Date} date - Data de referência
 * @returns {Date} - Primeiro dia do mês
 */
export function getFirstDayOfMonth(date) {
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Obtém último dia do mês
 * @param {Date} date - Data de referência
 * @returns {Date} - Último dia do mês
 */
export function getLastDayOfMonth(date) {
    const result = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    result.setHours(23, 59, 59, 999);
    return result;
}

/**
 * Verifica se duas datas estão no mesmo mês
 * @param {Date} date1 - Primeira data
 * @param {Date} date2 - Segunda data
 * @returns {boolean} - True se mesmo mês
 */
export function isSameMonth(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth();
}

/**
 * Verifica se duas datas são iguais
 * @param {Date} date1 - Primeira data
 * @param {Date} date2 - Segunda data
 * @returns {boolean} - True se iguais
 */
export function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

/**
 * Formata número com separador de milhares
 * @param {number} number - Número a formatar
 * @param {string} locale - Localidade
 * @returns {string} - Número formatado
 */
export function formatNumber(number, locale = 'pt-BR') {
    return new Intl.NumberFormat(locale).format(number);
}

/**
 * Converte array buffer para base64
 * @param {ArrayBuffer} buf - Array buffer
 * @returns {string} - Base64
 */
export function arrayBufferToBase64(buf) {
    let binary = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

/**
 * Converte base64 para array buffer
 * @param {string} b64 - Base64
 * @returns {ArrayBuffer} - Array buffer
 */
export function base64ToArrayBuffer(b64) {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

/**
 * Download seguro de arquivo compatível com todos os dispositivos
 * @param {Blob} blob - Conteúdo do arquivo
 * @param {string} suggestedName - Nome sugerido
 * @returns {Promise<string>} - Status do download
 */
export async function downloadFile(blob, suggestedName) {
    // Tenta usar File System Access API se disponível
    if (window.showSaveFilePicker) {
        try {
            const ext = suggestedName.split('.').pop().toLowerCase();
            const acceptMap = {
                json: { 'application/json': ['.json'] },
                csv: { 'text/csv': ['.csv'] },
                pdf: { 'application/pdf': ['.pdf'] },
                txt: { 'text/plain': ['.txt'] }
            };
            
            const handle = await window.showSaveFilePicker({
                suggestedName: suggestedName,
                types: [{
                    description: ext.toUpperCase() + ' File',
                    accept: acceptMap[ext] || { ['application/octet-stream']: ['.' + ext] }
                }]
            });
            
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return 'saved';
        } catch (err) {
            if (err.name === 'AbortError') return 'cancelled';
            console.warn('[SmartFinance] File System Access API falhou:', err);
        }
    }
    
    // Fallback para método tradicional
    try {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = suggestedName;
        a.style.display = 'none';
        a.setAttribute('download', suggestedName);
        document.body.appendChild(a);
        
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        a.dispatchEvent(clickEvent);
        
        setTimeout(() => {
            try {
                if (a.parentNode) a.parentNode.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (cleanupErr) {
                console.warn('[SmartFinance] Erro ao limpar URL:', cleanupErr);
            }
        }, 1000);
        
        return 'downloaded';
    } catch (fallbackErr) {
        console.error('[SmartFinance] Erro no fallback de download:', fallbackErr);
        return 'error';
    }
}

/**
 * Lê arquivo como texto
 * @param {File} file - Arquivo a ler
 * @returns {Promise<string>} - Conteúdo do arquivo
 */
export function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

/**
 * Lê arquivo como JSON
 * @param {File} file - Arquivo a ler
 * @returns {Promise<Object>} - Objeto JSON
 */
export async function readFileAsJSON(file) {
    const text = await readFileAsText(file);
    return JSON.parse(text);
}
