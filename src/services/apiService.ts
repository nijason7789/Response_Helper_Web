import config from "@/configs/config";
import { ApiResponse } from "./type";

export const sendWakeUpRequest = async () => {
  const response = await fetch(`${config.apiDomain}/api/wakeup`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Failed to wakeup: ${response.statusText}`);
  }

  return response.json();
};
  
export const sendCommentRequest = async (commentInput: string) => {
  const response = await fetch(`${config.apiDomain}/api/openai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"originalComment":commentInput})
  });

  if (!response.ok) {
    throw new Error(`Failed to wakeup: ${response.statusText}`);
  }

  return await response.json() as ApiResponse;
};
  
export const sendMoreRequest = async (data: { originalComment: string; suggestion_1: string; suggestion_2: string; suggestion_3: string }) => {
  const response = await fetch(`${config.apiDomain}/api/moreComments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to send more request: ${response.statusText}`);
  }

  return response.json();
};

export const sendAudit = async (data: { fromLanguage: string; nativeComment: string; toLanguage: string; translatedComment: string }) => {
  const response = await fetch(`${config.apiDomain}/api/advice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to send more request: ${response.statusText}`);
  }

  return response.json();
};