import React from 'react';
import styles from './SuggestionButtons.module.css';
import Button from '../Button/Button';

interface SuggestionButtonsProps {
  onSuggestionClick: () => void;
  label:string;
}

const SuggestionButtons: React.FC<SuggestionButtonsProps> = ({onSuggestionClick, label}) => (
  <div className={styles.buttonContainer}>
    <Button onClick={onSuggestionClick} label={label}/>
  </div>
);

export default SuggestionButtons;
