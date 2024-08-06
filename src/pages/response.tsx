import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import PageLayout from '../components/PageLayout/PageLayout';
import ResponseCard from '../components/ResponseCard/ResponseCard';
import ActionButtons from '@/components/ActionButtons/ActionButtons';
import SuggestionButtons from '@/components/SuggestionButtons/SuggestionButtons'
import { sendMoreRequest } from './service/apiService';

const ResponsePage: React.FC = () => {
  const router = useRouter();
  const [original, setOriginal] = useState('');
  let [translated, setTranslated] = useState(''); // need to be let function due to Gen-AI not always give a consistance answer.
  let [suggestion_1,setSuggestion_1] = useState('');
  let [suggestion_2,setSuggestion_2] = useState('');
  let [suggestion_3,setSuggestion_3] = useState('');
  let [translation_1, setTranslation_1] = useState('');
  let [translation_2, setTranslation_2] = useState('');
  let [translation_3, setTranslation_3] = useState('');
  const [buttonLabels, setButtonLabels] = useState({
    suggestion_1:'',
    suggestion_2:'',
    suggestion_3:'',
  })

  useEffect(()=>{
    const originalComment = sessionStorage.getItem('original') || '';
    const translatedComment = sessionStorage.getItem('translation_0') || '';
    const suggestion_1 = sessionStorage.getItem('suggestion_1') || '';
    const suggestion_2 = sessionStorage.getItem('suggestion_2') || '';
    const suggestion_3 = sessionStorage.getItem('suggestion_3') || '';
    const translation_1 = sessionStorage.getItem('translation_1') || 'Translation 1';
    const translation_2 = sessionStorage.getItem('translation_2') || 'Translation 2';
    const translation_3 = sessionStorage.getItem('translation_3') || 'Translation 3';
    setOriginal(originalComment);
    setTranslated(translatedComment);
    setSuggestion_1(suggestion_1);
    setSuggestion_2(suggestion_2);
    setSuggestion_3(suggestion_3);
    setTranslation_1(translation_1);
    setTranslation_2(translation_2);
    setTranslation_3(translation_3);
    setButtonLabels({
      suggestion_1:suggestion_1,
      suggestion_2:suggestion_2,
      suggestion_3:suggestion_3
    })
  }, []);

  const handleMoreClick = async () => {
    const requestData = {
      originalComment: original,
      suggestion_1: suggestion_1,
      suggestion_2: suggestion_2,
      suggestion_3: suggestion_3,
    };
    try {
      const response = await sendMoreRequest(requestData);
      console.log(response);

      // Update sessionStorage with the new data
      sessionStorage.setItem('original', response.translation_0);
      sessionStorage.setItem('suggestion_1', response.suggestion_1);
      sessionStorage.setItem('translation_1', response.translation_1);
      sessionStorage.setItem('suggestion_2', response.suggestion_2);
      sessionStorage.setItem('translation_2', response.translation_2);
      sessionStorage.setItem('suggestion_3', response.suggestion_3);
      sessionStorage.setItem('translation_3', response.translation_3);

      // Update state to reflect the new data
      setOriginal(response.translation_0);
      setSuggestion_1(response.suggestion_1);
      setTranslation_1(response.translation_1);
      setSuggestion_2(response.suggestion_2);
      setTranslation_2(response.translation_2);
      setSuggestion_3(response.suggestion_3);
      setTranslation_3(response.translation_3);
      setButtonLabels({
        suggestion_1: response.suggestion_1,
        suggestion_2: response.suggestion_2,
        suggestion_3: response.suggestion_3,
      });
    } catch (error) {
      console.error('Failed to send more request: ', error);
    }
  };

  const handleBackClick = () => {
    router.push('/main');
  };

  const handleSugestionButtonClick = async ( translation: string) => {
    try {
      await navigator.clipboard.writeText(translation);
      console.log(`Copied to clipboard: ${translation}`);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  }

  const handleMouseEnter = (suggestionKey:string, translation: string) => {
    setButtonLabels((prevLabels) => ({
      ...prevLabels,
      [suggestionKey]: translation,
    }));
  }

  const handleMouseLeave = (suggestionKey: string, originalLabel:string) => {
    setButtonLabels((prevLabels) => ({
      ...prevLabels,
      [suggestionKey]: originalLabel,
    }));
  }


  return (
    <PageLayout>
      <ResponseCard title={original as string} text={translated as string} />
      <SuggestionButtons 
        onSuggestionClick = {() => handleSugestionButtonClick(suggestion_1)}
        onMouseEnter={() => handleMouseEnter('suggestion_1',translation_1)}
        onMouseLeave={() => handleMouseLeave('suggestion_1',suggestion_1)}
        label = {buttonLabels.suggestion_1}
      />
      <SuggestionButtons 
        onSuggestionClick = {() => handleSugestionButtonClick(suggestion_2)}
        onMouseEnter={() => handleMouseEnter('suggestion_2',translation_2)}
        onMouseLeave={() => handleMouseLeave('suggestion_2',suggestion_2)}
        label = {buttonLabels.suggestion_2}
        />
      <SuggestionButtons
        onSuggestionClick = {() => handleSugestionButtonClick(suggestion_3)}
        onMouseEnter={() => handleMouseEnter('suggestion_3',translation_3)}
        onMouseLeave={() => handleMouseLeave('suggestion_3',suggestion_3)}
        label = {buttonLabels.suggestion_3}
        />
      <ActionButtons onBackClick={() => handleBackClick()} onMoreClick={() => handleMoreClick()}/>
    </PageLayout>
  );
};

export default ResponsePage;
