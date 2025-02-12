const API_URL = "http://localhost:8080/polls";

export const fetchPolls = async () => {
    try {
      const response = await fetch(`${API_URL}/allPolls`);
  
      if (!response.ok) {
        throw new Error("Failed to fetch polls");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching polls:", error);
      throw error;
    }
  };
  