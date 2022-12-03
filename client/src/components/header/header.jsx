import React, {memo} from 'react'
import styles from './header.module.css';

// const Header = memo(({onLogout})=>{
//   <header className={styles.header}>
//     {onLogout&&(<button className={styles.logout} onClick={onLogout}>Logout</button>)}
//     <img className={styles.logo} src="../images/logo.png" alt="logo"/>
//     <h1 className={styles.title}>N-Surfer</h1>
//   </header>
// });

function Header({onLogout}) {
  return (
    <header className={styles.header}>
      {onLogout&&(<button className={styles.logout} onClick={onLogout}>Logout</button>)}
      <img className={styles.logo} src='images/logo.jpg' alt="logo"/>
      <img src='test.png' alt='why'/>
      <h1 className={styles.title}>N-Surfer</h1>
    </header>
  )
}


export default Header