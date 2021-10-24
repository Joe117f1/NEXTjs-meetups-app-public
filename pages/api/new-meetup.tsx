import type { NextApiRequest, NextApiResponse } from 'next';
import { getMongoConnection, insertMeetup } from '../../helpers/db-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method === 'POST') {
    const data = req.body;
    let client;
    let meetupsCollection;
    try {
      ({ client, meetupsCollection } = await getMongoConnection());
    } catch (error) {
      res.status(500).json({ message: 'could not connect to database.' });
      return;
    }
    try {
      await insertMeetup(meetupsCollection, data);
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed.' });
    }
    client.close();
    res.status(201).json({ message: 'Meetup added successfuly!' });
  }
};

export default handler;
