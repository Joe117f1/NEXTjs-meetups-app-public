import { useRef } from 'react';
import { geoLocationHandler } from '../../helpers/function-utils';
import Card from '../ui/Card';
import { Coordinates } from '../../type-models/models';
import classes from './LocationSearch.module.css';

interface Prop {
  onLocate: (obj: Coordinates) => void;
  onSubmit: (address: string) => void;
}

const LocationSearch: React.FC<Prop> = props => {

  const addresseInputRef = useRef<HTMLInputElement>(null);
  const onLocateUSer = (ev: React.FormEvent) => {
    ev.preventDefault();
    geoLocationHandler((userLocation: Coordinates) =>
      props.onLocate(userLocation)
    );
  };

  const submitHandler = (ev: React.FormEvent) => {
    ev.preventDefault();
    const address = addresseInputRef.current!.value;
    props.onSubmit(address);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <h3>Look for meetups near you</h3>

          <h4>Get my current position</h4>
          <div className={classes.actions}>
            <button onClick={onLocateUSer}>Locate me</button>
          </div>
          <p>- or - Type any address:</p>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            id='address'
            placeholder='Where the magic happens?'
            ref={addresseInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>Search</button>
        </div>
      </form>
    </Card>
  );
};

export default LocationSearch;
