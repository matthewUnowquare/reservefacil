import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { useLocalStorage, LocalStorageContext } from "./hooks/useLocalStorage";
import { Routes } from "./Routes/Routes";
import theme from "./themes";

function App() {
  const [currentTheme] = useLocalStorage({ local: "theme" });
  const selectTheme = () => {
    return theme.filter((item) => item.name === currentTheme)[0].theme;
  };

  return (
    <LocalStorageContext.Provider value={{ currentTheme }}>
      <ThemeProvider theme={selectTheme}>
        <Routes />
      </ThemeProvider>
    </LocalStorageContext.Provider>
  );
}

export default App;
