import React from 'react';
import Tabs from '@/components/Tabs/Tabs';
import PageLayout from '@/components/PageLayout/PageLayout';

type WithTabsProps = {}; 

const withTabs = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent: React.FC<P & WithTabsProps> = (props) => (
    <PageLayout>
      <Tabs />
      <Component {...props} />
    </PageLayout>
  );

  WrappedComponent.displayName = `withTabs(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};

export default withTabs;
