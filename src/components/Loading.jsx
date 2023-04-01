import { Box } from '@mui/material'

const Loading = () => {
  return (
    <Box component="img" sx={{position:"relative", width:"100%"}} src={require('@images/loading.gif')}>
    </Box>
  )
}

export default Loading