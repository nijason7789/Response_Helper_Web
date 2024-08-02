import React from 'react';
import styles from './ResponseCard.module.css';

interface ResponseCardProps {
  title: string;
  text: string;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ title, text }) => (
  <div className={styles.card}>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.text}>{text}</p>
  </div>
);

export default ResponseCard;
