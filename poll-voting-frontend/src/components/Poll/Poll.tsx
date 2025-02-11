import React, { useState } from "react";
import styles from "./Poll.module.css";
import { createVote } from "../../api/createVoteAPI";
import { getPollResults } from "../../api/getPollResultsAPI";
import { calculateVotePercentage } from "../../utils/calculateVotePercentage";

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
  const [showResults, setShowResults] = useState<boolean>(false);
  const [votePercentages, setVotePercentages] = useState<Record<string, number>>({});

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

  const handleViewResults = async () => {
    try {
      const votes = await getPollResults(poll.id);
      const percentages = calculateVotePercentage(poll.pollOptions, votes);
      setVotePercentages(percentages);
      setShowResults(true);
    } catch (error) {
      setMessage("Failed to fetch results. Please try again.");
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
                } ${isSubmitted && option.id !== selectedOption ? styles.disabledButton : ""}
                ${showResults && votePercentages[option.id] > 0 ? styles.resultButton : ""}
                `}
                onClick={() => handleOptionClick(option.id)}
                disabled={isSubmitted}
            >
                {showResults ? `${votePercentages[option.id] || 0}%` : option.optionText}
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
        <button className={styles.viewResultsButton} onClick={handleViewResults}>
            View Results
        </button>
      )}
    </div>
  );
};

export default Poll;
