import React from "react";
import styles from "./button.module.sass";

type Props = {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function Button({ title, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {title}
    </button>
  );
}
