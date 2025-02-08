// src/pages/Home.tsx
import React, { useState } from "react";
import Button from "../components/Button/Button";
import styles from "./Home.module.css";
import CreatePoll from "../components/CreatePoll/CreatePoll"; 


const Home: React.FC = () => {
  const [showCreatePoll, setShowCreatePoll] = useState(false);

  const handleCreatePollClick = () => {
    setShowCreatePoll(true); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>🗳️ Poll App</h1>
      </div>

      {/* <Button text="Create Poll" onClick={handleCreatePollClick} /> */}

      {showCreatePoll ? (
        <CreatePoll setShowCreatePoll={setShowCreatePoll} />
      ) : (
        <>
          <Button text="Create Poll" onClick={handleCreatePollClick} />
          <Button
            text="Current Polls"
            onClick={() => console.log("Current Polls clicked")}
            className={styles.buttonContainer}
          />
        </>
      )}
    </div>
  );
};

export default Home;



  



