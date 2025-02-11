const API_URL = "http://localhost:8080/polls";

export const deletePollAPI = async (pollId: string) => {
    const response = await fetch(`${API_URL}/delete/${pollId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };
  