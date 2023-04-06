import { observer } from 'mobx-react';
import { useRootStore } from '@provider/rootContext';
import { Box, Button, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const ModalLogin = ()=>{
  const value = useRootStore()!;
  const googleIcon:string= process.env.REACT_APP_GOOGLEICON!;
  const githubIcon:string= process.env.REACT_APP_GITHUBICON!;
  const kakaoIcon:string= process.env.REACT_APP_KAKAOICON!;
  const naverIcon:string= process.env.REACT_APP_NAVERICON!;

  return (
    <Box sx={{ position: "fixed", top: "0%", left: "0%", zIndex: 999, width: "100%", height: "100%", backdropFilter: "blur(5px)"}}>
      <Box sx={{ width: "500px", height: "700px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: 15,
      background: "rgba(255, 255, 255, 0.9)", borderRadius: "2em", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(1px)"}}>
        <IconButton size="large" sx={{ position: "absolute", right: "10px", top: "10px",}} onClick={()=>{value.modalStore.closeModal()}}>
          <CloseIcon fontSize="large"/>
        </IconButton>
        <Box sx={{ display: "flex", flexDirection: "column", width: "70%"}}>
          <Button variant="contained"
          sx={{ bgcolor: 'google', ":hover": {bgcolor: 'googleHover', boxShadow: 6,}, my: 2, p: 2, fontSize: '30px',fontWeight:"bold", }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.googleLogin();}}>
          <Box component="img" sx={{width:"40px", height:"40px", mr:"20px"}} src={googleIcon}></Box> 
            Google</Button>
          <Button variant="contained" 
          sx={{ bgcolor: 'github', ":hover": {bgcolor: 'githubHover', boxShadow: 6,}, my: 2, p: 2, fontSize: '30px',fontWeight:"bold",}} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.githubLogin(); }}>
          <Box component="img" sx={{width:"40px", height:"40px", mr:"20px"}} src={githubIcon}></Box>   
            Github</Button>
          <Button variant="contained" 
          sx={{ bgcolor: 'kakao', ":hover": {bgcolor: 'kakaoHover', boxShadow: 6,}, my: 2, p: 2, fontSize: '30px', fontWeight:"bold", color:"Black" }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.kakaoLogin(); }}>
          <Box component="img" sx={{width:"40px", height:"40px", mr:"20px"}} src={kakaoIcon}></Box>   
            Kakao</Button>
          <Button variant="contained" 
          sx={{ bgcolor: 'naver', ":hover": {bgcolor: 'naverHover', boxShadow: 6,}, my: 2, p: 2, fontSize: '30px',fontWeight:"bold", }} 
          onClick={()=>{value.modalStore.closeModal(); value.authStore.naverLogin(); }}>
          <Box component="img" sx={{width:"40px", height:"40px", mr:"20px", backgroundColor:"white", borderRadius:"6px", border:"1px solid #2DB400"}} src={naverIcon}></Box>   
            Naver</Button>
        </Box>    
      </Box>
    </Box>
  );
}
export default observer(ModalLogin);
