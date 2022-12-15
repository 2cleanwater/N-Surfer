import React, {memo} from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuthContext } from '../../context/AuthContext';
import { login, logout, onUserStateChange } from '../../api/firebase';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Navbar() {
  // const {user, login, logout} = useAuthContext();
  const [user,setUser] = useState();

  useEffect(()=>{
    onUserStateChange((user)=>{
      setUser(user);
    });
  },[])
  const handelLogin = ()=>{
    login().then(setUser);
  }
  const handelLogout = ()=>{
    logout().then(setUser);
  }
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.mainLogo}>
        <img className={styles.logo} src='/images/N-Surfer_Icon.png' alt="logo"/>
        <h1 className={styles.title}>N-Surfer</h1>
      </Link>
      <div className={styles.menu}>
        <Link to='/card/list' className={styles.menuItem}>카드목록</Link>
        {user&&(<Link to='/card' className={styles.menuItem}>카드추가</Link>)}
        {user? 
          (<button className={styles.logout} onClick={handelLogout}>Logout</button>) : 
          (<button className={styles.logout} onClick={handelLogin}>Login</button>)
        }
        <Link to='/user/profile'><img className={styles.profile} src='/images/profile_logo.jpg' alt="profile" /></Link>
      </div>
    </header>
  );
}