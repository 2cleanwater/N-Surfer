import { Box, styled } from '@mui/material';
import { observer } from 'mobx-react'

import { useRootStore } from '@provider/rootContext';
import WaveBox from '@components/WaveBox';
import instance from '@/service/axiosInterceptor';
import { wave } from '@/store/WaveStore';
import { color, display, fontSize, fontWeight, width } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

//테스트 파일
// import testJson from '@'

const DayList = styled("li")({
  flexGrow: "1",
  display: "inline-block",
  height: "55px",
  lineHeight: "60px"
});

const Wave = ({userName}:{userName:string}) => {
  const value = useRootStore()!;
  const [hoverData, setHoverData]= useState(["", 0, 70]);
  const [waveToggle, setWaveToggle]= useState(false);

  // userData 받아오기 ==================================================
  const getUserWave= async function(){
    const userWaveUrl = `/user/wave?userName=${userName}`;
    await instance({
      method: "GET",
      url: userWaveUrl,
      headers:{
        'Content-Type': 'application/json'
      }})
      .then((res)=>{
        return res.data;
      })
      .catch((err)=>{
        console.log(err);
        window.alert(userName + "의 Wave를 가져올 수 없습니다.");
      })
  }
  // const userWaveList = getUserWave();

  // Test data ================================================
  const userWaveList= require("@test/waveData.json");

  const userWaveForm= value.waveStore.matchWaveForm(userWaveList as Array<wave>);
  console.log(hoverData);

  //Click 체크
  const isClicked=(index:number)=>{
    if(index===hoverData[2]){
      return true
    }else return false
  }

  return (
    <Box sx={{ 
      margin: "2em", 
      backgroundColor:"waveBackground",
      justifyContent:"center",
      alignContent: "center",
      width: "800px",
      height: "100%",
      borderRadius:"2em",
      paddingTop:"20px",
      paddingBottom:"40px"
      }}>
      <Box sx={{display:"flex", justifyContent: "space-between"}}>
        <Box sx={{textAlign:"left", color:"white", paddingLeft:"40px",paddingBottom:"20px", fontSize:"2em", fontWeight:"Bold", textShadow:"2px 2px 2px gray"}}>
          "{userName}"님의 파도</Box>
        <Box sx={{width:"170px", height:"30px", display:"flex", flexDirection:"row", justifyContent: "space-between", alignItems: "center", padding:"10px", marginRight:"40px", backgroundColor:"#F2E0C9",borderRadius: "30px",boxShadow: 3}}>
          {hoverData[0]?
          (<Box sx={{fontWeight:"bold", color:"#0F8DBF", paddingLeft:"10px"}}>{hoverData[0]}: {hoverData[1]}번</Box>):
          (<div></div>)}
          <Box component="img" 
          sx={{width:"30px", height:"30px", justifyContent:"center",alignContent: "center",borderRadius:"2em", backgroundColor: waveToggle?"DarkBlue":"White", 
          "&:hover": {
            transform: "scale(1.3)"
          },}} 
          src={require('@static/images/waveIcon.png')} onClick={()=>{setWaveToggle(!waveToggle)}}/>
        </Box>
      </Box>
      <Box sx={{display:"flex",justifyContent:"center",
      alignContent: "center"}}>
        <Box component="ul" sx={{display:"flex", flexDirection:"column", listStyleType: "none", textAlign:"center", padding: "0px", margin:"0px", paddingRight:"10px", justifyContent: "center", alignItems: "center"}} >
          <DayList>SUN</DayList>
          <DayList>MON</DayList>
          <DayList>TUE</DayList>
          <DayList>WED</DayList>
          <DayList>THU</DayList>
          <DayList>FRI</DayList>
          <DayList>SAT</DayList>
        </Box>
        <Box sx={{display: "flex",}}>
        {[...Array(10)].map((_, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex",flexDirection:"column"}}>
            {[...Array(7)].map((_, colIndex) => {
              const index = rowIndex*7 + colIndex;
              let item:wave={ date: '', count: 0 };
              Array.from(userWaveForm).map(([date, count], mapIndex) => {
                if (mapIndex === index) item = { date, count };
              });
              return (
                <div key={`${colIndex}-${rowIndex}`} style={{ width: "100%"}} onClick={()=>{hoverData[2]==index?setHoverData(["", 0, 70]):setHoverData([item.date,item.count,index])}}>
                  {item.date ? (
                    <WaveBox date={item.date} count={item.count} toggle={waveToggle} isClicked={isClicked(index)}/>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
        </Box>
      </Box>
    </Box>
  )
}

export default observer(Wave)