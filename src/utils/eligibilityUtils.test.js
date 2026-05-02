import { describe, it, expect } from 'vitest';
import { checkEligibilityStatus } from './eligibilityUtils';

describe('checkEligibilityStatus', () => {
  it('should return eligible for citizens 18 or older', () => {
    const result = checkEligibilityStatus(18, true);
    expect(result.isEligible).toBe(true);
    expect(result.nextStep).toContain('Form 6');
  });

  it('should return ineligible with wait time for citizens under 18', () => {
    const result = checkEligibilityStatus(16, true);
    expect(result.isEligible).toBe(false);
    expect(result.nextStep).toContain('wait 2 more year(s)');
  });

  it('should return ineligible for non-citizens regardless of age', () => {
    const result = checkEligibilityStatus(25, false);
    expect(result.isEligible).toBe(false);
    expect(result.nextStep).toContain('Only Indian citizens');
  });

  it('should return eligible for centenarians (age 100)', () => {
    const result = checkEligibilityStatus(100, true);
    expect(result.isEligible).toBe(true);
  });

  it('should handle decimal ages by rounding down (age 17.9)', () => {
    const result = checkEligibilityStatus(17.9, true);
    expect(result.isEligible).toBe(false);
    expect(result.nextStep).toContain('wait 1 more year(s)');
  });
});
