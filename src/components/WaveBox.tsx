import { dateConverter } from '@service/dateConverter'
import { Box, styled, Tooltip} from '@mui/material'

interface waveBoxForm {
  date:string,
  count:number,
  toggle:boolean,
  isClicked:boolean
}

const colorCode = {
  waveLv0: '#f0f5f7',
  waveLv1: '#D3ECF9',
  waveLv2: '#9CCCE8',
  waveLv3: '#2E88C7',
  waveLv4: '#2158A8',
  waveLv5: '#232A5C'
}

const WaveBox = ({date,count,toggle,isClicked}:waveBoxForm) => {
  const waveStyle = {
    m:"0.2em",
    overflow: "hidden",
    border: isClicked?"2px solid #4B89DC":"2px solid transparent",
    bgcolor: isClicked?'lightblue':'',
    borderRadius: "8px",
    width: "4em",
    height: "3em",
    boxShadow: 3,
    "&:hover": {
      border: "2px solid green",
      bgcolor: 'lightblue'
    },
  }
  
  const StyledSvg = styled("svg")({
    "@keyframes shift": {
      "100%": {
        transform: "translateX(-50%)"
      },
    },
    position: "relative",
    bottom: "0",
    // animation: toggle?"":"shift 1.5s linear infinite"
  });

  return (
    <Tooltip title={<div style={{ color: "lightblue", fontSize:"20px" }}>{dateConverter({dateString:date,tag:"korean"})+ ": " + count +"번"} </div>} sx={{m:"2px"}}>
      <div>
      {count===0?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" sx={{animation: toggle?"":"shift 2.5s linear infinite"}} fill={colorCode.waveLv0} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>

        ):null}
      {count>0&&count<=3?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" sx={{animation: toggle?"":"shift 2.3s linear infinite"}}  fill={colorCode.waveLv1} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
      {count>3&&count<=6?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" sx={{animation: toggle?"":"shift 2.1s linear infinite"}}  fill={colorCode.waveLv2} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
      {count>6&&count<=9?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" sx={{animation: toggle?"":"shift 1.8s linear infinite"}}  fill={colorCode.waveLv3} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
      {count>9&&count<=12?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" sx={{animation: toggle?"":"shift 1.5s linear infinite"}}  fill={colorCode.waveLv4} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
      {count>12?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" sx={{animation: toggle?"":"shift 1s linear infinite"}}  fill={colorCode.waveLv5} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
      </div>
    </Tooltip>
  );
}

export default WaveBox