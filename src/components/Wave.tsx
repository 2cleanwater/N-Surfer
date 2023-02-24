import { Box } from '@mui/material';
import { observer } from 'mobx-react'

import { useRootStore } from '@provider/rootContext';

//테스트 파일
// import testJson from '@'

const Wave = () => {
  const value = useRootStore()!;

  // 기능 완료시 변경
  // const waveList = value.profileStore.userData.waveList;

  // const waveList = 

  return (
    <Box sx={{border:"solid 1px", width: "800px", height: "300px", margin:"2em"}}>
      파도루
    </Box>
  )
}

export default observer(Wave)