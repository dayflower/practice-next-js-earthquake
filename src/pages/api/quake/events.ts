import { NextApiRequest, NextApiResponse } from 'next';
import { getQuakeList } from '../../../clients/server/bosai';

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const list = await getQuakeList();

  res.status(200).json(list);
};

export default handler;
