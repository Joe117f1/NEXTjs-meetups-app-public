import { useState, Fragment } from 'react';

import Head from 'next/head';
import { GetStaticProps } from 'next';
import MapComponent from '../../components/google-map/MapComponent';
import Container from '../../components/google-map/Container';
import { getMongoConnection } from '../../helpers/db-utils';
import { getCoordsFromAddress } from '../../helpers/function-utils';
import LocationSearch from '../../components/google-map/LocationSearch';
import { ServerProps, Coordinates } from '../../type-models/models';

const HomePage: React.FC<ServerProps> = props => {
  const [markerPosition, setMarkerPosition] = useState<Coordinates>();

  const locateUserHandler = (coords: Coordinates) => {
    setMarkerPosition(coords);
  };

  const searchLocationHandler = async (address: string) => {
    const coords = await getCoordsFromAddress(address);
    setMarkerPosition(coords);
  };

  return (
    <Fragment>
      <Head>
        <title>Yoav&#39;s Meetapp</title>
        <meta
          name='description'
          content='Browse for meetups happening near you or create new meetup'
        />
      </Head>
      <Container>
        <MapComponent meetups={props.meetups} newMapCenter={markerPosition} />
      </Container>
      <LocationSearch
        onSubmit={searchLocationHandler}
        onLocate={locateUserHandler}
      />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { client, meetupsCollection } = await getMongoConnection();
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
      props: {
        meetups: meetups.map(meetup => ({
          title: meetup.title,
          address: meetup.address,
          description: meetup.description,
          id: meetup._id.toString(),
        })),
      },
      revalidate: 10,
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default HomePage;
