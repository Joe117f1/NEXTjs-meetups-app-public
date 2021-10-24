import { useState, useEffect } from 'react';
import { getAddressFromCoords } from '../../helpers/function-utils';
import { Coordinates } from '../../type-models/models';
import classes from './MeetupInfo.module.css';

interface Prop {
  title: string;
  description: string;
  address: Coordinates;
}

const MeetupInfo: React.FC<Prop> = props => {
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    getAddressFromCoords(props.address).then(res => {
      setAddress(res);
    });
  }, [props.address]);

  const imageId = Math.floor(Math.random() * 8 + 1);
  const imageUrl = `/assets/site-img/${imageId}.jpg`;

  return (
    <div
      className={classes.window}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <p>{address}</p>
    </div>
  );
};

export default MeetupInfo;
