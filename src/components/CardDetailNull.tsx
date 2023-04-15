import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useRootStore } from '@provider/rootContext';

import { Box, Button } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply';

const CardDetailNull = () => {
  const value = useRootStore();
  // 로딩이 끝나면 모달 닫기
  useEffect(()=>{
    !value?.oceanStore.isOceanLoading&&value?.modalStore.closeModal();
  },[value?.oceanStore.isOceanLoading])
  const navigate = useNavigate();
  return (
    <Box sx={{bgcolor:"waveBackground", width:"57em", height:"25em", alignItems:"center",borderRadius:"2em", p:"0.5em", mb:"3em",boxShadow: "5", display:"flex", flexDirection:"column", justifyContent:"center"}}>
      <Box sx={{fontSize:"40px", fontWeight:"bold", color:"white", m:"1em"}}>이 파도는 존재하지 않습니다!</Box>
      <Button sx={{bgcolor:"#2158A8", width:"10em", height:"3em", m:"1em",color:"white", fontSize:"20px", fontWeight:"bold",borderRadius:"1em", "&:hover":{bgcolor:"#1C496D"}}} onClick={()=>navigate("/card")}>
        <ReplyIcon fontSize="medium" sx={{mr:"0.5em"}}/> 파도 목록
      </Button>
    </Box>
  )
}

export default CardDetailNull