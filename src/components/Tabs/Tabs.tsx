import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Tabs.module.css';

const Tabs: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(router.pathname);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        router.push(tab);
    };

    return (
        <div className={styles.tabContainer}>
            <div
                className={`${styles.tabItem} ${activeTab === '/main' ? styles.active : ''}`}
                onClick={() => handleTabClick('/main')}
            >
                Generator
            </div>
            <div
                className={`${styles.tabItem} ${activeTab === '/page2' ? styles.active : ''}`}
                onClick={() => handleTabClick('/page2')}
            >
                Editor 
            </div>
            <div
                className={`${styles.tabItem} ${activeTab === '/page3' ? styles.active : ''}`}
                onClick={() => handleTabClick('/page3')}
            >
                Translator
            </div>
        </div>
    );
};

export default Tabs;
