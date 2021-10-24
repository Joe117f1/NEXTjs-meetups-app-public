import { useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../store/auth-context';
import useInput from '../../hooks/use-input';
import Card from './Card';
import classes from './SignInForm.module.css';

const checkInput = (value: string) => value.trim() !== '';
const checkPswd = (value: string) => value.trim().length > 2; // only 3 for demo purposes only
const checkEmail = (value: string) => value.includes('@');

const SignInForm: React.FC = () => {
  const ctx = useContext(AuthContext);
  const router = useRouter();

  const {
    value: enteredFname,
    isValid: isEnteredFnameValid,
    hasError: fnameHasError,
    changeInputHandler: changeFnameHandler,
    blurInputHandler: blurFnameHandler,
    clearInput: clearFnameInput,
  } = useInput(checkInput);

  const {
    value: enteredPassword,
    isValid: isEnteredPasswordValid,
    hasError: passwordHasError,
    changeInputHandler: passwordChangedHandler,
    blurInputHandler: blurPasswordHandler,
    clearInput: clearPasswordInput,
  } = useInput(checkPswd);

  const {
    value: enteredEmail,
    isValid: isEnteredEmailValid,
    hasError: emailHasError,
    changeInputHandler: changeEmailHandler,
    blurInputHandler: blurEmailHandler,
    clearInput: clearEmailInput,
  } = useInput(checkEmail);

  let isFormValid = false;

  if (isEnteredFnameValid && isEnteredPasswordValid && isEnteredEmailValid) {
    isFormValid = true;
  }

  const formSubmitHandler = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!isFormValid) return;
    clearFnameInput();
    clearPasswordInput();
    clearEmailInput();
    ctx.onLogin();
    loadAllMeetupsPage();
  };

  const loadAllMeetupsPage = () => {
    router.push('/all-meetup');
  };

  const fnameClass = fnameHasError
    ? `${classes.formControl} ${classes['invalid']}`
    : `${classes['formControl']}`;
  const passwordClass = passwordHasError
    ? `${classes.formControl} ${classes['invalid']}`
    : `${classes['formControl']}`;
  const emailClass = emailHasError
    ? `${classes.formControl} ${classes['invalid']}`
    : `${classes['formControl']}`;

  return (
    <div className={classes.container}>
      <Card>
        <h1>Find like minded people</h1>
        <p className={classes.line}>
          Discover new events and expand your social network
        </p>
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <div className={classes.name}>
            <div className={fnameClass}>
              <label htmlFor='name'>First Name</label>
              <input
                type='text'
                id='name'
                placeholder={'Full Name'}
                className={classes.input}
                onChange={changeFnameHandler}
                onBlur={blurFnameHandler}
                value={enteredFname}
              />
            </div>
            <div className={passwordClass}>
              <label htmlFor='password'>Password</label>
              <input
                type='text'
                id='password'
                placeholder={'At least 3 characters'}
                className={classes.input}
                onChange={passwordChangedHandler}
                onBlur={blurPasswordHandler}
                value={enteredPassword}
              />
            </div>
          </div>
          <div className={emailClass}>
            <label htmlFor='email'>E-Mail Address</label>
            <input
              type='email'
              id='email'
              placeholder={'Email'}
              className={classes.input}
              onChange={changeEmailHandler}
              onBlur={blurEmailHandler}
              value={enteredEmail}
            />
          </div>
          <div className={classes.formActions}>
            <button className={classes.btn}>Sigh in</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignInForm;
