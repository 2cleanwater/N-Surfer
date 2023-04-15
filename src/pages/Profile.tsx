import Wave from '@components/Wave';
import UserProfile from '@components/UserProfile';
import { useRootStore } from '@provider/rootContext';
import EditProfile from '@components/UserProfileEditable';
import { UserDataForm } from '@store/ProfileStore';
import { OceanData } from '@store/OceanStore';
import instance from '@service/axiosInterceptor';
import CardMini from '@components/CardMini';
import Loading from '@components/Loading';

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
        'Content-Type': 'application/json; charset=UTF-8',
      }})
      .then((res)=>{
        setUserData(res.data as UserDataForm)
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  // sever data =============================================
  // useEffect(()=>{
  //   getUserData(nickname);
  // },[searchParams, isEditing]);
  useEffect(()=>{
    getUserData(nickname);
  },[]);


  useEffect(()=>{
    value.oceanStore.getOceanList({numOfCards:3,nickname:nickname, setValue:setUserOceanList});
  },[searchParams])

  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyItems:"center", alignItems:"center"}}>
      {userData.nickname?
      <Box sx={{position:"relative", justifyItems:"center", alignItems:"center", display:"flex", flexDirection:"column",}}>
        {nickname===value.profileStore.userData.nickname&&
        <Tooltip title={<div style={{fontSize:"15px"}}>설정</div>}>
          <IconButton size="medium" onClick={()=>{setIsEditing(!isEditing)}} sx={settingButton} >
            <SettingsIcon fontSize="medium" />
          </IconButton>
        </Tooltip>}
        {isEditing?
        (<EditProfile userData={userData} setIsEditing={setIsEditing} getUserData={getUserData}/>):
        (<UserProfile userData={userData}/>)}
      </Box>:
      <Box sx={{ width: "60em", height: "30em", m:"1em" ,boxShadow: 3, borderRadius:"2em", alignItems:"center", justifyItems:"center",display:"flex", flexDirection:"row", bgcolor:"#F5F5F7"}}>
        <Loading/>
      </Box>
      }

      <Wave nickname={nickname}/>

      <Box sx={{ minWidth:"55em", display:"flex", flexDirection:"row", justifyContent:"right" }}>
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

      {value.oceanStore.isOceanListLoading?
      <Box sx={{width:"100%"}}><Loading/></Box>:
      <>{userOceanList.length<=0?
        <Box sx={{display:'flex', flexDirection:"column", justifyContent: "center", alignItems: "center",my:"2em",height:"10em"}}>
          <Box sx={{fontSize:"40px", color:"#0F7B6C"}}>최근 작성된 파도가 없습니다!</Box>
          <Box sx={{fontSize:"25px", color:"#0F7B6C"}}>글을 작성하여 파도를 추가해보세요.</Box>
        </Box>:
        <Box sx={{display:'flex',justifyContent: "center", alignItems: "center",my:"6em"}}>
          {[...Array(3)].map((_, index) => {return (<div key={index}>{userOceanList[index]&&<CardMini OceanData={userOceanList[index]}/>}</div>)})}
        </Box>
      }</>}
    </Box>
  )
}

export default Profile;