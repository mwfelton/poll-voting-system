import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import styles from "./Home.module.css";
import CreatePoll from "../components/CreatePoll/CreatePoll";
import AllPolls from "../components/AllPolls/AllPolls"; 
import { fetchPolls } from "../api/fetchPollsAPI";
import { deletePollAPI } from "../api/deletePollAPI";
import Poll from "../components/Poll/Poll";
import { FaHome } from "react-icons/fa";

const Home: React.FC = () => {
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [showAllPolls, setShowAllPolls] = useState(false);
  const [polls, setPolls] = useState<{ id: string; question: string; pollOptions: { id: string; optionText: string }[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPoll, setSelectedPoll] = useState<any>(null);

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleCreatePollClick = () => {
    setShowCreatePoll(true);
    setShowAllPolls(false);
  };

  const handleDeletePoll = async (pollId: string) => {
    try {
      const response = await deletePollAPI(pollId);
  
      if (response.ok) {
        setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== pollId));
      } else {
        console.error("Failed to delete poll");
      }
    } catch (error) {
      console.error("Error deleting poll:", error);
    }
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

  const handleHomeClick = () => {
    setSelectedPoll(null);
    setShowCreatePoll(false);
    setShowAllPolls(false);
  };

  const handleAllPollsClick = async () => {
    if (polls.length === 0) {
      await handleFetchPolls();
    }
    setShowAllPolls(true);
    setShowCreatePoll(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.title}>
        <h1>Poll Party</h1>
      </div>

      {/* Main content section */}
      <div className={styles.mainContent}>
        {showCreatePoll || selectedPoll || showAllPolls ? (
          selectedPoll ? (
            <Poll poll={selectedPoll} />
          ) : showAllPolls ? (
            <AllPolls polls={polls} onPollClick={(poll) => setSelectedPoll(poll)} onDeletePoll={handleDeletePoll} />
          ) : (
            <CreatePoll setShowCreatePoll={setShowCreatePoll} />
          )
        ) : (
          <>
            <Button className={styles.pageButtons} text="Create Poll" onClick={handleCreatePollClick} />
            <Button className={styles.pageButtons} text="All Polls" onClick={handleAllPollsClick} />
            {loading && <p>Loading polls...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </>
        )}
      </div>

      {/* Home icon at the bottom */}
      <div className={styles.homeButtonContainer}>
        <button className={styles.homeButton} onClick={handleHomeClick}>
          <FaHome />
        </button>
      </div>
    </div>
  );
};

export default Home;
