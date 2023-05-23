import InteractiveWave from '@components/utils/InteractiveWave'
import { UserDataForm } from '@store/ProfileStore';
import { useRootStore } from '@provider/rootContext';

import  { useEffect, useState } from 'react'
import { observer } from 'mobx-react';

import { Box } from '@mui/material';


const UserProfile = ({userData}:{userData:UserDataForm}) => {
  const value = useRootStore()!;
  const [userImgSrc, setUserImgSrc] = useState<string>(userData.imgUrl||"");
  const baseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;

  // 이미지 url이 없으면 기본 이미지 =====================================
  useEffect(()=>{
    userData.imgUrl?setUserImgSrc(userData.imgUrl):setUserImgSrc(baseImg);
  },[userData])

  // 로딩이 끝나면 모달 닫기
  useEffect(()=>{
    !value?.profileStore.isUserDataLoading&&value?.modalStore.closeModal();
  },[value?.profileStore.isUserDataLoading])

  return (
    <Box sx={{ width: "60em", height: "30em", m:"1em" ,boxShadow: 3, borderRadius:"2em", alignItems:"center", justifyContent:"center",display:"flex", flexDirection:"row", bgcolor:"#F5F5F7"}}>

      <Box component="img" src={userImgSrc} alt='UserImage' 
      sx={{ objectFit: "cover", objectPosition:"center" ,borderRadius:"50%", width:"18em", height:"18em", overflow: "hidden", m:"4%"}}  />
      
      <Box sx={{px:"3%"}}>
        <Box sx={{display:"flex", flexDirection:"row"}}>
          <Box component="ul" sx={{listStyle:"none", p:"0",pr:"1em", fontWeight:"bold", fontSize:"20px", color:"gray"}}>
            <Box sx={{m:"1em"}}>이름 : </Box>
            <Box sx={{m:"1em"}}>가입 경로 : </Box>
            <Box sx={{m:"1em"}}>이메일 : </Box>
          </Box>
          <Box component="ul" sx={{listStyle:"none", p:"0", fontWeight:"bold", fontSize:"20px",}}>
            <Box sx={{m:"1em",textShadow:"0px 0px 2px gray"}}>{userData?.nickname}</Box>
            <Box sx={{m:"1em", 
              textShadow:"0px 0px 2px black", 
              color:userData.provider==="KAKAO"?"#f9e000":
              userData.provider==="NAVER"?"#2DB400":
              userData.provider==="GOOGLE"?"#4285F4":
              userData.provider==="GITHUB"?"#292727":""}}>{userData?.provider}</Box>
            <Box sx={{m:"1em",textShadow:"0px 0px 2px gray"}}>{userData?.userEmail}</Box>
          </Box>
        </Box>

        <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", }}>
          <Box sx={{textAlign:"center",width:"13.6em", height:"8.1em", mr:"3em", boxShadow: 3, borderRadius:"1em", bgcolor:"#FFFCBF", position:"relative", justifyItems:"center", alignItems:"center"}}>
            <Box sx={{}}>
              <InteractiveWave width={220} height={130} color="#FFFCBF" percent={2.5}/>
            </Box>
            <Box sx={{position:"absolute", display:"flex",flexDirection:"column",top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <Box sx={{fontSize:"20px", fontWeight:"bold",color:"#F88C65", textShadow:"1px 1px orange"}}>오늘의 파도</Box>
              <Box sx={{fontSize:"40px", fontWeight:"bolder",color:"White", textShadow:" 1px 1px 1px blue"}}>{userData?.todayWave}</Box>
            </Box>
          </Box>
          <Box sx={{textAlign:"center",width:"13.6em", height:"8.1em", boxShadow: 3, borderRadius:"1em", bgcolor:"#FFFCBF", position:"relative", justifyItems:"center", alignItems:"center"}}>
            <Box sx={{}}>
              <InteractiveWave width={220} height={130} color="#FFFCBF" percent={2.5}/>
            </Box>
            <Box sx={{position:"absolute", display:"flex",flexDirection:"column",top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <Box sx={{fontSize:"20px", fontWeight:"bold",color:"green",textShadow:"1px 1px gray"}}>모든 파도</Box>
              <Box sx={{fontSize:"40px", fontWeight:"bolder",color:"White", textShadow:" 1px 1px 1px blue"}}>{userData?.totalWave}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default observer(UserProfile)