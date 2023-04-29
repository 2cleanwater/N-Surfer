import { Box, styled } from '@mui/material';
import { forwardRef, useRef } from 'react';
import Wave from '../waveBox/Wave';
import { useRootStore } from '@provider/rootContext';
import WaveDummy from './WaveDummy';

const ExplainDailyCss = styled("div")({
  position:"relative", 
  height: "70em", 
  width:"92%",
  marginTop:"5em",
  marginBottom:"5em"
})

const ExplainDailyTitleCss = styled("div")({
  color:"#0679C0",
  fontSize:"35px",
  fontWeight:"700",
  textAlign:"left",
  marginBottom:"1em",
  zIndex:1,
  // animation: "animation-ExplainDailyTitleCss 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "0.5s", 
  // "@keyframes animation-ExplainDailyTitleCss": {
  //   "0%": {
  //     opacity:0,
  //     transform: "translate3d(0px, 50px, 0px)"
  //   },
  //   "100%": {
  //     opacity:1,
  //     transform: "translate3d(0px, 0px, 0px)"
  //   },
  // }
});

const ExplainDailySubTitleCss = styled("div")({
  wordBreak: "keep-all",
  whiteSpace: "pre-wrap",
  fontSize:"50px",
  fontWeight:"700",
  verticalAlign: "baseline",
  zIndex:1,
  // animation: "animation-ExplainDailySubTitleCss 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "0.5s", 
  // "@keyframes animation-ExplainDailySubTitleCss": {
  //   "0%": {
  //     opacity:0,
  //     transform: "translate3d(0px, 50px, 0px)"
  //   },
  //   "100%": {
  //     opacity:1,
  //     transform: "translate3d(0px, 0px, 0px)"
  //   },
  // }
})


const ExplainDailyImg01Css = styled("img")({
  width:"50%",
  borderRadius:"3em",
  boxShadow:"4px 2px 10px gray",
  position: "absolute",
  left:"0px",
  bottom:"0px",
  verticalAlign: "baseline",
  // animation: "animation-ExplainDailyImg01Css 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "1s", 
  // "@keyframes animation-ExplainDailyImg01Css": {
  //   "0%": {
  //     opacity:0,
  //     transform: "translate3d(0px, 50px, 0px)"
  //   },
  //   "100%": {
  //     opacity:1,
  //     transform: "translate3d(0px, 0px, 0px)"
  //   }
  // }
})

const ExplainDailyContentCss = styled("p")({
  width:"50%",
  textAlign:"right",
  wordBreak: "keep-all",
  whiteSpace: "pre-wrap",
  fontSize:"35px",
  fontWeight:"500",
  verticalAlign: "baseline",
  position:"absolute",
  right:"0%",
  top:"6%",
  zIndex:1,
  // animation: "animation-ExplainDailyContentCss 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "1.5s", 
  // "@keyframes animation-ExplainDailyContentCss": {
  //   "0%": {
  //     opacity:0,
  //     transform: "translate3d(0px, 50px, 0px)"
  //   },
  //   "100%": {
  //     opacity:1,
  //     transform: "translate3d(0px, 0px, 0px)"
  //   },
  // }
})

const RedCss = styled("span")({
  color:"#A34C00"
})

const BlueCss = styled("span")({
  color:"#0679C0",
})


const imgExplainPost01:string= process.env.REACT_APP_EXPLAINPOST01!;
const imgExplainPost02:string= process.env.REACT_APP_EXPLAINPOST02!;
const imgExplainDaily:string= process.env.REACT_APP_EXPLAINDAILY01!;
const imgExplainComm:string= process.env.REACT_APP_EXPLAINCOMM01!;
const imgExplainShare01:string= process.env.REACT_APP_EXPLAINSHARE01!;
const imgExplainShare02 :string= process.env.REACT_APP_EXPLAINSHARE02!;

const ExplainDaily = forwardRef<HTMLDivElement>((props, ref) => {
  const value=useRootStore();
  const nickname= value?.profileStore.userData.nickname;
  return (
    <ExplainDailyCss ref={ref}>
      <Box sx={{position:"relative"}} data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true">
        <ExplainDailyTitleCss>데일리 기록</ExplainDailyTitleCss>
        <ExplainDailySubTitleCss>글을 쓰고 수정하고... <br></br>얼마나 많이 했지?</ExplainDailySubTitleCss>
      </Box>
      <Box sx={{my:"8em"}} data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="1000" data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true">
        <WaveDummy/>
      </Box>
      <ExplainDailyContentCss data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="600" data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true">
        오늘의 TIL, 공유했던 팁들 내가 <RedCss>작성</RedCss>하고 <RedCss>수정</RedCss>한 횟수들이 모여 <BlueCss>“파도”</BlueCss>를 이룹니다.</ExplainDailyContentCss>
    </ExplainDailyCss>
  )
})

export default ExplainDaily