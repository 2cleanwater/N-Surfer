import { observer } from 'mobx-react';
import CardMini from '@/components/CardMini';
import Wave from '@/components/Wave';
import { Box } from '@mui/material';
import { useRootStore } from '@provider/rootContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const value = useRootStore()!;
  const isLogin = value.authStore.isLogin;
  return (
    <Box sx={{position: "relative", m:2, border:"1px black ", display:"flex", flexDirection:"column",justifyContent: "center", alignItems: "center"}}>
      {isLogin?
      (<Wave userName={value.profileStore.userData.userName!}/>):
      (<Box component="img" src={require('@static/images/testHome.png')} alt='HomeIMG'
      sx={{ height:"400px" }}/>)}
      <Box sx={{display:'flex',justifyContent: "center", alignItems: "center", padding:"10px"}}>
        <CardMini cardId="1"/>
        <CardMini cardId="2"/>
        <CardMini cardId="3"/>
      </Box>
    </Box>
  )
}
export default observer(Home);