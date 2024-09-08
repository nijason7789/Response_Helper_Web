import React, {useState} from 'react';
import withTabs from '@/hoc/withTabs';
import { useRouter } from 'next/router';
import { sendAudit } from '../../services/apiService';
import { AuditResponse } from '../../services/type';
import LanguageAuditor from '@/components/LanguageAuditor/LanguageAuditor';
import Button from '@/components/Button/Button';

const MainPage: React.FC = () => {
  const [fromLanguage, setfromLanguage] = useState<'繁體中文' | 'English' | '日本語'>('繁體中文');
  const [fromComment, setfromComment] = useState<string>('');
  const [toLanguage, settoLanguage] = useState<'繁體中文' | 'English' | '日本語'>('English');
  const [toComment, settoComment] = useState<string>('');

  const router = useRouter();
  const handleSubmit = async () => {
    if (fromComment.trim() === '' || toComment.trim() === '') {
      alert('Input cannot be empty');
      return;
    }
    const payload = {
      fromLanguage: fromLanguage,
      nativeComment: fromComment,
      toLanguage: toLanguage,
      translatedComment: toComment
    }
    try{
      const auditedComment = await sendAudit(payload);
      console.log(auditedComment);
      await setSessionStorage(auditedComment)
      router.push('/editor/response')
    } catch(error) {
      console.error('Failed to send comment:', error);
    }
  };

  return (
    <div>
      <h3> Your native Language and reply comment</h3>
      <LanguageAuditor
        selectedLanguage={fromLanguage}
        inputValue={fromComment}
        onLanguageChange={setfromLanguage}
        onInputChange={setfromComment}
      />
      <h3> Your final Language and reply comment</h3>
      <LanguageAuditor
        selectedLanguage={toLanguage}
        inputValue={toComment}
        onLanguageChange={settoLanguage}
        onInputChange={settoComment}
      />
      <Button onClick = {handleSubmit} label='Send'/>
    </div>
  );
};

export default withTabs(MainPage);

function setSessionStorage(data:AuditResponse) {
  sessionStorage.setItem('suggestion', data.suggestion);
  sessionStorage.setItem('translation', data.translation);
}