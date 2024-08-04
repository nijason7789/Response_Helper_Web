import config from "@/configs/config";

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

  return response;
};
  