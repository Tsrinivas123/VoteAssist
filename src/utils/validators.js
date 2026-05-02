/**
 * Validates the format of an Indian Voter ID (EPIC) number.
 * Format: 3 uppercase letters followed by 7 digits.
 * @param {string} epic 
 * @returns {boolean}
 */
export const validateEpicFormat = (epic) => {
  if (!epic) return false;
  const regex = /^[A-Z]{3}[0-9]{7}$/;
  return regex.test(epic);
};

/**
 * Strips HTML tags and leading/trailing whitespace from input strings.
 * @param {string} input 
 * @returns {string}
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/<[^>]*>?/gm, '').trim();
};
