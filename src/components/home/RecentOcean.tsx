import CardMini from '@components/cardList/CardMini';
import { useRootStore } from '@provider/rootContext';
import { OceanData } from '@store/OceanStore';
import Loading from '@components/utils/Loading';

import { useEffect, useState } from 'react';

import { Box, styled } from '@mui/material';

const WaveBoxCss = styled("div")({
  marginLeft:"1.5em",
  marginRight:"1.5em",
  // opacity: 0,
  // animation: "animation-waveBoxCss 1s ease-in-out 0.5s 1 normal forwards running",
  // "@keyframes animation-waveBoxCss": {
  //   "0%": {
  //     opacity:0,
  //     transform: "translateX(250px)"
  //   },
  //   "100%": {
  //     opacity:1,
  //     transform: "translateX(0)"
  //   },
  // }
})

const RecentOcean = () => {
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
      {value.oceanStore.isOceanListLoading?
      <Box sx={{width:"100%"}}><Loading/></Box>:
      <Box sx={{display:'flex',justifyContent: "center", alignItems: "center",my:"6em"}}>
        {[...Array(3)].map((_, index) => {return (<WaveBoxCss data-aos="fade-left" data-aos-anchor-placement="top-bottom" data-aos-delay={index*200+800} data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true" key={index}>{recentList[index]&&<CardMini OceanData={recentList[index]}/>}</WaveBoxCss>)})}
      </Box>
      // <>{recentList.length<=0?
      //   <Box sx={{display:'flex', flexDirection:"column", justifyContent: "center", alignItems: "center",my:"2em",height:"10em"}}>
      //     <Box sx={{fontSize:"40px", color:"#0F7B6C"}}>최근 작성된 파도가 없습니다!</Box>
      //     <Box sx={{fontSize:"25px", color:"#0F7B6C"}}>글을 작성하여 파도를 추가해보세요.</Box>
      //   </Box>:
      //   <Box sx={{display:'flex',justifyContent: "center", alignItems: "center",my:"6em"}}>
      //     {[...Array(3)].map((_, index) => {return (<WaveBoxCss sx={{animationDelay: `${0.5*(index+2)}s`,}} key={index}>{recentList[index]&&<CardMini OceanData={recentList[index]}/>}</WaveBoxCss>)})}
      //   </Box>
      // }</>
      }
    </Box>
  )
}

export default RecentOcean