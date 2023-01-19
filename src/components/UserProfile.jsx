import React from 'react'
import { Box } from '@mui/material';

import useStore from '../store/useStore';
import { observer } from 'mobx-react';

import { useRootStore } from '../provider/rootContext';


const UserProfile = () => {

  // const {value} = useStore();
  const value = useRootStore();
  let userData = value.authStore.user[0];

  return (
    <Box sx={{}}>
        <Box sx={{width:400, height:400, objectFit: "cover", borderRadius:"100%" }} component="img" src={userData['imgURL']} alt='UserImage' />
        <div>
          <button>이미지 수정하기</button>
          <button>탈퇴하기</button>
        </div>
        <div>
          HI~ this is {userData['userName']}
        </div>
    </Box>
  )
}

export default observer(UserProfile)