import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, generateId, isValidEmail, parseNumber } from '../src/utils/index.js';

describe('Utils - formatCurrency', () => {
  it('should format currency in BRL', () => {
    expect(formatCurrency(1000)).toBe('R$ 1.000,00');
    expect(formatCurrency(1000.50)).toBe('R$ 1.000,50');
    expect(formatCurrency(-500)).toBe('-R$ 500,00');
  });

  it('should format currency in USD', () => {
    expect(formatCurrency(1000, 'en-US', 'USD')).toBe('$1,000.00');
  });

  it('should handle zero value', () => {
    expect(formatCurrency(0)).toBe('R$ 0,00');
  });
});

describe('Utils - formatDate', () => {
  it('should format date in pt-BR locale', () => {
    const date = '2024-01-15';
    expect(formatDate(date)).toBe('15/01/2024');
  });

  it('should handle Date object', () => {
    const date = new Date('2024-06-20');
    expect(formatDate(date)).toContain('20/06/2024');
  });
});

describe('Utils - generateId', () => {
  it('should generate unique ID without prefix', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe('string');
  });

  it('should generate unique ID with prefix', () => {
    const id = generateId('txn');
    expect(id.startsWith('txn_')).toBe(true);
  });
});

describe('Utils - isValidEmail', () => {
  it('should validate correct emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.org')).toBe(true);
  });

  it('should reject invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('Utils - parseNumber', () => {
  it('should parse string numbers', () => {
    expect(parseNumber('100')).toBe(100);
    expect(parseNumber('100.50')).toBe(100.5);
  });

  it('should parse currency strings', () => {
    expect(parseNumber('R$ 1.000,00')).toBe(1000);
    expect(parseNumber('1.500,75')).toBe(1500.75);
  });

  it('should handle numbers', () => {
    expect(parseNumber(100)).toBe(100);
    expect(parseNumber(100.50)).toBe(100.5);
  });

  it('should return 0 for invalid input', () => {
    expect(parseNumber('')).toBe(0);
    expect(parseNumber(null)).toBe(0);
    expect(parseNumber(undefined)).toBe(0);
  });
});
