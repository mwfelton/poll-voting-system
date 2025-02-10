import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import styles from "./Home.module.css";
import CreatePoll from "../components/CreatePoll/CreatePoll";
import AllPolls from "../components/AllPolls/AllPolls"; 
import { fetchPolls } from "../api/fetchPollsAPI";
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
    setShowAllPolls(false); // Hide AllPolls when CreatePoll is shown
  };

  const handleDeletePoll = async (pollId: string) => {
    const response = await fetch(`/api/polls/${pollId}`, { method: "DELETE" });

    if (response.ok) {
      setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== pollId));
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

  const handlePollClick = (poll: any) => {
    setSelectedPoll(poll); // Set the selected poll
    setShowAllPolls(false); // Hide AllPolls when a poll is selected
  };

  const handleHomeClick = () => {
    setSelectedPoll(null); // Reset to home view
    setShowCreatePoll(false);
    setShowAllPolls(false); // Hide AllPolls on home view
  };

  const handleAllPollsClick = async () => {
    // Fetch polls only when All Polls is clicked
    if (polls.length === 0) {
      await handleFetchPolls();
    }
    setShowAllPolls(true);
    setShowCreatePoll(false); // Hide CreatePoll if showing AllPolls
  };

  return (
    <div className={styles.pageContainer}>
      {/* Title at the top */}
      <div className={styles.title}>
        <h1>Poll Party</h1>
      </div>

      {/* Main content section */}
      <div className={styles.mainContent}>
        {showCreatePoll || selectedPoll || showAllPolls ? (
          // Show Poll, CreatePoll, or AllPolls component based on state
          selectedPoll ? (
            <Poll poll={selectedPoll} />
          ) : showAllPolls ? (
            // <AllPolls polls={polls} onPollClick={handlePollClick} />
            <AllPolls polls={polls} onPollClick={(poll) => console.log("Clicked:", poll)} onDeletePoll={handleDeletePoll} />
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
