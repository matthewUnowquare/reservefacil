import React from "react";
import style from "./login.module.sass";

export function Login() {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <input type="text" />
        <input type="text" />
      </form>
    </div>
  );
}
