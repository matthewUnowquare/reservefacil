import { useState } from "react";
export const useForm = <T>(formValues: T) => {
  const [value, setValue] = useState(formValues);

  const setFormValue = (name: string, value: any) => {
    setValue((prevState: T) => {
      return { ...prevState, [name]: value };
    });
  };

  return { value, setFormValue };
};
