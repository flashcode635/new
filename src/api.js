/**
 * Service for checking if an Instagram account is spam based on a local rule-based system.
 */

/**
 * Calculates a spam confidence score based on a set of rules.
 * Each rule that is met increases the confidence level.
 * @param {Object} account - The account data from the form.
 * @returns {{isSpam: boolean, confidence: number}} - The prediction result.
 */
const calculateSpamConfidence = (account) => {
  const { username = '', bio = '', hasProfilePic, externalUrl } = account;
  let confidence = 0;
  const reasons = [];

  // Rule 1: No profile picture is a very strong indicator.
  if (!hasProfilePic) {
    confidence += 40;
    reasons.push('No profile picture');
  }

  // Rule 2: An empty bio is a strong indicator.
  if (!bio || bio.trim().length === 0) {
    confidence += 30;
    reasons.push('Empty bio');
  }

  // Rule 3: Usernames with many digits are often auto-generated.
  const digitCount = (username.match(/\d/g) || []).length;
  if (digitCount > 4) {
    confidence += 20;
    reasons.push('High number of digits in username');
  }

  // Rule 4: Having an external URL can be a sign of promotion/spam.
  if (externalUrl) {
    confidence += 15;
    reasons.push('Contains an external URL');
  }

  // Rule 5: Very long usernames can be a sign of auto-generation.
  if (username.length > 20) {
    confidence += 10;
    reasons.push('Username is very long');
  }

  // Cap the confidence at 100.
  const finalConfidence = Math.min(confidence, 100);

  console.log('Spam check reasons:', reasons.join(', ') || 'Looks clear');

  return {
    isSpam: finalConfidence > 50, // Consider it spam if confidence is over 50%
    confidence: finalConfidence,
  };
};

/**
 * Checks if an account is a spam account using a local rule-based system.
 * @param {Object} account - The account to check.
 * @returns {Promise<Object>} - An object containing the prediction result.
 */
export const checkSpam = async (account) => {
  try {
    console.log('Checking account with local rules:', account);
    const result = calculateSpamConfidence(account);
    return result;
  } catch (error) {
    console.error('Error checking spam locally:', error);
    return { isSpam: false, confidence: 0, error: error.message };
  }
};
