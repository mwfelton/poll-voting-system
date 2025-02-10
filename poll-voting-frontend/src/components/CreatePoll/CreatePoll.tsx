// src/components/CreatePoll/CreatePoll.tsx
import React, { useState } from "react";
import Button from "../Button/Button";  // Using the Button component
import styles from "./CreatePoll.module.css";
import { createPoll } from "../../api/createPollsAPI";

interface CreatePollProps {
    setShowCreatePoll: React.Dispatch<React.SetStateAction<boolean>>; // Function to change state in Home component
  }

const CreatePoll: React.FC<CreatePollProps> = ({ setShowCreatePoll }) => {
  const [pollName, setPollName] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]); // Initial 2 empty options
  const [error, setError] = useState<string>("");

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
      console.log("Poll successfully created!");
      setShowCreatePoll(false); 
    } catch (error) {
      setError("Failed to create poll. Please try again.");
    }
  };

return (
    <div className={styles.createPollContainer}>
        <h2>Create a Poll</h2>
        <div className={styles.formGroup}>
            <label>Poll Name</label>
            <input
                type="text"
                value={pollName}
                onChange={(e) => setPollName(e.target.value)}
                className={styles.inputField}
            />
        </div>

        <div className={styles.optionsContainer}>
        <label>Poll Options</label>
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
              <Button
                text="Remove"
                onClick={() => handleRemoveOption(index)}
                className={styles.removeOptionButton}
              />
            )}
          </div>
        ))}
      </div>

        <Button
            text="Add Option"
            onClick={handleAddOption}
            className={styles.addOptionButton}
            // disabled={options.length >= 7} 
        />

        {error && <p className={styles.errorMessage}>{error}</p>}

        <Button
            text="Create"
            onClick={handleSubmit}
            className={styles.submitButton}
        />

       <Button
            text="Back to Home"
            onClick={() => setShowCreatePoll(false)}
        />
    </div>
  );
};

export default CreatePoll;
