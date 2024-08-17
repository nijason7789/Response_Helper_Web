import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  onValueChange: (value: string) => void;
  value: string;
  onEnterPress: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ onValueChange, value, onEnterPress }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterPress();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
    </div>
  );
};

export default InputField;
