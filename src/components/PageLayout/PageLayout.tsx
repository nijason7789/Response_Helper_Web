import React, { ReactNode } from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

export default PageLayout;
