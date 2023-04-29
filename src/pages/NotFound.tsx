import Navbar from '@components/utils/Navbar'
import NotFoundComponent from '@components/utils/NotFoundComponent'

import { observer } from 'mobx-react'

import { Box, Button } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate= useNavigate();
  return (
    <Box sx={{overflow: "hidden", height: "100%",width:"100%", position:"relative"}}>
      <Box sx={{position: "fixed",top:"25em" }}>
        <NotFoundComponent/>
      </Box>
      <Button sx={{bgcolor:"#2158A8", width:"10em", height:"3em", m:"1em",color:"white", zIndex:"10" ,fontSize:"20px", fontWeight:"bold",borderRadius:"1em", "&:hover":{bgcolor:"#1C496D"}}} onClick={()=>navigate("/card")}>
        <ReplyIcon fontSize="medium" sx={{mr:"0.5em",  zIndex:"10" }}/> 홈으로
      </Button>
    </Box>
  )
}

export default observer(NotFound)