import { useRef } from 'react';

import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';
import { getCoordsFromAddress } from '../../helpers/function-utils';
import { MeetupData } from '../../type-models/models';
import classes from './NewMeetupForm.module.css';

interface Prop {
  isLoading: boolean;
  onAddMeetup: (obj: MeetupData) => void;
}

const NewMeetupForm: React.FC<Prop> = props => {
  
  const titleInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const enteredTitle = titleInputRef.current!.value;
    const enteredDescription = descriptionInputRef.current!.value;
    const enteredAddress = addressInputRef.current!.value;

    const coordsInString = await getCoordsFromAddress(enteredAddress);

    const meetupData = {
      title: enteredTitle,
      address: coordsInString,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  };

  return (
    <Card>
      {props.isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows={5}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
