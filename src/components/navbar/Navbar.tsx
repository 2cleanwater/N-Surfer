import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Box } from '@mui/material';

import { observer } from 'mobx-react';

import { useRootStore } from '../../provider/rootContext';
import { useEffect } from 'react';
import { autorun } from 'mobx';


const Navbar = ()=>{
  const value = useRootStore()!;
  const isLogin = value.authStore.isLogin;
  // useEffect(()=>{
  //   if(localStorage.getItem('token')){
  //     value.authStore.getUserData();
  //     value.authStore.setIsLogin();
  //   }else{
  //     value.authStore.setIsLogout();
  //   }
  // },[value.authStore.userData]);

  
  useEffect(
    autorun(() => {
      if(localStorage.getItem('token')){
        value.authStore.getUserData();
        value.authStore.setIsLogin();
      }else{
        value.authStore.setIsLogout();
      }
  }),[value.authStore.userData])

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.mainLogo}>
        <img className={styles.logo} src='/images/N-Surfer_Icon.png' alt="logo"/>
        <h1 className={styles.title}>N-Surfer</h1>
      </Link>

      <Box className={styles.menu} sx={{p:2,}}>
        <Link to='/card/list' className={styles.menuItem}>카드목록</Link>
        {isLogin&&(<Link to='/card' className={styles.menuItem}>카드추가</Link>)}
        {isLogin? 
          (<button className={styles.logout} onClick={()=>{value.authStore.logout()}}>Logout</button>) : 
          (<button className={styles.logout} onClick={()=>{value.modalStore.openModal()}}>Login</button>)
        }
        {isLogin&&(<Link to='/user/profile'><img className={styles.profile} src='/images/profile_logo.jpg' alt="profile" /></Link>)}
      </Box>

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