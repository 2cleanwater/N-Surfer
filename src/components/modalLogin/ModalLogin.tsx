import styles from './ModalLogin.module.css';
import { observer } from 'mobx-react';
import { useRootStore } from '../../provider/rootContext';
import { Box, useTheme } from '@mui/material';

import { Button } from "@mui/material";



const ModalLogin = ()=>{
  const value = useRootStore()!;
  const theme = useTheme();

  return (
    <section className={styles.modalContainer}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={()=>{value.modalStore.closeModal()}}>X</button>
        <div className={styles.loginSection}>
          <Button variant="contained"
          sx={{ bgcolor: '#4285F4', ":hover": {boxShadow: 6,}, my: 2, p: 2, fontSize: '20px' }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.googleLogin();}}>Google</Button>
          <Button variant="contained" 
          sx={{ bgcolor: '#171515', my: 2, p: 2, fontSize: '20px'}} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.githubLogin(); }}>Github</Button>
          <Button variant="contained" 
          sx={{ bgcolor: '#f9e000', my: 2, p: 2, fontSize: '20px' }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.kakaoLogin(); }}>Kakao</Button>
          <Button variant="contained" 
          sx={{ bgcolor: '#2DB400', my: 2, p: 2, fontSize: '20px' }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.naverLogin(); }}>Naver</Button>
        </div>    
      </div>
    </section>
  );
}
export default observer(ModalLogin);
