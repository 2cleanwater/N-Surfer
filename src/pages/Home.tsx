import CardMini from '@/components/cardList/CardMini';
import Wave from '@components/waveBox/Wave';
import { useRootStore } from '@provider/rootContext';
import { OceanData } from '@store/OceanStore';
import Loading from '@components/utils/Loading';
import MainTitle from '@components/home/MainTitle';
import ExplainText from '@components/home/ExplainText';

import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import AOS from 'aos';
import "aos/dist/aos.css";

import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ExplainPost from '@components/home/ExplainPost';
import ExplainDaily from '@components/home/ExplainDaily';
import ExplainComm from '@components/home/ExplainComm';
import ExplainShare from '@components/home/ExplainShare';
import ExplainEnding from '@components/home/ExplainEnding';


const Home = () => {
  useEffect(()=>{
    AOS.init();
  })

  const myRef= useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    myRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  return (
    <Box sx={{position: "relative", border:"1px black ", display:"flex", flexDirection:"column",justifyContent: "center", alignItems: "center"}}>
      <MainTitle onButtonClick={handleButtonClick}/>
      <Box sx={{border:"1px solid gray", width:"100%"}}/>
      <ExplainText/>
      <Box sx={{border:"1px solid gray", width:"100%"}}/>
      <ExplainPost/>
      <Box ref={myRef} sx={{border:"1px solid gray", width:"100%"}}/>
      <ExplainDaily/>
      <Box sx={{border:"1px solid gray", width:"100%"}}/>
      <ExplainComm/>
      <Box sx={{border:"1px solid gray", width:"100%"}}/>
      <ExplainShare/>
      <Box sx={{border:"1px solid gray", width:"100%"}}/>
      <ExplainEnding/>
    </Box>
  )
}
export default observer(Home);