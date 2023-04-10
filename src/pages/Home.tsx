import CardMini from '@components/CardMini';
import Wave from '@components/Wave';
import { useRootStore } from '@provider/rootContext';
import { OceanData } from '@store/OceanStore';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { Box } from '@mui/material';
import Loading from '@components/Loading';

const Home = () => {
  const value = useRootStore()!;
  const isLogin = value.authStore.isLogin;
  const [recentList, setRecentList] = useState<Array<OceanData>>([]);

  const mainImg:string= process.env.REACT_APP_MAINIMG!;

  // sever data =============================================
  useEffect(()=>{
    value.oceanStore.getOceanList({numOfCards:3,setValue:setRecentList});
  },[value.oceanStore]);

  return (
    <Box sx={{position: "relative", border:"1px black ", display:"flex", flexDirection:"column",justifyContent: "center", alignItems: "center"}}>
      {isLogin?
      (value.profileStore.userData.nickname&&<Wave nickname={value.profileStore.userData.nickname!}/>):
      (<Box component="img" src={mainImg} alt='HomeIMG'
      sx={{ width:"55em", borderRadius:"3em", boxShadow: 3,my:"3em"}}/>)}
      <Box sx={{width:"35em", borderRadius:"1em", boxShadow: 3, backgroundColor:"#0067a3", m:"1.5em", p:"0.5em", pl:"1.5em", fontSize:"25px", fontWeight:"bold", color:"white"}}>
        최근 작성된 파도</Box>
      {value.loadingStore._IsLoading_OceanList||recentList.length<=0?
      <Box sx={{width:"100%"}}><Loading/></Box>:
      <Box sx={{display:'flex',justifyContent: "center", alignItems: "center",my:"6em"}}>
        {[...Array(3)].map((_, index) => {return (<CardMini key={index} OceanData={recentList[index]}/>)})}
      </Box>}
    </Box>
  )
}
export default observer(Home);