import styles from './ModalLogin.module.css';
import { observer } from 'mobx-react';
import { useRootStore } from '@provider/rootContext';
import { Box, useTheme } from '@mui/material';

import { Button } from "@mui/material";

const ModalLogin = ()=>{
  const value = useRootStore()!;
  const theme = useTheme();

  return (
    <Box sx={{ position: "fixed", top: "0%", left: "0%", zIndex: 999, width: "100%", height: "100%", backdropFilter: "blur(5px)"}}>
      <Box sx={{ width: "400px", height: "500px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
      background: "rgba(255, 255, 255, .8)", border: "1px solid black", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Button
        sx={{ position: "absolute", right: "10px", top: "10px"}} 
        onClick={()=>{value.modalStore.closeModal()}}>X</Button>
        <Box sx={{ display: "flex", flexDirection: "column", width: "70%"}}>
          <Button variant="contained"
          sx={{ bgcolor: 'google', ":hover": {bgcolor: 'googleHover', boxShadow: 6,}, my: 2, p: 2, fontSize: '20px' }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.googleLogin();}}>Google</Button>
          <Button variant="contained" 
          sx={{ bgcolor: 'github', ":hover": {bgcolor: 'githubHover', boxShadow: 6,}, my: 2, p: 2, fontSize: '20px'}} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.githubLogin(); }}>Github</Button>
          <Button variant="contained" 
          sx={{ bgcolor: 'kakao', ":hover": {bgcolor: 'kakaoHover', boxShadow: 6,}, my: 2, p: 2, fontSize: '20px' }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.kakaoLogin(); }}>Kakao</Button>
          <Button variant="contained" 
          sx={{ bgcolor: 'naver', ":hover": {bgcolor: 'naverHover', boxShadow: 6,}, my: 2, p: 2, fontSize: '20px' }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.naverLogin(); }}>Naver</Button>
        </Box>    
      </Box>
    </Box>
  );
}
export default observer(ModalLogin);
