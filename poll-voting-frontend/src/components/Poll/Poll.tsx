import React, { useState } from "react";
import styles from "./Poll.module.css";
import { createVote } from "../../api/createVoteAPI";

interface PollProps {
  poll: {
    id: string;
    question: string;
    pollOptions: {
      id: string;
      optionText: string;
      voteCount: number;
    }[];
  };
}

const Poll: React.FC<PollProps> = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleOptionClick = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOption(optionId);
    }
  };

  const handleVoteSubmit = async () => {
    if (!selectedOption) {
      setMessage("Please select an option before submitting.");
      return;
    }

    try {
      await createVote(poll.id, selectedOption);
      setIsSubmitted(true);
      setMessage("Vote submitted successfully!");
    } catch (error) {
      setMessage("Failed to submit vote. Please try again.");
    }
  };

  return (
    <div className={styles.pollContainer}>
      <h3 className={styles.pollQuestion}>{poll.question}</h3>
      {message && <p className={styles.voteMessage}>{message}</p>}
      
      <div className={styles.optionsContainer}>
        {poll.pollOptions.map((option) => (
          <button
            key={option.id}
            className={`${styles.optionButton} ${
              selectedOption === option.id ? styles.selectedButton : ""
            } ${isSubmitted && option.id !== selectedOption ? styles.disabledButton : ""}`}
            onClick={() => handleOptionClick(option.id)}
            disabled={isSubmitted}
          >
            {option.optionText}
          </button>
        ))}
      </div>

      {!isSubmitted && (
        <button
          className={styles.submitButton}
          onClick={handleVoteSubmit}
          disabled={isSubmitted}
        >
          Submit Vote
        </button>
      )}
      {isSubmitted && (
        <button
          className={styles.viewResultsButton}
          onClick={() => console.log("View results functionality to be added")}
        >
          View Results
        </button>
      )}
    </div>
  );
};

export default Poll;
