import { describe, it, expect } from 'vitest';
import { validateEpicFormat, sanitizeInput } from './validators';

describe('validateEpicFormat', () => {
  it('should return true for valid EPIC format (3 letters, 7 digits)', () => {
    expect(validateEpicFormat('ABC1234567')).toBe(true);
    expect(validateEpicFormat('XYZ9876543')).toBe(true);
  });

  it('should return false for EPIC with lowercase letters', () => {
    expect(validateEpicFormat('abc1234567')).toBe(false);
    expect(validateEpicFormat('Abc1234567')).toBe(false);
  });

  it('should return false for EPIC with incorrect lengths', () => {
    expect(validateEpicFormat('AB1234567')).toBe(false); // 2 letters
    expect(validateEpicFormat('ABCD1234567')).toBe(false); // 4 letters
    expect(validateEpicFormat('ABC123456')).toBe(false); // 6 digits
    expect(validateEpicFormat('ABC12345678')).toBe(false); // 8 digits
  });

  it('should return false for empty or null input', () => {
    expect(validateEpicFormat('')).toBe(false);
    expect(validateEpicFormat(null)).toBe(false);
    expect(validateEpicFormat(undefined)).toBe(false);
  });

  it('should return false for invalid characters', () => {
    expect(validateEpicFormat('ABC123456A')).toBe(false);
    expect(validateEpicFormat('1231234567')).toBe(false);
    expect(validateEpicFormat('AB-1234567')).toBe(false);
  });
});

describe('sanitizeInput', () => {
  it('should strip HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('alert("xss")Hello');
    expect(sanitizeInput('<div>Test</div>')).toBe('Test');
  });

  it('should trim whitespace', () => {
    expect(sanitizeInput('  clean me  ')).toBe('clean me');
  });

  it('should return empty string for non-string inputs', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(123)).toBe('');
  });
});
