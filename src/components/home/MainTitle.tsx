import { Box, Button, styled } from '@mui/material'
import React from 'react'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import WavesIcon from '@mui/icons-material/Waves';
import { useRootStore } from '@provider/rootContext';
import { useNavigate } from 'react-router-dom';

const TitleCss = styled("div")({
  position:"relative",
  width:"92%",
  height:"70vh",
  marginTop:"0.5em",
  marginBottom:"1em",
  textAlign: "center",
  justifyContent:"center",
  display:"flex",
  flexDirection:"column",
  fontSize:"4em", 
  fontWeight:"500",
  lineHeight: "1.5",
  // animation: "animation-mainTitle 1s ease-in-out 0.5s 1 normal forwards running",
  // opacity: 0,
  // animationDelay: "0.5s", 
  // "@keyframes animation-mainTitle": {
  //   "0%": {
  //     opacity:0
  //   },
  //   "100%": {
  //     opacity:1
  //   },
  // }
})

const WaveFont = styled("span")({
  fontSize:"1em",
  fontWeight:"700",
  color:"#0679C0",
  display: "inline-block",
  animation: "scale-and-slide 3s ease-in-out infinite ",
  "@keyframes scale-and-slide": {
    "0%": {
      transform: "scale(1)"
    },
    "50%": {
      transform: "scale(1.4)"
    },
    "100%": {
      transform: "scale(1)"
    }
  }
});

const MainTitle = ({ onButtonClick }: { onButtonClick: () => void }) => {
  const value= useRootStore()!;
  const navigate= useNavigate();

  const handleWaveCreate = ()=>{
    if(value?.profileStore.userData.nickname){
      navigate('/cardForm')
    }
    else{
      value.authStore.setIsLoginLoading(true); 
      value.modalStore.openModal()
    }
  }
  return (
    <TitleCss data-aos="fade-zoom-in" data-aos-delay="600" data-aos-duration="1200" data-aos-easing="easy-in-out" data-aos-once="true">
      <Box sx={{mb:"1em"}}>작은 기록들이 모여 <br/> 큰 <WaveFont>파도</WaveFont>가 되어 물결치다</Box>
      <div>
        <Button variant="contained" sx={{m:"2em",p:"0.5em",px:"1em", borderRadius:"1em", fontSize:"20px", fontWeight:"700"}} onClick={onButtonClick}>
          <ContactSupportIcon sx={{mr:"0.5em"}}/>
          파도가 뭐지?
        </Button>
        <Button variant="contained" sx={{m:"2em",p:"0.5em",px:"1em", borderRadius:"1em", fontSize:"20px", fontWeight:"700"}} onClick={handleWaveCreate}>
          <WavesIcon sx={{mr:"0.5em"}}/>
          파도 만들기
        </Button>
      </div>
    </TitleCss>
  )
}

export default MainTitle