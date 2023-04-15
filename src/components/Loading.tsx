import { Box } from '@mui/material'

const Loading = () => {
  const loading:string= process.env.REACT_APP_LOADING!;
  return (
    <Box sx={{width:"100%",display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <Box component="img" sx={{position:"relative", width:"40%"}} src={loading}/>
    </Box>
  )
}

export default Loading