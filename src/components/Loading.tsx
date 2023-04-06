import { Box } from '@mui/material'

const Loading = () => {
  const loading:string= process.env.REACT_APP_LOADING!;
  return (
    <Box component="img" sx={{position:"relative", width:"100%"}} src={loading}/>
  )
}

export default Loading