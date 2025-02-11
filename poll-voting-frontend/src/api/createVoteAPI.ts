const API_URL = "http://localhost:8080/votes";

export const createVote = async (pollId: string, optionId: string) => {
  try {
    const response = await fetch(`${API_URL}/createVote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pollId,
        optionId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit vote");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting vote:", error);
    throw error;
  }
};
