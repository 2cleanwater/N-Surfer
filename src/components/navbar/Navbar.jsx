import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import User from '../user/User';
import { observer } from 'mobx-react';
import useStore from '../../store/useStore';
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = ()=>{
  const {value} = useStore();
  
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.mainLogo}>
        <img className={styles.logo} src='/images/N-Surfer_Icon.png' alt="logo"/>
        <h1 className={styles.title}>N-Surfer</h1>
      </Link>


      <div className={styles.menu}>
        <Link to='/card/list' className={styles.menuItem}>카드목록</Link>
        {isLogin&&(<Link to='/card' className={styles.menuItem}>카드추가</Link>)}
        {isLogin? 
          (<button className={styles.logout} onClick={()=>{value.authStore.kakaoLogout()}}>Logout</button>) : 
          (<button className={styles.logout} onClick={()=>{value.modalStore.openModal()}}>Login</button>)
        }
        {isLogin&&(<Link to='/user/profile'><img className={styles.profile} src='/images/profile_logo.jpg' alt="profile" /></Link>)}

      </div>


      {/* <div className={styles.menu}>
        <Link to='/card/list' className={styles.menuItem}>카드목록</Link>
        {user&&(<Link to='/card' className={styles.menuItem}>카드추가</Link>)}
        {user? 
          (<button className={styles.logout} onClick={()=>{value.authStore.logout()}}>Logout</button>) : 
          (<button className={styles.logout} onClick={()=>{value.modalStore.openModal()}}>Login</button>)
        }
        {user&&(<Link to='/user/profile'><img className={styles.profile} src='/images/profile_logo.jpg' alt="profile" /></Link>)}

      </div> */}



      {/* <div>
        <a href="https://github.com/2cleanwater/N-Surfer#readme" target="_blank" rel="noopener noreferrer">
          <img src="/images/Github.png" style={{width:"20px", height:"20px"}}/>
        </a>
        <a href="https://2cleanwater.notion.site/N-Surfer-0d2ae67e463b46dc96126f0044208100" target="_blank" rel="noopener noreferrer">
          <img src="/images/Notion.png" style={{width:"20px", height:"20px"}}/>
        </a>
      </div> */}
    </header>
  );
}
export default observer(Navbar);