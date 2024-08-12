import React, { useState } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  onSubmit: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value.trim() === '') {
      alert('Input cannot be empty');
      return;
    }
    onSubmit(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input type="text" 
        value={value} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown} 
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>Send</button>
    </div>
  );
};

export default InputField;
