import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageLayout from '../../components/PageLayout/PageLayout';
import ResponseCard from '@/components/ResponseCard/ResponseCard';
import ActionButtons from '@/components/ActionButtons/ActionButtons';


const ResponsePage: React.FC = () => {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');
  // const [textToCopy, setTextToCopy] = useState('這是第二個容器中的文字');

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
      console.log('已複製到剪貼簿:', translation);
    } catch (error) {
      console.error('複製失敗:', error);
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