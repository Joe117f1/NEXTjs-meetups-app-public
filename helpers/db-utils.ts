import { MongoClient, Collection } from 'mongodb';
import { MeetupData } from '../type-models/models';

const connectionString = process.env.customKey!;

export const getMongoConnection = async () => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db();

  const meetupsCollection = db.collection('meetupLocations'); 
  return { client, meetupsCollection };
};

export const insertMeetup = async (collection:Collection, meetup:MeetupData) => {
  await collection.insertOne(meetup);
};