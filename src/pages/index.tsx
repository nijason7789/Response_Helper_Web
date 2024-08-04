import React from 'react';
import Button from '../components/Button/Button';
import PageLayout from '../components/PageLayout/PageLayout';
import { useRouter } from 'next/router';
import { sendWakeUpRequest } from './service/apiService';

const IndexPage: React.FC = () => {
  const router = useRouter();

  const handleAwaken = async () => {
    try{
      await sendWakeUpRequest();
      router.push('/main');
    } catch (error){
      console.error(error);
    }
  };

  return (
    <PageLayout>
      <h1>Welcome to Response Helper, are you ready?</h1>
      <Button onClick={handleAwaken} label="YO, I'm ready" />
    </PageLayout>
  );
};

export default IndexPage;
