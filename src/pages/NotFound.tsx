import Navbar from '@components/utils/Navbar'
import NotFoundComponent from '@components/utils/NotFoundComponent'

import { observer } from 'mobx-react'

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

export default observer(NotFound)