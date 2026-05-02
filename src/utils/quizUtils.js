/**
 * Calculates the new score for the quiz.
 * @param {number} currentScore The user's current score
 * @param {boolean} isCorrect Whether the selected option is correct
 * @param {number} pointsPerQuestion Points awarded for a correct answer
 * @returns {number} The new score
 */
export const calculateQuizScore = (currentScore, isCorrect, pointsPerQuestion = 10) => {
  if (currentScore < 0) currentScore = 0;
  if (!isCorrect) return currentScore;
  return currentScore + pointsPerQuestion;
};
