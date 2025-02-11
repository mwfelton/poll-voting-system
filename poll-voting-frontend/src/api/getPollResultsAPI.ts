const API_URL = "http://localhost:8080/votes";

export const getPollResults = async (pollId: string) => {
  try {
    const response = await fetch(`${API_URL}/results/${pollId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch poll results");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching poll results:", error);
    throw error;
  }
};
