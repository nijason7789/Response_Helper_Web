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
    onSubmit(value);
  };

  return (
    <div className={styles.inputContainer}>
      <input type="text" value={value} onChange={handleChange} className={styles.input} />
      <button onClick={handleSubmit} className={styles.button}>Send</button>
    </div>
  );
};

export default InputField;
