import { useRootStore } from '@provider/rootContext';
import { Box, Button, styled } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const TitleCss = styled("div")({
  position:"relative",
  width:"92%",
  height:"auto",
  marginTop:"1em",
  marginBottom:"1em",
  textAlign: "center",
  fontSize:"3em", 
  fontWeight:"500",
  lineHeight: "2",
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
      transform: "scale(1.1)"
    },
    "100%": {
      transform: "scale(1)"
    }
  }
});

const ExplainEnding = () => {
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
      <Box sx={{my:"1em"}}>"N-Surfer"에서 직접 글을 작성하고 <br></br>나의 <WaveFont>파도</WaveFont>가 커지는 걸 확인해보세요!</Box>
      <div>
        <Button variant="contained" sx={{m:"2em",p:"0.5em",px:"1em", fontSize:"20px", fontWeight:"700"}} onClick={handleWaveCreate}>
          파도 만들러 가기
        </Button>
      </div>
    </TitleCss>
  )
}

export default ExplainEnding