import Navbar from '@components/Navbar'
import NotFoundComponent from '@components/NotFoundComponent'

import { Box } from '@mui/material'

function NotFound() {
  return (
    <Box sx={{overflow: "hidden", height: "100%",width:"100%"}}>
      <Box sx={{pb:"10em"}}>
        <Navbar />
      </Box>
      <Box sx={{position: "fixed", }}>
        <NotFoundComponent/>
      </Box>
    </Box>
  )
}

export default NotFound