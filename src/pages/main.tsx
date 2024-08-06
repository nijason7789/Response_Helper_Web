import React, {useState} from 'react';
import InputField from '../components/InputField/InputField';
import PageLayout from '../components/PageLayout/PageLayout';
import { useRouter } from 'next/router';
import { sendCommentRequest } from './service/apiService';
import { ApiResponse } from './service/type';

const MainPage: React.FC = () => {
  const router = useRouter();
  const handleInputSubmit = async (commentInput: string) => {
    try{
      const suggestComment = await sendCommentRequest(commentInput);
      const data = await suggestComment.json();
      console.log(data);
      setSessionStorage(commentInput, data);
      router.push('/response')
    } catch(error) {
      console.error('Failed to send comment:', error);
    }
  };

  return (
    <PageLayout>
      <h1>Please paste comment here</h1>
      <InputField onSubmit={handleInputSubmit} />
    </PageLayout>
  );
};

export default MainPage;

function setSessionStorage (commentInput: string, data:ApiResponse) {
  sessionStorage.setItem('original', commentInput);
  sessionStorage.setItem('translation_0',data.translation_0)
  sessionStorage.setItem('translation_1', data.translation_1);
  sessionStorage.setItem('translation_2', data.translation_2);
  sessionStorage.setItem('translation_3', data.translation_3);
  sessionStorage.setItem('suggestion_1', data.suggestion_1);
  sessionStorage.setItem('suggestion_2', data.suggestion_2);
  sessionStorage.setItem('suggestion_3', data.suggestion_3);
}
