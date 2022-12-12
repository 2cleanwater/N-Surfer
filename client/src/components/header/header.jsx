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
      <img className={styles.logo} src='/images/logo.png' alt="logo"/>
      <h1 className={styles.title}>N-Surfer</h1>
      <ul className={styles.menu}>
        <li>카드 목록</li>
        {onLogout?
        (
            <li>로그인</li>
        ):
        (
            <li>회원가입</li>
        )}
      </ul>
      {onLogout? 
        (<button className={styles.logout} onClick={onLogout}>Logout</button>) : 
        (<button className={styles.logout} onClick={onLogout}>Login</button>)
      }
      <img className={styles.profile} src='/images/profile_logo.jpg' alt="profile">

      </img>
    </header>
  )
}


export default Header