import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import { useRootStore } from '@provider/rootContext';
import { useNavigate } from 'react-router-dom';
import instance from '@/service/axiosInterceptor';
import { UserData } from '@/store/ProfileStore';

const UserProfile = ({userName}:{userName:string}) => {

  const [userImgSrc, setUserImgSrc] = useState<string>("");

  const baseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;

  // userData 받아오기 ==================================================
  const getUserData= async function(){
    const profileUrl = `/user/profile?userName=${userName}`;
    await instance({
      method: "GET",
      url: profileUrl,
      headers:{
        'Content-Type': 'application/json'
      }})
      .then((res)=>{
        return res.data;
      })
      .catch((err)=>{
        console.log(err);
        window.alert(userName + "의 정보를 가져올 수 없습니다.");
      })
  }
  // const userData = getUserData() as UserData;

  // Test data ================================================
  const userData = require("@test/userData.json")[1]; 

  // 이미지 url이 없으면 기본 이미지 =====================================
  // userData.imgUrl?setUserImgSrc(userData.imgUrl):setUserImgSrc(baseImg);
  useEffect(()=>{
    userData.imgUrl?setUserImgSrc(userData.imgUrl):setUserImgSrc(baseImg);
  },[])

  console.log(userData.userName)
  return (
    <Box sx={{border:"solid 1px", width: 300, height: 450, boxShadow: 3, m:2, p:1, borderRadius:"0.5em", alignContent:"center"}}>
        <Box component="img" src={userImgSrc} alt='UserImage' 
        sx={{ objectFit: "cover", objectPosition:"center" ,borderRadius:"50%", width:"200px", height:"200px", overflow: "hidden"}}  />
        <Box>
          <Box component="ul">
            <li>회원 이름 : {userData.userName}</li>
            <li>회원 가입 경로 : {userData.provider}</li>
            <li>회원 이메일 : {userData.userEmail}</li>
            <li>생년월일 : {(userData.userBirth||"없음")}</li>
          </Box>
        </Box>
        <Box component="link" ></Box>
    </Box>
  )
}

export default UserProfile