// src/pages/Home.tsx
import React from "react";
import Button from "../components/Button/Button";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>🗳️ Poll App</h1>
      </div>

      <Button text="Create Poll" onClick={() => console.log("Create Poll clicked")} />
      <Button text="Current Polls" onClick={() => console.log("Current Polls clicked")} className={styles.buttonContainer} />
    </div>
  );
};

export default Home;
