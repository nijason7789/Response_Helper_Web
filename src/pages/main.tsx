import React from 'react';
import InputField from '../components/InputField/InputField';
import PageLayout from '../components/PageLayout/PageLayout';
import { useRouter } from 'next/router';

const MainPage: React.FC = () => {
  const router = useRouter();

  const handleInputSubmit = async (value: string) => {
    const response = await fetch('/api/processInput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });
    const data = await response.json();
    router.push({
      pathname: '/response',
      query: { original: value, translated: data.translatedText },
    });
  };

  return (
    <PageLayout>
      <h1>Please paste comment here</h1>
      <InputField onSubmit={handleInputSubmit} />
    </PageLayout>
  );
};

export default MainPage;
