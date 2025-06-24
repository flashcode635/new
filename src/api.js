/**
 * Service for making API calls to the backend
 */

/**
 * Check if an account is a spam account
 * @param {Object} account - The account to check
 * @returns {Promise<Object>} - The response from the server
 */
export const checkSpam = async (account) => {
  try {
    const response = await fetch('/api/check-spam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking spam:', error);
    throw error;
  }
};
