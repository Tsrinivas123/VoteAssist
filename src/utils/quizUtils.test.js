import { describe, it, expect } from 'vitest';
import { calculateQuizScore } from './quizUtils';

describe('calculateQuizScore', () => {
  it('should add points when the answer is correct', () => {
    expect(calculateQuizScore(0, true)).toBe(10);
    expect(calculateQuizScore(10, true)).toBe(20);
  });

  it('should not add points when the answer is incorrect', () => {
    expect(calculateQuizScore(10, false)).toBe(10);
    expect(calculateQuizScore(0, false)).toBe(0);
  });

  it('should handle custom points per question', () => {
    expect(calculateQuizScore(0, true, 20)).toBe(20);
    expect(calculateQuizScore(10, true, 5)).toBe(15);
  });

  it('should handle negative starting scores safely (default to 0 base)', () => {
    expect(calculateQuizScore(-5, true)).toBe(10);
    expect(calculateQuizScore(-5, false)).toBe(0);
  });

  it('should handle non-numeric currentScore by defaulting to 0', () => {
    expect(calculateQuizScore("invalid", true)).toBe(10);
    expect(calculateQuizScore("invalid", false)).toBe(0);
  });

  it('should handle non-numeric pointsPerQuestion by defaulting to 10', () => {
    expect(calculateQuizScore(0, true, "invalid")).toBe(10);
  });

  it('should return the same score if isCorrect is undefined or null', () => {
    expect(calculateQuizScore(50, null)).toBe(50);
    expect(calculateQuizScore(50, undefined)).toBe(50);
  });
});
