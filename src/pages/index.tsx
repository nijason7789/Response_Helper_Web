import React from 'react';
import Button from '../components/Button';
import PageLayout from '../components/PageLayout';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const router = useRouter();

  const handleAwaken = async () => {
    await fetch('/api/awaken');
    router.push('/main');
  };

  return (
    <PageLayout>
      <h1>Welcome to Response Helper, are you ready?</h1>
      <Button onClick={handleAwaken} label="YO, I'm ready" />
    </PageLayout>
  );
};

export default IndexPage;
