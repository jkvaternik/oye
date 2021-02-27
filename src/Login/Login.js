import React from 'react';

import styles from './Login.module.css';

const Login = (props) => {
  return (
    <section className={styles.Background}>
      <div className={styles.Login}>
        <h1>oye!</h1>
        <h3>Check out the data behind your music!</h3>
        <a href={props.href}>
          Log In
        </a>
      </div>
    </section>
  )
}

export default Login;