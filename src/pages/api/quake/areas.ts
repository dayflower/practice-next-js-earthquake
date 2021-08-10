import { NextApiRequest, NextApiResponse } from 'next';
import { getAreas } from '../../../clients/server/bosai';

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const list = await getAreas();

  res.status(200).json(list);
};

export default handler;
