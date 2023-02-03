import { Box } from '@mui/material';
import { observer } from 'mobx-react'

import { useRootStore } from '../../provider/rootContext';

const Wave = () => {
  const value = useRootStore()!;

  return (
    <Box sx={{border:"solid 1px", width: "450px", height: "200px"}}>
      파도루
    </Box>
  )
}

export default observer(Wave)