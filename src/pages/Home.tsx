import React from 'react'
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import CardMini from '@/components/CardMini';
import Wave from '@/components/Wave';
import { Box } from '@mui/material';
import { useRootStore } from '@provider/rootContext';

const Home = () => {
  const value = useRootStore()!;
  return (
    <Box sx={{position: "relative", m:2, border:"1px black solid", display:"flex", flexDirection:"column",justifyContent: "center", alignItems: "center"}}>
      <Wave/>
      <Box sx={{display:'flex',justifyContent: "center", alignItems: "center"}}>
        <CardMini cardId="1"/>
        <CardMini cardId="2"/>
        <CardMini cardId="3"/>
      </Box>
      {/* <Box sx={{position: "relative", m:2, border:"1px black solid" }}>
        <Box component="img" src={require('@static/images/MainImg.jpg')} alt='HomeIMG'
        sx={{ width:"300px", }}/>
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
      </Box> */}
    </Box>
  )
}
export default observer(Home);