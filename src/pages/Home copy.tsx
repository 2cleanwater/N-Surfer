import CardMini from '@/components/cardList/CardMini';
import Wave from '@components/waveBox/Wave';
import { useRootStore } from '@provider/rootContext';
import { OceanData } from '@store/OceanStore';
import Loading from '@components/utils/Loading';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { Box, AppBar, Toolbar, Typography } from '@mui/material';


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
      헤이헤이 너는 내가 누군지 아니?
      {isLogin?
      (value.profileStore.userData.nickname&&<Wave nickname={value.profileStore.userData.nickname!}/>):
      (<Box component="img" src={mainImg} alt='HomeIMG'
      sx={{ width:"55em", borderRadius:"3em", boxShadow: 3,my:"3em"}}/>)}
      <Box sx={{width:"35em", borderRadius:"1em", boxShadow: 3, backgroundColor:"#0067a3", m:"1.5em", p:"0.5em", pl:"1.5em", fontSize:"25px", fontWeight:"bold", color:"white"}}>
        최근 작성된 파도</Box>
      {value.oceanStore.isOceanListLoading?
      <Box sx={{width:"100%"}}><Loading/></Box>:
      <>{recentList.length<=0?
        <Box sx={{display:'flex', flexDirection:"column", justifyContent: "center", alignItems: "center",my:"2em",height:"10em"}}>
          <Box sx={{fontSize:"40px", color:"#0F7B6C"}}>최근 작성된 파도가 없습니다!</Box>
          <Box sx={{fontSize:"25px", color:"#0F7B6C"}}>글을 작성하여 파도를 추가해보세요.</Box>
        </Box>:
        <Box sx={{display:'flex',justifyContent: "center", alignItems: "center",my:"6em"}}>
          {[...Array(3)].map((_, index) => {return (<div key={index}>{recentList[index]&&<CardMini OceanData={recentList[index]}/>}</div>)})}
        </Box>
      }</>}
    </Box>
  )
}
export default observer(Home);