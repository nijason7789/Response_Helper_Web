import React from 'react';
import { useRouter } from 'next/router';
import ResponseCard from '../components/ResponseCard';
import PageLayout from '../components/PageLayout';

const ResponsePage: React.FC = () => {
  const router = useRouter();
  const { original, translated } = router.query;

  const handleMoreClick = async () => {
    await fetch('/api/more');
    // Handle more logic
  };

  const handleBackClick = () => {
    router.push('/main');
  };

  return (
    <PageLayout>
      <ResponseCard
        originalText={original as string}
        translatedText={translated as string}
        onMoreClick={handleMoreClick}
        onBackClick={handleBackClick}
      />
    </PageLayout>
  );
};

export default ResponsePage;
