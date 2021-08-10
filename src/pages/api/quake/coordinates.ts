import { NextApiRequest, NextApiResponse } from 'next';
import { getCoordinates } from '../../../clients/server/bosai';

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const list = await getCoordinates();

  res.status(200).json(list);
};

export default handler;
