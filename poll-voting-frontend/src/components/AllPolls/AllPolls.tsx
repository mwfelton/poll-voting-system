import { useEffect, useState } from "react";
import styles from "./AllPolls.module.css";
import { fetchPolls } from "../../api/fetchPollsAPI";

type Poll = {
  id: string;
  question: string;
};

type AllPollsProps = {
  polls: Poll[];
  onPollClick: (poll: Poll) => void;
  onDeletePoll: (pollId: string) => void; 
};

const AllPolls: React.FC<AllPollsProps> = ({ polls, onPollClick, onDeletePoll }) => {
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pollList}>
        {polls.length > 0 ? (
          polls.map((poll) => (
            <div key={poll.id} className={`${styles.pollItem} ${deleteMode ? styles.deleteActive : ""}`}>
              <button
                className={`${styles.pollButton} ${deleteMode ? styles.deleteBorder : ""}`}
                onClick={() => onPollClick(poll)}
                >
                {poll.question}
              </button>
              {deleteMode && (
                <button className={`${styles.deleteButton} ${styles.deleteBorder}`} onClick={() => onDeletePoll(poll.id)}>
                  ✖
                </button>
              )}
            </div>
          ))
        ) : (
          <p className={styles.noPolls}>No polls available.</p>
        )}
      </div>
      <button className={styles.deleteAllButton} onClick={handleDeleteMode}>
        {deleteMode ? "Cancel Delete" : "Delete"}
      </button>
    </div>
  );
};

export default AllPolls;
