export const awaken = async () => {
    return fetch('/api/awaken');
  };
  
  export const processInput = async (input: string) => {
    return fetch('/api/processInput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });
  };
  