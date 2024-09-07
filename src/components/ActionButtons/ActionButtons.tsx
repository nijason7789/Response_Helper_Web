import React from 'react';
import styles from './ActionButtons.module.css';
import Button from '../Button/Button';

interface ActionButtonsProps {
  onMoreClick: () => void;
  onBackClick: () => void;
  label1: string;
  label2: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onMoreClick, onBackClick, label1, label2 }) => (
  <div className={styles.buttonContainer}>
    <Button onClick={onMoreClick} label={label1} />
    <Button onClick={onBackClick} label={label2} />
  </div>
);

export default ActionButtons;
