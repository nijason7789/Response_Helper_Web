import React from 'react';
import styles from './LanguageAuditor.module.css';

type LanguageOption = '繁體中文' | 'English' | '日本語';

interface LanguageAuditorProps {
  selectedLanguage: LanguageOption;
  inputValue: string;
  onLanguageChange: (language: LanguageOption) => void;
  onInputChange: (value: string) => void;
}

const LanguageAuditor: React.FC <LanguageAuditorProps> = ({
  selectedLanguage,
  inputValue,
  onLanguageChange,
  onInputChange
}) => {

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(event.target.value as LanguageOption);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(event.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="language-select" className={styles.label}>Select language</label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className={styles.select}
      >
        <option value="繁體中文">繁體中文</option>
        <option value="English">English</option>
        <option value="日本語">日本語</option>
      </select>

      <label htmlFor="input-field" className={styles.label}>Input your comments</label>
      <textarea
        id="input-field"
        value={inputValue}
        onChange={handleInputChange}
        rows={3}
        className={styles.textarea}
      />
    </div>
  );
};

export default LanguageAuditor;
