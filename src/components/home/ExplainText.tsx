import { Box, styled } from "@mui/material"


const ExplainTextCss = styled("div")({
  width:"92%",
  height:"auto",
  textAlign:"center",
  fontSize:"30px",
  lineHeight: "2",
  fontWeight:"700",
  marginTop:"10em",
  marginBottom:"10em"
})

const ColorFont = styled("span")({
  color:"#0679C0",
  fontWeight:"700"
});

const ExplainText = () => {
  return (
    <ExplainTextCss data-aos="fade-zoom-in" data-aos-anchor-placement="top-bottom" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true">
      짧은 포스트를 작성하고<br></br> 그 기록들이 얼마나 쌓였는지 <br></br><ColorFont>'파도'</ColorFont> 를 통해 확인해보세요.<br></br><br></br>
      노션 DB를 이용한 마이크로 블로그, <ColorFont>"N-Surfer"</ColorFont>
    </ExplainTextCss>
  )
}

export default ExplainText