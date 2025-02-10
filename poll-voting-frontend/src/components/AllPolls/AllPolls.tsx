import React from "react";
import styles from "./AllPolls.module.css";

type Poll = {
  id: string;
  question: string;
};

type AllPollsProps = {
  polls: Poll[];
  onPollClick: (poll: Poll) => void;
  onDeletePoll: (pollId: string) => void; // Added delete function prop
};

const AllPolls: React.FC<AllPollsProps> = ({ polls, onPollClick, onDeletePoll }) => {
  return (
    <div className={styles.container}>
        <div className={styles.pollList}>
            {polls.length > 0 ? (
            polls.map((poll) => (
                <div key={poll.id} className={styles.pollItem}>
                <button className={styles.pollButton} onClick={() => onPollClick(poll)}>
                    {poll.question}
                </button>
                <button className={styles.deleteButton} onClick={() => onDeletePoll(poll.id)}>
                    ✖
                </button>
                </div>
            ))
            ) : (
            <p className={styles.noPolls}>No polls available.</p>
            )}
        </div>
        <button className={styles.deleteAllButton}>Delete</button>
        </div>

  );
};

export default AllPolls;
