import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import useStore from '../../store/useStore';
import { observer } from 'mobx-react';
import CardMini from '../../components/card/CardMini';
import Wave from '../../components/wave/Wave';
import { Box } from '@mui/material';
import { useRootStore } from '../../provider/rootContext';

const Home = () => {
  // const {value} = useStore();
  const value = useRootStore();
  return (
    <Box sx={{textAlign: "center"}}>
      <Box sx={{position: "relative", m:2}}>
        <Box component="img" src='../../../images/MainImg.jpg' alt='HomeIMG'
        sx={{height:500, maxWidth:"1500px",width:"100%", height: "auto", my: 2, position: "relative"}}/>
        <Box sx={{position: "absolute", top:"50%", left:"50%", transform: "translate( -50%, -50% )", fontSize: "50px", color:"white", fontWeight:400}}>당신의 기록이 파도가 되어</Box>
      </Box>
      {value.authStore.isLogin&&
        (<div>
          <Wave></Wave>
          <Link to='/card'><button>파도 추가하기</button></Link>
        </div>)
      }
      <Box sx={{display:'flex',justifyContent: "center", alignItems: "center"}}>
        <CardMini cardId="1"/>
        <CardMini cardId="2"/>
        <CardMini cardId="3"/>
      </Box>
    </Box>
  )
}
export default observer(Home);