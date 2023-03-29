import Wave from '@/components/Wave';
import UserProfile from '@/components/UserProfile';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { useRootStore } from '@/provider/rootContext';
import EditProfile from '@/components/UserProfileEditable';
import CardMini from '@/components/CardMini';

import ListIcon from '@mui/icons-material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { OceanData } from '@/store/OceanStore';
import instance from '@/service/axiosInterceptor';

// 추가버튼 css
const addButton= {
  "&:hover":{
    color: "#Black",
    transform: "scale(1.1)",
    cursor : "pointer"
  },
  color: "#Black",
  position: "absolute",
  top:"0%",
  right:"10%"
}

// 리스트 css
const listButton= {
  "&:hover":{
    color: "#Black",
    transform: "scale(1.1)",
    cursor : "pointer"
  },
  color: "Black",
  position: "absolute",
  top:"0%",
  right:"5%"
}

const Profile = () => {
  const value = useRootStore()!;
  const [searchParams, setSearchParams] = useSearchParams();
  const userName:string = searchParams.get("userName")!;
  const navigate = useNavigate();
  const [userOceanList, setUserOceanList] = useState<Array<OceanData>>([]);

  // 개인 카드 리스트 가져오는 함수
  // ocean list 받아오기
  const getOceanList= async function(){
    const oceanListUrl = `/card?userName=${userName}`;
    await instance({
      method: "GET",
      url: oceanListUrl,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      setUserOceanList(res.data.cardList as Array<OceanData>|| [])
    })
    .catch((err)=>{
      console.log(err);
      window.alert("Ocean List의 정보를 가져올 수 없습니다.");
    })
  }

  // sever data =============================================
  useEffect(()=>{
    getOceanList();
  },[])
  
  // Test data ================================================
  // useEffect(()=>{
  //   setOceanList(require("@test/oceanData.json") as Array<OceanData>);
  // },[]);

  const index = userOceanList.length;
  
  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyItems:"center", alignItems:"center"}}>
      {userName===value.profileStore.userData.userName?
      (<EditProfile/>):
      (<UserProfile userName={userName}/>)}
      <Wave userName={userName}/>
      <Box sx={{display:'flex', minWidth:"894px",minHeight:"408",justifyContent: "center", alignItems: "center", padding:"30px", position:"relative"}}>
        {index>1&&<CardMini OceanData={userOceanList[index-1]}/>}
        {index>2&&<CardMini OceanData={userOceanList[index-2]}/>}
        {index>3&&<CardMini OceanData={userOceanList[index-3]}/>}
        {userName===value.profileStore.userData.userName&&<IconButton size="medium" onClick={()=>{navigate(`/cardForm`)}} sx={addButton} >
          <AddCircleOutlineIcon fontSize="medium" />
        </IconButton>}
        <IconButton size="medium" onClick={()=>{navigate(`/card/list/?userName=${userName}`)}} sx={listButton} >
          <ListIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Profile;