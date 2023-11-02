import { useRootStore } from '@provider/rootContext';
import { HoverDataForm } from '@store/UserStore';
import { styled } from '@mui/system';
import instance from '@service/axiosInterceptor'
import React, { useEffect, useState } from 'react'
import { Box, Popover } from '@mui/material';
import Swal from 'sweetalert2'

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
      <button onClick={()=>{Swal.fire({
  title: '로그아웃하시겠어요?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Please'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      '로그아웃!',
      '안전 로그아웃 했습니다.',
      'success'
    )
  }
})}}>요!</button>
    </div>
  )
}

export default Testpage