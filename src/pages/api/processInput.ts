import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { input } = req.body;
  // Process input and return response
  const translatedText = `Translated: ${input}`; // Dummy translation logic
  res.status(200).json({ translatedText });
};
