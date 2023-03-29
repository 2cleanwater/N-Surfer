import CardDetailAdd from '@/components/CardDetailAdd'
import { Box } from '@mui/material'

const CardForm = () => {
  return (
    <Box sx={{alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center", textAlign:"center", display:"flex"}}>
      <CardDetailAdd/>
    </Box>
  )
}

export default CardForm