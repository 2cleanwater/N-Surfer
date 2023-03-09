import { Box } from '@mui/material'
import React from 'react'

interface wave {
  date:string,
  count:number
}
const WaveBox = ({date,count}:wave) => {
  return (
    <Box sx={{margin:"2px", paddingLeft:"5px", paddingRight:"5px"}}>
      {count===0?(
          <Box  sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "whtie",
            border: "1px solid black"
          }}></Box>
        ):null}
      {count>0&&count<=3?(
          <Box  sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "waveLv1",
            border: "1px solid black"
          }}></Box>
        ):null}
      {count>3&&count<=6?(
          <Box  sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "waveLv2",
            border: "1px solid black"
          }}></Box>
        ):null}
      {count>6&&count<=9?(
          <Box  sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "waveLv3",
            border: "1px solid black"
          }}></Box>
        ):null}
      {count>9&&count<=12?(
          <Box  sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "waveLV4",
            border: "1px solid black"
          }}></Box>
        ):null}
      {count>12?(
          <Box  sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "waveLv5",
            border: "1px solid black"
          }}></Box>
        ):null}
    </Box>
  );
}

export default WaveBox