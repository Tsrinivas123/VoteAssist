/**
 * Determines eligibility status and next steps purely on frontend logic.
 * @param {number} age Voter age
 * @param {boolean} isCitizen Whether they are a citizen
 * @returns {object} { isEligible: boolean, nextStep: string }
 */
export const checkEligibilityStatus = (age, isCitizen) => {
  if (!isCitizen) {
    return {
      isEligible: false,
      nextStep: 'Only Indian citizens are eligible to vote. Wait for citizenship status if pending.'
    };
  }
  
  const floorAge = Math.floor(age);
  if (isNaN(floorAge) || floorAge < 18) {
    const effectiveAge = isNaN(floorAge) ? 0 : Math.max(0, floorAge);
    const waitTime = 18 - effectiveAge;
    return {
      isEligible: false,
      nextStep: `You must be 18 years old. Please wait ${waitTime} more year(s) to register.`
    };
  }

  return {
    isEligible: true,
    nextStep: 'You are eligible! Please fill out Form 6 to register on the Voter Service Portal.'
  };
};
