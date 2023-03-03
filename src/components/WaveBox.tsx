import { Box } from '@mui/material'
import React from 'react'

interface wave {
  date:string,
  count:number
}
const WaveBox = ({date,count}:wave) => {
  return (
    <>
      {count===0?(
          <Box  sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "gray",
            border: "1px solid black"
          }}></Box>
        ):null}
      {count>0&&count<=5?(
          <Box  sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "blue",
            border: "1px solid black"
          }}></Box>
        ):null}
      {count>5&&count<=10?(
          <Box  sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "darkblue",
            border: "1px solid black"
          }}></Box>
        ):null}
    </>
  );
}

export default WaveBox