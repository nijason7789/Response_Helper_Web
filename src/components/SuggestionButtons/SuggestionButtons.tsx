import React from 'react';
import styles from './SuggestionButtons.module.css';

interface SuggestionButtonsProps {
  onSuggestionClick: () => void;
  onMouseEnter:() => void;
  onMouseLeave:() => void;
  label:string;
}

const SuggestionButtons: React.FC<SuggestionButtonsProps> = ({onSuggestionClick, onMouseEnter, onMouseLeave, label}) => (
  <div className={styles.buttonContainer}>
    <button 
      className = {styles.button}
      onClick={onSuggestionClick} 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
    {label}
    </button>
  </div>
);

export default SuggestionButtons;
