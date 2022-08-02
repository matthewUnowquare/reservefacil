import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/Button";
import styles from "./mainbar.module.sass";

export function Mainbar() {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("im clicking");
    navigate("./login", { replace: true });
  };
  return (
    <nav className={styles.mainbar}>
      <div className={styles.logo}>Reservefacil.com</div>
      <ul className={styles["items-list"]}>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Language</li>
      </ul>
      <Button title="Login" onClick={handleLogin} />
    </nav>
  );
}
