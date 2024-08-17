import React, {useState} from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '@/components/Button/Button';
import withTabs from '@/hoc/withTabs';
import { useRouter } from 'next/router';
import { sendCommentRequest } from '../../services/apiService';
import { ApiResponse } from '../../services/type';

const MainPage: React.FC = () => {

  const [commentInput, setcommentInput] = useState<string>('');
  const handleInputChange = (value: string) => {
    setcommentInput(value);
  };

  const router = useRouter();
  const handleInputSubmit = async () => {
    if (commentInput.trim() === '') {
      alert('Input cannot be empty');
      return;
    }
    try{
      const suggestComment = await sendCommentRequest(commentInput);
      console.log(suggestComment);
      setSessionStorage(commentInput, suggestComment);
      router.push('/generator/response')
    } catch(error) {
      console.error('Failed to send comment:', error);
    }
  };

  return (
    <div>
      <h1>Please paste comment here</h1>
      <InputField 
        value={commentInput} 
        onValueChange={handleInputChange} 
        onEnterPress={handleInputSubmit} // 使用 Enter 鍵觸發送出
      />
      <Button onClick= {handleInputSubmit} label="Send" />
    </div>
  );
};

export default withTabs(MainPage);

function setSessionStorage(commentInput: string, data: ApiResponse) {
  sessionStorage.setItem('original', commentInput);
  ['translation_0', 'translation_1', 'translation_2', 'translation_3', 'suggestion_1', 'suggestion_2', 'suggestion_3'].forEach((key) => {
    if (data[key]) {
      sessionStorage.setItem(key, data[key]);
    }
  });
}

