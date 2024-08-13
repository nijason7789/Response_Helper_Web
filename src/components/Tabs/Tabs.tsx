import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Tabs.module.css';

const Tabs: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(router.pathname);

    const tabConfig = [
        { path: '/generator/main', label: 'Generator' },
        { path: '/page2', label: 'Editor' },
        { path: '/page3', label: 'Translator' },
      ];

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        router.push(tab);
    };

    return (
        <div className={styles.tabContainer}>
          {tabConfig.map(({ path, label }) => (
            <div
              key={path}
              className={`${styles.tabItem} ${activeTab === path ? styles.active : ''}`}
              onClick={() => handleTabClick(path)}
            >
              {label}
            </div>
          ))}
        </div>
      );
};

export default Tabs;
