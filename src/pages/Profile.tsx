import Wave from '@components/Wave';
import UserProfile from '@components/UserProfile';
import { useRootStore } from '@provider/rootContext';
import EditProfile from '@components/UserProfileEditable';
import { UserDataForm } from '@store/ProfileStore';
import { OceanData } from '@store/OceanStore';
import instance from '@service/axiosInterceptor';
import CardMini from '@components/CardMini';

import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Box, IconButton, Tooltip } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';


const Profile = () => {
  const value = useRootStore()!;
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const nickname:string = searchParams.get("nickname")||"";
  const [userOceanList, setUserOceanList] = useState<Array<OceanData>>([]);
  const [userData, setUserData]= useState<UserDataForm>({} as UserDataForm);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
  const getUserData= async function(getByNickName:string){
    const profileUrl = `/user/profile?nickname=${getByNickName}`;
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
    getUserData(nickname);
  },[searchParams]);

  useEffect(()=>{
    getOceanList();
  },[searchParams])

  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyItems:"center", alignItems:"center"}}>
      {userData.nickname&&<Box sx={{position:"relative", justifyItems:"center", alignItems:"center", display:"flex", flexDirection:"column",}}>
        {nickname===value.profileStore.userData.nickname&&
        <Tooltip title={<div style={{fontSize:"15px"}}>설정</div>}>
          <IconButton size="medium" onClick={()=>{setIsEditing(!isEditing)}} sx={settingButton} >
            <SettingsIcon fontSize="medium" />
          </IconButton>
        </Tooltip>}
        {isEditing?
        (<EditProfile userData={userData} setIsEditing={setIsEditing} getUserData={getUserData}/>):
        (<UserProfile userData={userData}/>)}
      </Box>}

      <Wave nickname={nickname}/>

      <Box sx={{ minWidth:"894px", display:"flex", flexDirection:"row", justifyContent:"right" }}>
        {nickname===value.profileStore.userData.nickname&&
        <Tooltip title={<div style={{fontSize:"15px"}}>내 파도추가</div>}>
          <IconButton size="large" onClick={()=>{navigate(`/cardForm`)}} sx={addButton} >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        }
        <Tooltip title={<div style={{fontSize:"15px"}}>내 파도목록</div>}>
          <IconButton size="large" onClick={()=>{navigate(`/card?nickname=${nickname}`)}} sx={listButton} >
            <ListIcon fontSize="large" />
          </IconButton>
        </Tooltip>        
      </Box>

      {userOceanList.length>0&&<Box sx={{display:'flex', minWidth:"894px",minHeight:"408",justifyContent: "center", alignItems: "center", p:"30px", mt:"50px"}}>
        {[...Array(3)].map((_, index) => {return (<div>{userOceanList[index]&&<CardMini key={index} OceanData={userOceanList[index]}/>}</div>)})}      
      </Box>}
    </Box>
  )
}

export default Profile;