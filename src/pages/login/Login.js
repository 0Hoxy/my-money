import React, { useState } from 'react';
import styles from './Login.module.css';
import { useLogin } from '../../hooks/useLogin';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>password:</span>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </label>
      {!isPending && <button className='btn'>로그인</button>}
      {isPending && <button className='btn' disabled>로딩중...</button>}
      {error && <p>{error}</p>}
    </form>
  );
}
