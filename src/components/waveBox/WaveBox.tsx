import { dateConverter } from '@service/dateConverter'
import { Box, styled, Tooltip} from '@mui/material'

interface waveBoxForm {
  date:string,
  count:number,
  toggle:boolean,
  isClicked:boolean
}

const WaveBox = ({date,count,toggle,isClicked}:waveBoxForm) => {
  const waveBoxStyles = {
    width: "3.5em",
    height: "3.5em",
    position: "relative",
    m:"0.2em",
    borderRadius: "0.5em",
    border: isClicked?"2px solid #4B89DC":"2px solid #E7BD73",
    bgcolor: isClicked?'lightblue':'',
    "&:hover": {
      border: "2px solid green",
      bgcolor: 'lightblue'
    },
    boxShadow: isClicked?count>12?"0 0 30px 10px #ffa500":"0 0 50px 5px #4b48e0;":3,
    overflow: "hidden",
    backgroundImage:
      count===0?"linear-gradient(to top, #D6EAF8 0%, #F4FAFB 100%)":
      count>0&&count<=4?"linear-gradient(to top, #9DC9E9 0%, #C3E3F6 100%)":
      count>4&&count<=8?"linear-gradient(to top, #52B4D8 0%, #9CCCE8 100%)":
      count>8&&count<=12?"linear-gradient(to top, #20638F 0%, #2E88C7 100%)":
      count>12?"linear-gradient(to top, #014B60 0%, #01234C 100%)":""
  }

  const waveStyles = {
    width: "5.5em",
    height: "5.5em",
    position: "absolute",
    top: "-25%",
    left: "-0%",
    marginLeft: "-3em",
    marginTop: "-3em",
    borderRadius: "35%",
    background: "rgba(255, 255, 255)",
    animation: toggle?"":
    count===0?"wave 10s infinite linear":
    count>0&&count<=4?"wave 9s infinite linear":
    count>4&&count<=8?"wave 7s infinite linear":
    count>8&&count<=12?"wave 5s infinite linear":
    count>12?"wave 3s infinite linear":""
  }

  const waveStyles2 = {
    width: "5.5em",
    height: "5.5em",
    position: "absolute",
    top: "-25%",
    left: "100%",
    marginLeft: "-3em",
    marginTop: "-3em",
    borderRadius: "35%",
    background: "rgba(255, 255, 255)",
    animation: toggle?"":
    count===0?"wave 10s infinite linear":
    count>0&&count<=4?"wave 9s infinite linear":
    count>4&&count<=8?"wave 7s infinite linear":
    count>8&&count<=12?"wave 5s infinite linear":
    count>12?"wave 3s infinite linear":""
  }

  const StyledWave = styled("div")({
    "@keyframes wave": {
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg)",
      },
    }
  });

  return (
    <Tooltip placement="top" title={<div style={{ color: "lightblue", fontSize:"15px" }}>{dateConverter({dateString:date,tag:"korean"})+ ": " + count +"번"} </div>} sx={{m:"2px"}}>
      <Box sx={waveBoxStyles}>
        <StyledWave sx={waveStyles}/>
        <StyledWave sx={waveStyles2}/>
      </Box>
    </Tooltip>
  );
}

export default WaveBox