import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import PageLayout from '../../components/PageLayout/PageLayout';
import ResponseCard from '@/components/ResponseCard/ResponseCard';
import ActionButtons from '@/components/ActionButtons/ActionButtons';


const ResponsePage: React.FC = () => {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');

  useEffect(() => {
    const storedSuggestion = sessionStorage.getItem('suggestion') || '無建議';
    const storedTranslation = sessionStorage.getItem('translation') || '無翻譯';
    setSuggestion(storedSuggestion);
    setTranslation(storedTranslation);
  }, []);

  const handleBackClick = () => {
    router.push('/editor/main');
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(translation);
      alert(`${translation} \nis copied to clipboard`);
    } catch (error) {
      alert('Copy failed, please try again later');
      return;
    }
  };

  return (
    <PageLayout>
      <ResponseCard title="Suggestion from AI:" text={suggestion} />
      <ResponseCard title="Complete translation:" text={translation} />
      <ActionButtons onBackClick={() => handleBackClick()} onMoreClick={() => handleCopyClick()} label1 = 'Copy' label2 = 'Back' />
    </PageLayout>
  );
};

export default ResponsePage;