import { useRootStore } from '@provider/rootContext';
import { HoverDataForm } from '@store/UserStore';
import { styled } from '@mui/system';
import instance from '@service/axiosInterceptor'
import React, { useEffect, useState } from 'react'
import { Box, Popover } from '@mui/material';

const Testpage = () => {
  const value = useRootStore();
  const [leftOp, setLeftOp]= useState<number>(1);
  const lotteryUrl :string = "/lottery/daily"

  const [isHover, setIsHover]= useState<Boolean>(false);

  const [hoverData, setHoverData]= useState<HoverDataForm>();

  /** 팝업박스 */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //==================


  const getLottery = async ()=>{
    await instance({
      method:"GET",
      url: lotteryUrl,
      headers:{
        'Content-Type': 'application/json'
      }})
      .then((res)=>{
        setLeftOp(res.data.opportunities);
      })
    }
    const patchLottery = async ()=>{
      await instance({
        method:"PATCH",
        url: lotteryUrl,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          console.log(res.data)
        })
      }


  // 서버시간 
  const [serverOn, setServerOn]= useState<Boolean>(false);

  useEffect(()=>{
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 10 && currentHour <= 24) {
      setServerOn(true);
    }

    const intervalId = setInterval(()=>{
      const newTime = new Date();
      const newHour = newTime.getHours();
      if (newHour >= 10 && newHour <= 24) {
        setServerOn(true);
      }
      else{
        setServerOn(false);
      }
    }, 60000);
    return ()=>{
      clearInterval(intervalId);
    }
  },[]);
  
  return (
    <div>
      Testpage
      <button onClick={()=>{patchLottery(); getLottery();}}>추첨</button>
      <div>남은횟수는 {leftOp}</div>
      <div 
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        여기에 호버
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box sx={{display:"flex", alignItems:"center", px:"1em", py:"0.5em"}}>
          <Box component="img" sx={{width: "4em", height: "4em", objectFit:"cover",objectPosition:"center" ,borderRadius: "50%"}} src={"https://res.cloudinary.com/nsurfer/image/upload/v1683618081/chopchop.png"} alt="profile"/>
          <Box sx={{display:"flex", flexDirection:"column", pl:"1em"}}>
            <Box sx={{textAlign:"center", fontSize: "1.2em",fontWeight: "bold"}}>투클린워터</Box>
            <Box sx={{width:"100%", height:"2px", bgcolor:"#333", margin:"0.5em 0"}}></Box>
            <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
              <Box sx={{textAlign:"center", width:"3em",pr:"1em"}}>전체<br/>파도수</Box>
              <Box sx={{fontSize:"2em", fontWeight:"bold", color:"#0099cc"}}>10</Box>
            </Box>
          </Box>
        </Box>
      </Popover>
      <div onMouseOver={()=>{value?.userStore.getHoverData("투클린워터",setHoverData); setIsHover(true)}} onMouseOut={()=>{setIsHover(false)}} >호버해보기</div>
      {isHover?<div>{hoverData?.nickname}</div>:<div></div>}

      


      <div>
        {serverOn?"🟢Online":"🔴Offline"}</div>
      <div>(서버시간 10:00 ~ 24:00)</div>

    </div>
  )
}

export default Testpage