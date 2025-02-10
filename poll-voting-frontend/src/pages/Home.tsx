// src/pages/Home.tsx
import React, { useState } from "react";
import Button from "../components/Button/Button";
import styles from "./Home.module.css";
import CreatePoll from "../components/CreatePoll/CreatePoll"; 
import { fetchPolls } from "../api/fetchPollsAPI";

const Home: React.FC = () => {
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [polls, setPolls] = useState<{ id: number; question: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>🗳️ Poll App</h1>
      </div>

      {showCreatePoll ? (
        <CreatePoll setShowCreatePoll={setShowCreatePoll} />
      ) : (
        <>
          <Button text="Create Poll" onClick={() => setShowCreatePoll(true)} />
          <Button text="Current Polls" onClick={handleFetchPolls} />
          
          {loading && <p>Loading polls...</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.pollList}>
            {polls.map((poll) => (
              <Button key={poll.id} text={poll.question} onClick={() => console.log(`Poll ${poll.id} clicked`)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;



  



