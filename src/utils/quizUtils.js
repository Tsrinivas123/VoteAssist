/**
 * Calculates the new score for the quiz.
 * @param {number} currentScore The user's current score
 * @param {boolean} isCorrect Whether the selected option is correct
 * @param {number} pointsPerQuestion Points awarded for a correct answer
 * @returns {number} The new score
 */
export const calculateQuizScore = (currentScore, isCorrect, pointsPerQuestion = 10) => {
  let score = typeof currentScore === 'number' ? currentScore : 0;
  let points = typeof pointsPerQuestion === 'number' ? pointsPerQuestion : 10;
  
  if (score < 0) score = 0;
  if (!isCorrect) return score;
  return score + points;
};
