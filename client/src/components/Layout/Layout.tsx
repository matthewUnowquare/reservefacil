import React from "react";
import { Footer } from "./Footer";
import { Mainbar } from "./Mainbar";
import styles from "../Layout/Layout.module.sass";

type Props = {
  children: JSX.Element;
};

export function Layout({ children }: Props) {
  return (
    <div>
      <Mainbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
