import React from 'react'
import { Box } from '@mui/material';

import { observer } from 'mobx-react';

import { useRootStore } from '../provider/rootContext';

const UserProfile = () => {

  const value = useRootStore()!;
  let userData = value.authStore.userData;

  return (
    <Box sx={{border:"solid 1px", width: 300, height: 400, boxShadow: 3, m:2, p:1, borderRadius:"0.5em",}}>
        <Box sx={{width:400, height:400, objectFit: "cover", borderRadius:"100%" }} component="img" src={userData.imgURL} alt='UserImage' />
        <div>
          <button>이미지 수정하기</button>
          <button>탈퇴하기</button>
        </div>
        <div>
          HI~ this is {userData.userName}
        </div>
    </Box>
  )
}

export default observer(UserProfile)