import React from 'react';
import styles from './ActionButtons.module.css';
import Button from '../Button/Button';

interface ActionButtonsProps {
  onMoreClick: () => void;
  onBackClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onMoreClick, onBackClick }) => (
  <div className={styles.buttonContainer}>
    <Button onClick={onMoreClick} label="More" />
    <Button onClick={onBackClick} label="Back" />
  </div>
);

export default ActionButtons;
