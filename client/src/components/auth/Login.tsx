import React, { useState } from "react";
import style from "./login.module.sass";

export function Login() {
  const [error, setError] = useState<
    string | { message: string; code: number }
  >();

  setError({ message: "Error", code: 1 });

  return (
    <div className={style.container}>
      <form className={style.form}>
        <input type="text" />
        <input type="text" />
      </form>
    </div>
  );
}
