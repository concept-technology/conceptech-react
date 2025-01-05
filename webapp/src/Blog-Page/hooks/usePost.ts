import axios from "axios";

/**
 * Generic Axios POST API function.
 *
 * @param {string} url - The endpoint to which the request is sent.
 * @param {Object} data - The data to be sent in the request body.
 * @param {Object} [headers={}] - Optional headers to include in the request.
 * @returns {Promise<Object>} - A promise resolving to the API response or an error.
 */
const usePost = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response.data; // Return the API response data
  } catch (error) {
    // Handle errors gracefully
    if (error.response) {
      // Server-side error
      console.error("Server Error:", error.response.data);
      return { error: error.response.data };
    } else if (error.request) {
      // No response received
      console.error("Network Error:", error.request);
      return { error: "Network error. Please try again later." };
    } else {
      // Request setup error
      console.error("Error:", error.message);
      return { error: error.message };
    }
  }
};

export default usePost;
