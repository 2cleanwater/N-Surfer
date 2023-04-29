import { Box, styled } from '@mui/material';

const ExplainPostCss = styled("div")({
  position:"relative", 
  height: "55em",
  width:"92%",
  marginTop:"10em",
  marginBottom:"10em"
})

const ExplainPostTitleCss = styled("div")({
  color:"#0679C0",
  fontSize:"35px",
  fontWeight:"700",
  textAlign:"left",
  marginBottom:"1em",
  zIndex:1,
  // animation: "animation-ExplainPostTitleCss 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "0.5s", 
  // "@keyframes animation-ExplainPostTitleCss": {
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

const ExplainPostSubTitleCss = styled("div")({
  wordBreak: "keep-all",
  whiteSpace: "pre-wrap",
  fontSize:"50px",
  fontWeight:"700",
  verticalAlign: "baseline",
  zIndex:1,
  // animation: "animation-ExplainPostSubTitleCss 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "0.5s", 
  // "@keyframes animation-ExplainPostSubTitleCss": {
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


const ExplainPostImg01Css = styled("img")({
  width:"40%",
  borderRadius:"3em",
  boxShadow:"4px 2px 10px gray",
  position: "absolute",
  right:"0px",
  top:"0px",
  verticalAlign: "baseline",
  // animation: "animation-ExplainPostImg01Css 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "1s", 
  // "@keyframes animation-ExplainPostImg01Css": {
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

const ExplainPostImg02Css = styled("img")({
  width:"40%",
  borderRadius:"3em",
  boxShadow:"4px 2px 10px gray",
  position: "absolute",
  left:"0px",
  bottom:"0px",
  verticalAlign: "baseline",
  // animation: "animation-ExplainPostImg02Css 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "1.5s", 
  // "@keyframes animation-ExplainPostImg02Css": {
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

const ExplainPostContentCss = styled("p")({
  width:"30%",
  wordBreak: "keep-all",
  whiteSpace: "pre-wrap",
  fontSize:"35px",
  fontWeight:"500",
  verticalAlign: "baseline",
  position:"absolute",
  right:"0%",
  bottom:"0%",
  zIndex:1,
  // animation: "animation-ExplainPostContentCss 1s ease-in-out 0.5s 1 normal forwards running",
  // transform: "translate3d(0px, 50px, 0px)",
  // opacity: 0,
  // animationDelay: "2s", 
  // "@keyframes animation-ExplainPostContentCss": {
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

const ExplainPost = () => {
  return (
    <ExplainPostCss>
      <Box data-aos="fade-up" data-aos-delay="200" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true" sx={{position:"relative"}}>
        <ExplainPostTitleCss>포스트</ExplainPostTitleCss>
        <ExplainPostSubTitleCss>짧은 글과 사진으로 <br></br>이뤄진 팁과 노하우</ExplainPostSubTitleCss>
      </Box>
      <Box>
        <ExplainPostImg01Css data-aos="fade-up" data-aos-delay="1000"  data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true" src={imgExplainPost01} alt='imgExplainPost01'/>
        <ExplainPostImg02Css data-aos="fade-up" data-aos-delay="1000" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true" src={imgExplainPost02} alt='imgExplainPost01'/>
      </Box>
      <ExplainPostContentCss data-aos="fade-up" data-aos-delay="600" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true" >N-Surfer에서 <RedCss>카드</RedCss>를 만들어보세요. 목록에서 유저들이 확인할 수 있어요. </ExplainPostContentCss>
    </ExplainPostCss>
  )
}

export default ExplainPost