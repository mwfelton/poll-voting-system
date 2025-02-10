import React from "react";
import styles from "./Poll.module.css";

interface PollProps {
  poll: {
    question: string;
    pollOptions: {
      id: string;
      optionText: string;
    }[];
  };
}

const Poll: React.FC<PollProps> = ({ poll }) => {
  const handleOptionClick = (optionId: string) => {
    console.log(`User selected option with ID: ${optionId}`);
    // You can add logic here to submit the vote, update the UI, etc.
  };

  return (
    <div className={styles.poll}>
      <h2>{poll.question}</h2>
      <div className={styles.options}>
        {poll.pollOptions.map((option) => (
          <button
            key={option.id}
            className={styles.optionButton}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.optionText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Poll;
