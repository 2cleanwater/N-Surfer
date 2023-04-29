import { Box, styled } from '@mui/material';
import RecentOcean from './RecentOcean';

const ExplainCommCss = styled("div")({
  position:"relative", 
  width:"92%",
  marginTop:"8em",
  marginBottom:"8em"
})

const ExplainCommTitleCss = styled("div")({
  color:"#0679C0",
  fontSize:"35px",
  fontWeight:"700",
  textAlign:"left",
  marginBottom:"1em",
  zIndex:1,
  // animation: "animation-ExplainCommTitleCss 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "0.5s", 
  // "@keyframes animation-ExplainCommTitleCss": {
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

const ExplainCommSubTitleCss = styled("div")({
  wordBreak: "keep-all",
  whiteSpace: "pre-wrap",
  fontSize:"50px",
  fontWeight:"700",
  verticalAlign: "baseline",
  zIndex:1,
  // animation: "animation-ExplainCommSubTitleCss 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "0.5s", 
  // "@keyframes animation-ExplainCommSubTitleCss": {
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


const ExplainCommImg01Css = styled("img")({
  width:"40%",
  borderRadius:"3em",
  boxShadow:"4px 2px 10px gray",
  position: "absolute",
  right:"0px",
  top:"10%",
  verticalAlign: "baseline",
  // animation: "animation-ExplainCommImg01Css 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "1s", 
  // "@keyframes animation-ExplainCommImg01Css": {
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

const ExplainCommContentCss = styled("p")({
  width:"42%",
  wordBreak: "keep-all",
  whiteSpace: "pre-wrap",
  fontSize:"35px",
  fontWeight:"500",
  verticalAlign: "baseline",
  position:"absolute",
  right:"0%",
  top:"4%",
  zIndex:1,
  // animation: "animation-ExplainCommContentCss 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "2s", 
  // "@keyframes animation-ExplainCommContentCss": {
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

const ExplainComm = () => {
  return (
    <ExplainCommCss>
      <Box sx={{position:"relative", height: "20em"}} data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true">
        <ExplainCommTitleCss>커뮤니티</ExplainCommTitleCss>
        <ExplainCommSubTitleCss>유저들이 작성한 글을 <br></br>한눈에!</ExplainCommSubTitleCss>
      </Box>
      <Box>
        <RecentOcean/>
      </Box>
      <ExplainCommContentCss data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="600" data-aos-duration="800" data-aos-easing="easy-in-out" data-aos-once="true">다른 <RedCss>유저</RedCss>들이 작성한 글들을 검색하고, 그 유저가 얼마나 많은 일을 했는지 확인하세요.</ExplainCommContentCss>
    </ExplainCommCss>
  )
}

export default ExplainComm