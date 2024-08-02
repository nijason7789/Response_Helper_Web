import React from 'react';
import { useRouter } from 'next/router';
import PageLayout from '../components/PageLayout/PageLayout';
import ResponseCard from '../components/ResponseCard/ResponseCard';
import Button from '../components/Button/Button';
import ActionButtons from '@/components/ActionButtons/ActionButtons';
import SuggestionButtons from '@/components/SuggestionButtons/SuggestionButtons'

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

  const handleSugestionButtonClick = ( translation: string) => {
    console.log(`${translation} clicked`);
  }


  return (
    <PageLayout>
      <ResponseCard title="Original Comment" text={original as string || "Original comment goes here..."} />
      <ResponseCard title="Translated Comment" text={translated as string || "Translated comment goes here..."} />
      <SuggestionButtons onSuggestionClick = {() => handleSugestionButtonClick('translation')} label = "this is translation 1"/>
      <SuggestionButtons onSuggestionClick = {() => handleSugestionButtonClick('translation')} label = "this is translation 2"/>
      <SuggestionButtons onSuggestionClick = {() => handleSugestionButtonClick('translation')} label = "this is translation 3"/>
      <ActionButtons onBackClick={() => handleBackClick()} onMoreClick={() => handleMoreClick()}/>

    </PageLayout>
  );
};

export default ResponsePage;
