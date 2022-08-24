import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useForm } from "../../hooks/useForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import style from "./about.module.sass";

enum themes {
  MAIN = "main",
  SECONDARY = "secondary",
}

type valueProps = {
  theme: themes;
};

export default function About() {
  const [currentTheme, setTheme] = useLocalStorage<themes>({
    local: "theme",
    initialValue: themes.MAIN,
  });
  const { setFormValue, value } = useForm<valueProps>({
    theme: currentTheme,
  });

  const { theme } = value;

  const handleChange = (event: SelectChangeEvent<themes>) => {
    setFormValue(event.target.name, event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTheme(theme);
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select theme</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={theme}
            name="theme"
            label="Select theme"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value={themes.MAIN}> {themes.MAIN} </MenuItem>
            <MenuItem value={themes.SECONDARY}> {themes.SECONDARY} </MenuItem>
          </Select>
          <Button type="submit"> Log value </Button>
        </FormControl>
      </form>
    </div>
  );
}
