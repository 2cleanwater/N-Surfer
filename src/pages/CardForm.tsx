import CardDetailAdd from '@components/cardDetail/CardDetailAdd'

import { observer } from 'mobx-react'

import { Box } from '@mui/material'


const CardForm = () => {
  return (
    <Box sx={{ width:"92%", margin:"auto", alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center", textAlign:"center", display:"flex"}}>
      <Box sx={{display:"flex", flexDirection:"column", width:"100%"}}>
        <CardDetailAdd/>
      </Box>
    </Box>
  )
}

export default observer(CardForm)