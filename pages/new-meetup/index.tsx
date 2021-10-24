import { Fragment, useState, useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { MeetupData } from '../../type-models/models';

const sendDataToServer = async (meetupDetails: MeetupData) => {
  const response = await fetch('/api/new-meetup', {
    method: 'POST',
    body: JSON.stringify(meetupDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong..');
  }
};

const NewMeetupPage: React.FC = () => {
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const addMeetupHandler = async (enteredMeetupData: MeetupData) => {
    setRequestStatus('pending');
    try {
      await sendDataToServer(enteredMeetupData);
      setRequestStatus('success');
      router.push('/all-meetups');
    } catch (error: any) {
      setRequestStatus('error');
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name='description'
          content='Add your own Meetup and create amazing opportunities'
        />
      </Head>
      <NewMeetupForm
        isLoading={requestStatus === 'pending'}
        onAddMeetup={addMeetupHandler}
      />
    </Fragment>
  );
};

export default NewMeetupPage;
