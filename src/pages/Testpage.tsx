import { useRootStore } from '@provider/rootContext';
import { HoverDataForm } from '@store/UserStore';
import { styled } from '@mui/system';
import instance from '@service/axiosInterceptor'
import React, { useState } from 'react'

const Testpage = () => {
  const value = useRootStore();
  const [leftOp, setLeftOp]= useState<number>(1);
  const lotteryUrl :string = "/lottery/daily"

  const [isHover, setIsHover]= useState<Boolean>(false);

  const [hoverData, setHoverData]= useState<HoverDataForm>();


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
  return (
    <div>
      Testpage
      <button onClick={()=>{patchLottery(); getLottery();}}>추첨</button>
      <div>남은횟수는 {leftOp}</div>

      <div onMouseOver={()=>{value?.userStore.getHoverData("투클린워터",setHoverData); setIsHover(true)}} onMouseOut={()=>{setIsHover(false)}} >호버해보기</div>
      {isHover?<div>{hoverData?.nickname}</div>:<div></div>}
    </div>
  )
}

export default Testpage