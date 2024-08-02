import React from 'react';
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => (
  <button className = {styles.button} onClick={onClick}>
    {label}
  </button>
);

export default Button;
