// src/pages/Home.tsx
import React, { useState } from "react";
import Button from "../components/Button/Button";
import styles from "./Home.module.css";
import CreatePoll from "../components/CreatePoll/CreatePoll"; 
import { fetchPolls } from "../api/fetchPollsAPI";
import Poll from "../components/Poll/Poll"; // Import Poll component

const Home: React.FC = () => {
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [polls, setPolls] = useState<{ id: string; question: string; pollOptions: { id: string; optionText: string }[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPoll, setSelectedPoll] = useState<any>(null); // Store selected poll

  const handleCreatePollClick = () => {
    setShowCreatePoll(true); 
  };

  const handleFetchPolls = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPolls();
      setPolls(data);
    } catch (err) {
      setError("Failed to load polls.");
    }
    setLoading(false);
  };

  const handlePollClick = (poll: any) => {
    setSelectedPoll(poll); // Set the selected poll
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>🗳️ Poll App</h1>
      </div>

      {showCreatePoll ? (
        <CreatePoll setShowCreatePoll={setShowCreatePoll} />
      ) : (
        <>
          <Button text="Create Poll" onClick={handleCreatePollClick} />
          <Button text="Current Polls" onClick={handleFetchPolls} />
          
          {loading && <p>Loading polls...</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.pollList}>
            {polls.map((poll) => (
              <Button
                key={poll.id}
                text={poll.question}
                onClick={() => handlePollClick(poll)} // Handle poll button click
              />
            ))}
          </div>

          {/* Render the Poll component if a poll is selected */}
          {selectedPoll && <Poll poll={selectedPoll} />}
        </>
      )}
    </div>
  );
};

export default Home;
