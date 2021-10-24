export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MeetupData {
  title: string;
  address: Coordinates;
  description: string;
};

export interface Meetup {
  title: string;
  address: Coordinates;
  description: string;
  id: string;
}

export interface ServerProps {
  meetups: Meetup[];
}
