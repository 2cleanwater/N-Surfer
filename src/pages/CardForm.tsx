import CardDetailAdd from '@components/cardDetail/CardDetailAdd'

import { observer } from 'mobx-react'

import { Box } from '@mui/material'


const CardForm = () => {
  return (
    <Box sx={{alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center", textAlign:"center", display:"flex"}}>
      <CardDetailAdd/>
    </Box>
  )
}

export default observer(CardForm)