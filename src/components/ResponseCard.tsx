import React from 'react';

interface ResponseCardProps {
  originalText: string;
  translatedText: string;
  onMoreClick: () => void;
  onBackClick: () => void;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ originalText, translatedText, onMoreClick, onBackClick }) => (
  <div>
    <p>{originalText}</p>
    <p>{translatedText}</p>
    <button onClick={onMoreClick}>More</button>
    <button onClick={onBackClick}>Back</button>
  </div>
);

export default ResponseCard;
