import { Box, styled} from '@mui/material'
import React from 'react'

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
    margin:"2px",
    overflow: "hidden",
    border: isClicked?"2px solid #4B89DC":"2px solid transparent",
    backgroundColor: isClicked?'lightblue':'',
    borderRadius: "8px",
    width: "50px",
    height: "50px",
    boxShadow: 3,
    "&:hover": {
      border: "2px solid green",
      backgroundColor: 'lightblue'
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
    animation: toggle?"":"shift 1.5s linear infinite"
  });

  return (
    <Box sx={{margin:"2px"}}>
      {count===0?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" fill={colorCode.waveLv0} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>

        ):null}
      {count>0&&count<=3?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" fill={colorCode.waveLv1} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
      {count>3&&count<=6?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" fill={colorCode.waveLv2} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
      {count>6&&count<=9?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" fill={colorCode.waveLv3} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
      {count>9&&count<=12?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" fill={colorCode.waveLv4} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
      {count>12?(
          <Box sx={waveStyle}>
            <StyledSvg width="600" height="50px" fill={colorCode.waveLv5} viewBox="0 0 120 10">
            <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
            </StyledSvg>
          </Box>
        ):null}
    </Box>
  );
}

export default WaveBox

// import { Box, styled } from "@mui/material";
// import React from "react";

// interface wave {
//   date: string;
//   count: number;
// }

// const colorCode = {
//   waveLv0: "#f0f5f7",
//   waveLv1: "#D3ECF9",
//   waveLv2: "#9CCCE8",
//   waveLv3: "#2E88C7",
//   waveLv4: "#2158A8",
//   waveLv5: "#232A5C",
// };

// const waveStyle = {
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   overflow: "hidden",
//   border: "2px solid black",
//   borderRadius: "8px",
//   width: "40px",
//   height: "40px",
//   boxShadow: 3,
// };

// const StyledSvg = styled("svg")({
//   "@keyframes shift": {
//     "100%": {
//       transform: "translateX(-50%)",
//     },
//   },
//   position: "absolute",
//   bottom: "0",
//   animation: "shift 2s linear infinite",
// });
// const pathHeight = [5, 3, 2, 1.5, 1, 0.5]

// const WaveBox = ({ date, count }: wave) => {
//   ; // heights for each wave level
//   return (
//     <Box sx={{ margin: "2px" }}>
//       {count === 0 ? (
//         <Box sx={waveStyle}>
//           <StyledSvg width="600" height="50px" fill={colorCode.waveLv0} viewBox="0 0 120 10">
//             <path d={`M0,${pathHeight[0]} C20,-${pathHeight[0] * 2} 40,${pathHeight[0] * 2} 60,${pathHeight[0]} v${pathHeight[0]} H0`} />
//             <path transform="translate(60)" d={`M0,${pathHeight[0]} C20,-${pathHeight[0] * 2} 40,${pathHeight[0] * 2} 60,${pathHeight[0]} v${pathHeight[0]} H0`} />
//           </StyledSvg>
//         </Box>
//       ) : null}
//       {count > 0 && count <= 3 ? (
//         <Box sx={waveStyle}>
//           <StyledSvg width="600" height="50px" fill={colorCode.waveLv1} viewBox="0 0 120 10">
//             <path d={`M0,${pathHeight[1]} C20,-${pathHeight[1] * 2} 40,${pathHeight[1] * 2} 60,${pathHeight[1]} v${pathHeight[1]} H0`} />
//             <path transform="translate(60)" d={`M0,${pathHeight[1] / 2} C20,-${pathHeight[1]} 40,${pathHeight[1]} 60,${pathHeight[1] / 2} v${pathHeight[1] / 2} H0`} />
//           </StyledSvg>
//         </Box>
//       ) : null}
//       {count > 3 && count <= 6 ? (
//         <Box sx={waveStyle}>
//           <StyledSvg width="600" height="50px" fill={colorCode.waveLv2} viewBox="0 0 120 10">
//             <path d={`M0,${pathHeight[2]}C20,-${pathHeight[2] * 2} 40,${pathHeight[2] * 2} 60,${pathHeight[2]} v${pathHeight[2]} H0`} />
//             <path transform="translate(60)" d={`M0,${pathHeight[2] / 2} C20,-${pathHeight[2]} 40,${pathHeight[2]} 60,${pathHeight[2] / 2} v${pathHeight[2] / 2} H0`} />
//           </StyledSvg>
//         </Box>
//       ) : null}
//       {count > 6 && count <= 9 ? (
//         <Box sx={waveStyle}>
//           <StyledSvg width="600" height="50px" fill={colorCode.waveLv3} viewBox="0 0 120 10">
//             <path d={`M0,${pathHeight[3]} C20,-${pathHeight[3] * 2} 40,${pathHeight[3] * 2} 60,${pathHeight[3]} v${pathHeight[3]} H0`} />
//             <path transform="translate(60)" d={`M0,${pathHeight[3] / 2} C20,-${pathHeight[3]} 40,${pathHeight[3]} 60,${pathHeight[3] / 2} v${pathHeight[3] / 2} H0`} />
//           </StyledSvg>
//         </Box>
//       ) : null}
//       {count > 9 && count <= 12 ? (
//         <Box sx={waveStyle}>
//           <StyledSvg width="600" height="50px" fill={colorCode.waveLv4} viewBox="0 0 120 10">
//             <path d={`M0,${pathHeight[4]} C20,-${pathHeight[4] * 2} 40,${pathHeight[4] * 2} 60,${pathHeight[4]} v${pathHeight[4]} H0`} />
//             <path transform="translate(60)" d={`M0,${pathHeight[4] / 2} C20,-${pathHeight[4]} 40,${pathHeight[4]} 60,${pathHeight[4] / 2} v${pathHeight[4] / 2} H0`} />
//           </StyledSvg>
//         </Box>
//       ) : null}
//       {count > 12 ? (
//         <Box sx={waveStyle}>
//           <StyledSvg width="600" height="50px" fill={colorCode.waveLv5} viewBox="0 0 120 10">
//             <path d={`M0,${pathHeight[5]} C20,-${pathHeight[5] * 2} 40,${pathHeight[5] * 2} 60,${pathHeight[5]} v${pathHeight[5]} H0`} />
//             <path transform="translate(60)" d={`M0,${pathHeight[5] / 2} C20,-${pathHeight[5]} 40,${pathHeight[5]} 60,${pathHeight[5] / 2} v${pathHeight[5] / 2} H0`} />
//           </StyledSvg>
//         </Box>
//       ) : null}
//     </Box>
//   );
// }

// export default WaveBox