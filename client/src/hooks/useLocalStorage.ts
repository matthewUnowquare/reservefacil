import React, { createContext, useContext, useState } from "react";

type props<T> = {
  local: string;
  initialValue?: T;
};

export const LocalStorageContext = createContext({});

export const useLocalStorage = <T>({ local, initialValue }: props<T>) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(local);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });

  

  const setLocalStorage = (value: T) => {
    try {
      window.localStorage.setItem(local, JSON.stringify(value));
      setValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [value, setLocalStorage];
};
