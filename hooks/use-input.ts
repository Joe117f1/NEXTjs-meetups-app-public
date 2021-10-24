import { useState } from 'react';

type validator = (value: string) => boolean;

const useInput = (validateFunc: validator) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [isInputTouched, setIsInputTouched] = useState<boolean>(false);
  const isEnteredvalueValid = validateFunc(enteredValue);
  const hasError = !isEnteredvalueValid && isInputTouched;

  const changeInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(ev.target.value);
  };

  const blurInputHandler = (ev: React.FormEvent) => {
    setIsInputTouched(true);
  };

  const clearInput = () => {
    setEnteredValue('');
    setIsInputTouched(false);
  };

  return {
    value: enteredValue,
    isValid: isEnteredvalueValid,
    hasError,
    changeInputHandler,
    blurInputHandler,
    clearInput
  };
};

export default useInput;