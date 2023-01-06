import React from 'react'
import styles from './ModalLogin.module.css';
import { observer } from 'mobx-react';
import useStore from '../../store/useStore';
import { Box, useTheme } from '@mui/material';

import { Button } from "@mui/material";
import { KAKAO_AUTH_URL } from '../../service/KakaoAuth';



const ModalLogin = ()=>{
  const {value} = useStore();
  const theme = useTheme();

  return (
    <section className={styles.modalContainer}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={()=>{value.modalStore.closeModal()}}>X</button>
        <div className={styles.loginSection}>
          <Button variant="contained"
          sx={{ bgcolor: theme.socialLogin.google, ":hover": {boxShadow: 6,}, my: 2, p: 2, fontSize: '20px' }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.googleLogin();}}>Google</Button>
          <Button variant="contained" 
          sx={{ bgcolor: theme.socialLogin.github, my: 2, p: 2, fontSize: '20px'}} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.githubLogin(); }}>Github</Button>
          <Button component='a' href={KAKAO_AUTH_URL} variant="contained" 
          sx={{ bgcolor: theme.socialLogin.kakao, my: 2, p: 2, fontSize: '20px' }} 
          onClick={()=>{value.modalStore.closeModal(); }}>Kakao</Button>
          <Button variant="contained" 
          sx={{ bgcolor: theme.socialLogin.naver, my: 2, p: 2, fontSize: '20px' }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.naverLogin(); }}>Naver</Button>
        </div>    
      </div>
    </section>
  );
}
export default observer(ModalLogin);
