const API_URL = "http://localhost:8080/polls";

export const createPoll = async (question: string, options: string[]) => {
  try {
    const response = await fetch(`${API_URL}/createPoll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        options: options.map((text) => ({ text })), // Format options correctly
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create poll");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating poll:", error);
    throw error;
  }
};
