// src/components/Button.tsx
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
