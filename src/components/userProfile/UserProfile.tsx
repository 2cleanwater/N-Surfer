import React, { useState } from 'react'
import { Box } from '@mui/material';

import { observer } from 'mobx-react';

import { useRootStore } from '../../provider/rootContext';

const UserProfile = () => {
  const value = useRootStore()!;
  let userData = value.profileStore.userData;

  const [isEditing, setIsEditing] = useState(false);

  let userImg: string;
  if(userData.imgUrl){
    userImg = userData.imgUrl;
  }else{
    userImg= '/images/profile_logo.jpg';
  }

  return (
    <Box sx={{border:"solid 1px", width: 300, height: 450, boxShadow: 3, m:2, p:1, borderRadius:"0.5em", alignContent:"center"}}>
        <Box sx={{ objectFit: "cover", borderRadius:"100%", width:"200px", }} component="img" src={userImg} alt='UserImage' />
        {isEditing&&<input type="file" name="profileImg" accept='image/*'/>}
        <Box component="ul">
          <li>회원 이름 : {isEditing?(<input></input>):(userData.userName)}</li>
          <li>회원 가입 경로 : {userData.provider}</li>
          <li>회원 이메일 : {userData.userEmail}</li>
          <li>생년월일 : {isEditing?(<input></input>):(userData.userBirth||"없음")}</li>
        </Box>
        {isEditing?
          (<Box>
            <button onClick={()=>{setIsEditing(!isEditing)}}>취소하기</button>
            <button>저장하기</button>
          </Box>):
          (<Box>
            <button onClick={()=>{setIsEditing(!isEditing)}}>수정하기</button>
            <button>탈퇴하기</button>
          </Box>)
        }    
    </Box>
  )
}

export default observer(UserProfile)