const { z } = require('zod');

const eligibilitySchema = z.object({
  age: z.number().min(0).max(120),
  isCitizen: z.boolean()
});

const checkEligibility = (req, res) => {
  try {
    const validatedData = eligibilitySchema.parse(req.body);
    const { age, isCitizen } = validatedData;
    
    let isEligible = false;
    let nextStep = '';
    
    if (!isCitizen) {
      isEligible = false;
      nextStep = 'Only Indian citizens are eligible to vote. Wait for citizenship status if pending.';
    } else if (age < 18) {
      isEligible = false;
      nextStep = `You must be 18 years old. Please wait ${18 - age} more year(s) to register.`;
    } else {
      isEligible = true;
      nextStep = 'You are eligible! Please fill out Form 6 to register on the Voter Service Portal.';
    }
    
    res.status(200).json({ isEligible, nextStep });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { checkEligibility };
