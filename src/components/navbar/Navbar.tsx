import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Box } from '@mui/material';

import { observer } from 'mobx-react';

import { useRootStore } from '../../provider/rootContext';
import { useEffect } from 'react';

const Navbar = ()=>{
  const value = useRootStore()!;
  const isLogin = value.authStore.isLogin;
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      console.log("로그인 "+value.authStore.isLogin);
      value.authStore.setIsLogin();
      value.profileStore.getUserData();
    }else{
      console.log("로그인 "+value.authStore.isLogin);
      value.authStore.setIsLogout();
    }
  },[localStorage.getItem('token')]);

  let userImg: string;
  if(value.profileStore.userData.imgUrl){
    userImg = value.profileStore.userData.imgUrl;
  }else{
    userImg= '/images/profile_logo.jpg';
  }

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
          (<button className={styles.logout} onClick={()=>{value.authStore.logout(); navigate("/");}}>Logout</button>) : 
          (<button className={styles.logout} onClick={()=>{value.modalStore.openModal()}}>Login</button>)
        }
        {isLogin&&(<Link to='/user/profile'><img className={styles.profile} src={userImg} alt="profile" /></Link>)}
      </Box>
      {/* <Box sx={{}}>
        <a href="https://github.com/2cleanwater/N-Surfer#readme" target="_blank" rel="noopener noreferrer">
          <img src="/images/Github.png" style={{width:"20px", height:"20px"}}/>
        </a>
        <a href="https://2cleanwater.notion.site/N-Surfer-0d2ae67e463b46dc96126f0044208100" target="_blank" rel="noopener noreferrer">
          <img src="/images/Notion.png" style={{width:"20px", height:"20px"}}/>
        </a>
      </Box> */}
    </header>
  );
}
export default observer(Navbar);