import Navbar from '@/components/Navbar'
import NotFoundComponent from '@/components/NotFoundComponent'
import { Box } from '@mui/material'

function NotFound() {
  return (
    <>
      <Box sx={{paddingBottom:"200px"}}>
        <Navbar />
      </Box>
      <NotFoundComponent/>
    </>
    
  )
}

export default NotFound