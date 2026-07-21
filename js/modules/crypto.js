/**
 * Smart Finance - Criptografia de Backup
 * Módulo de criptografia AES-256-GCM com PBKDF2 para backups seguros
 */

import { arrayBufferToBase64, base64ToArrayBuffer } from './utils.js';

/**
 * Deriva chave a partir de senha usando PBKDF2
 * @param {string} password - Senha do usuário
 * @param {Uint8Array} saltBytes - Salt para derivação
 * @returns {Promise<CryptoKey>} - Chave derivada
 */
async function deriveKeyFromPassword(password, saltBytes) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        'PBKDF2',
        false,
        ['deriveKey']
    );
    
    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: saltBytes,
            iterations: 250000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

/**
 * Criptografa dados de backup
 * @param {string} jsonString - Dados JSON em string
 * @param {string} password - Senha para criptografia
 * @returns {Promise<Object>} - Objeto criptografado
 */
export async function encryptBackupData(jsonString, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const key = await deriveKeyFromPassword(password, salt);
    const enc = new TextEncoder();
    
    const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        enc.encode(jsonString)
    );
    
    return {
        smartWalletEncrypted: true,
        version: 1,
        salt: arrayBufferToBase64(salt),
        iv: arrayBufferToBase64(iv),
        data: arrayBufferToBase64(ciphertext)
    };
}

/**
 * Descriptografa dados de backup
 * @param {Object} payload - Dados criptografados
 * @param {string} password - Senha para descriptografia
 * @returns {Promise<string>} - JSON descriptografado
 */
export async function decryptBackupData(payload, password) {
    const salt = new Uint8Array(base64ToArrayBuffer(payload.salt));
    const iv = new Uint8Array(base64ToArrayBuffer(payload.iv));
    
    const key = await deriveKeyFromPassword(password, salt);
    const ciphertext = base64ToArrayBuffer(payload.data);
    
    const dec = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        ciphertext
    );
    
    return new TextDecoder().decode(dec);
}

/**
 * Verifica se um objeto está criptografado
 * @param {Object} obj - Objeto a verificar
 * @returns {boolean} - True se estiver criptografado
 */
export function isEncrypted(obj) {
    return obj && obj.smartWalletEncrypted === true;
}

/**
 * Valida força da senha
 * @param {string} password - Senha a validar
 * @returns {Object} - Resultado da validação
 */
export function validatePasswordStrength(password) {
    const result = {
        valid: false,
        strength: 'weak',
        errors: []
    };
    
    if (!password || password.length < 8) {
        result.errors.push('Mínimo de 8 caracteres');
        return result;
    }
    
    let score = 0;
    
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score >= 4) {
        result.strength = 'strong';
        result.valid = true;
    } else if (score >= 2) {
        result.strength = 'medium';
        result.valid = true;
    } else {
        result.errors.push('Senha muito fraca');
    }
    
    return result;
}
