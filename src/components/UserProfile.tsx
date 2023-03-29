import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material';
import instance from '@/service/axiosInterceptor';
import InteractiveWave from '@components/InteractiveWave'
import { UserDataForm } from '@/store/ProfileStore';

const UserProfile = ({userName}:{userName:string}) => {

  const [userImgSrc, setUserImgSrc] = useState<string>("");
  const baseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;
  const [userData, setUserData]= useState<UserDataForm>();

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
  // server Data ==================================
  // getUserData();

  // Test data ================================================
  useEffect(()=>{
    setUserData(require("@test/userData.json")[1] as UserDataForm);
  },[]);

  // 이미지 url이 없으면 기본 이미지 =====================================
  useEffect(()=>{
    userData?.imgUrl?setUserImgSrc(userData.imgUrl):setUserImgSrc(baseImg);
  },[])

  return (
    <Box sx={{ width: "900px", height: "450px", margin:"10px" ,boxShadow: 3, borderRadius:"2em", alignItems:"center", justifyContent:"center",display:"flex", flexDirection:"row", backgroundColor:"#F5F5F7"}}>

      <Box component="img" src={userImgSrc} alt='UserImage' 
      sx={{ objectFit: "cover", objectPosition:"center" ,borderRadius:"50%", width:"200px", height:"200px", overflow: "hidden", padding:"3%"}}  />
      
      <Box sx={{paddingRight:"3%", paddingLeft:"3%"}}>
        <Box sx={{display:"flex", flexDirection:"row"}}>
          <Box component="ul" sx={{listStyle:"none", padding:"0",paddingRight:"20px", fontWeight:"bold", fontSize:"20px", color:"gray"}}>
            <Box sx={{margin:"20px"}}>이름 : </Box>
            <Box sx={{margin:"20px"}}>가입 경로 : </Box>
            <Box sx={{margin:"20px"}}>이메일 : </Box>
          </Box>
          <Box component="ul" sx={{listStyle:"none", padding:"0", fontWeight:"bold", fontSize:"20px",}}>
            <Box sx={{margin:"20px"}}>{userData?.userName}</Box>
            <Box sx={{margin:"20px"}}>{userData?.provider}</Box>
            <Box sx={{margin:"20px"}}>{userData?.userEmail}</Box>
          </Box>
        </Box>

        <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", }}>
          <Box sx={{textAlign:"center",width:"220px", height:"130px", marginRight:"50px", boxShadow: 3, borderRadius:"1em", backgroundColor:"#FFFCBF", position:"relative", justifyItems:"center", alignItems:"center"}}>
            <Box sx={{}}>
              <InteractiveWave width={220} height={130} color="#FFFCBF"/>
            </Box>
            <Box sx={{position:"absolute", display:"flex",flexDirection:"column",top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <Box sx={{fontSize:"20px", fontWeight:"bold",color:"#F88C65", textShadow:"1px 1px orange"}}>오늘의 파도</Box>
              <Box sx={{fontSize:"40px", fontWeight:"bolder",color:"White", textShadow:" 1px 1px 1px blue"}}>0</Box>
            </Box>
          </Box>
          <Box sx={{textAlign:"center",width:"220px", height:"130px", boxShadow: 3, borderRadius:"1em", backgroundColor:"#FFFCBF", position:"relative", justifyItems:"center", alignItems:"center"}}>
            <Box sx={{}}>
              <InteractiveWave width={220} height={130} color="#FFFCBF"/>
            </Box>
            <Box sx={{position:"absolute", display:"flex",flexDirection:"column",top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <Box sx={{fontSize:"20px", fontWeight:"bold",color:"green",textShadow:"1px 1px gray"}}>모든 파도</Box>
              <Box sx={{fontSize:"40px", fontWeight:"bolder",color:"White", textShadow:" 1px 1px 1px blue"}}>0</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default UserProfile