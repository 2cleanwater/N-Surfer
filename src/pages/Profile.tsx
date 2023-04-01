import Wave from '@/components/Wave';
import UserProfile from '@/components/UserProfile';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { useRootStore } from '@/provider/rootContext';
import EditProfile from '@/components/UserProfileEditable';
import CardMini from '@/components/CardMini';
import { UserDataForm } from '@/store/ProfileStore';

import ListIcon from '@mui/icons-material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { OceanData } from '@/store/OceanStore';
import instance from '@/service/axiosInterceptor';

import SettingsIcon from '@mui/icons-material/Settings';

const Profile = () => {
  const value = useRootStore()!;
  const [searchParams, setSearchParams] = useSearchParams();
  const nickname:string = searchParams.get("nickname")!;
  const navigate = useNavigate();
  const [userOceanList, setUserOceanList] = useState<Array<OceanData>>([]);

  const [userData, setUserData]= useState<UserDataForm|null>(null);

  const [isEditing, setIsEditing] = useState(false);

  // 추가버튼 css
  const addButton= {
    "&:hover":{
      color: "#Black",
      transform: "scale(1.1)",
      cursor : "pointer"
    },
    color: "#Black",
  }

  // 리스트 css
  const listButton= {
    "&:hover":{
      color: "#Black",
      transform: "scale(1.1)",
      cursor : "pointer"
    },
    color: "Black",
  }

  //설정 버튼 css
  const settingButton= {
    "&:hover":{
      "@keyframes rotate": {
        "100%": {
          transform: "rotate(180deg)"
        }
      },
      animation: "rotate 1s infinite",
      cursor : "pointer"
    },
    animation: isEditing?"rotate 1s infinite":"",
    color:"black",
    position: "absolute",
    top:"6%",
    right:"4%",
    zIndex:"1000"
  }

  // userData 받아오기 ==================================================
  const getUserData= async function(){
    const profileUrl = `/user/profile?nickname=${nickname}`;
    await instance({
      method: "GET",
      url: profileUrl,
      headers:{
        'Content-Type': 'application/json'
      }})
      .then((res)=>{
        setUserData(res.data as UserDataForm)
      })
      .catch((err)=>{
        console.log(err);
        window.alert(nickname + "의 정보를 가져올 수 없습니다.");
      })
  }

  // ocean list 받아오기
  const getOceanList= async function(){
    const oceanListUrl = `/card?nickname=${nickname}&numOfCards=3`;
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
    getUserData();
    getOceanList();
    setIsEditing(false);
  },[searchParams])
  
  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyItems:"center", alignItems:"center"}}>
      {userData&&<Box sx={{position:"relative", justifyItems:"center", alignItems:"center", display:"flex", flexDirection:"column",}}>
        {nickname===value.profileStore.userData.nickname&&
        <IconButton size="medium" onClick={()=>{setIsEditing(!isEditing)}} sx={settingButton} >
          <SettingsIcon fontSize="medium" />
        </IconButton>}
        {nickname===value.profileStore.userData.nickname&&isEditing?
        (<EditProfile userData={userData}/>):
        (<UserProfile userData={userData}/>)}
      </Box>}

      <Wave nickname={nickname}/>

      <Box sx={{ minWidth:"894px", display:"flex", flexDirection:"row", justifyContent:"right" }}>
        {nickname===value.profileStore.userData.nickname&&<IconButton size="large" onClick={()=>{navigate(`/cardForm`)}} sx={addButton} >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>}
        <IconButton size="large" onClick={()=>{navigate(`/card?nickname=${nickname}`)}} sx={listButton} >
          <ListIcon fontSize="large" />
        </IconButton>
      </Box>

      {userOceanList&&<Box sx={{display:'flex', minWidth:"894px",minHeight:"408",justifyContent: "center", alignItems: "center", p:"30px", mt:"50px"}}>
        {/* {[...Array(3)].map((_, index) => {return (<CardMini key={index} OceanData={userOceanList[index]}/>)})}       */}
      </Box>}
    </Box>
  )
}

export default Profile;