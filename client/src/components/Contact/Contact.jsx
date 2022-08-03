import React from 'react';
import { Button } from '../UI/Button';
import style from './contact.module.sass';

export default function Contact() {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <h1>Contact</h1>
        <input type='text' />
        <input type='text' />
        <input type='mail' />
        <input type='number' />
        <Button className={style.button}>Send</Button>
      </form>
    </div>
  );
}
