import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./CreatePoll.module.css";
import { createPoll } from "../../api/createPollsAPI";
import { FaTimes } from "react-icons/fa";

interface CreatePollProps {
  setShowCreatePoll: React.Dispatch<React.SetStateAction<boolean>>;
  handleFetchPolls: () => void;
}

const CreatePoll: React.FC<CreatePollProps> = ({ setShowCreatePoll, handleFetchPolls }) => {
  const [pollName, setPollName] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    if (options.length < 7) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const updatedOptions = options.filter((_, i) => i !== index);
      setOptions(updatedOptions);
    }
  };

  const handleSubmit = async () => {
    if (!pollName.trim() || options.some((option) => !option.trim())) {
      setError("Poll name and all options must be filled.");
      return;
    }
    setError("");

    try {
      await createPoll(pollName, options);
      setMessage("Poll created successfully!");
      handleFetchPolls();
      setPollName("");
      setOptions(["", ""]);
    } catch (error) {
      setError("Failed to create poll. Please try again.");
    }
  };

  return (
    <div className={styles.createPollContainer}>
      <h3>Create Your Poll!</h3>
      {message && <p className={styles.voteMessage}>{message}</p>}
      <div className={styles.formGroup}>
        {/* <label>Poll Name</label> */}
        <input
          type="text"
          value={pollName}
          onChange={(e) => setPollName(e.target.value)}
          className={styles.inputField}
          placeholder={`What's Your Question?`}
        />
      </div>

      <div className={styles.optionsContainer}>
        {/* <label>Poll Options</label> */}
        <h4>Your Options</h4>

        {options.map((option, index) => (
          <div key={index} className={styles.optionGroup}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className={styles.inputField}
              placeholder={`Option ${index + 1}`}
            />
            {options.length > 2 && (
              <button
                className={styles.removeOptionButton}
                onClick={() => handleRemoveOption(index)}
              >
                <FaTimes />
              </button>
            )}
          </div>
        ))}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.buttonContainer}>
        <Button
          text="Add Option"
          onClick={handleAddOption}
          className={styles.addOptionButton}
        />
        <Button
          text="Create"
          onClick={handleSubmit}
          className={styles.submitButton}
        />
      </div>
    </div>
  );
};

export default CreatePoll;
