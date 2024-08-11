// src/hoc/withTabs.tsx
import React from 'react';
import Tabs from '@/components/Tabs/Tabs';
import PageLayout from '@/components/PageLayout/PageLayout';

const withTabs = (Component: React.FC) => {
  const WrappedComponent = () => (
    <PageLayout>
      <Tabs />
      <div className="content">
        <Component />
      </div>
    </PageLayout>
  );

  WrappedComponent.displayName = `withTabs(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};

export default withTabs;
