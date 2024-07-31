import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Awaken logic here
  res.status(200).json({ message: 'Awakened' });
};
