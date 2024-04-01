import { useRootStore } from '@provider/rootContext';

import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { Avatar, Badge, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Swal from 'sweetalert2';

const Navbar = ()=>{
  // store 및 service 선언
  const value = useRootStore()!;
  const isLogin = value.authStore.isLogin;
  const navigate = useNavigate();

  const [userImgSrc, setUserImgSrc] = useState<string | undefined>(undefined);

  const profileBaseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;
  const nSurferIcon:string= process.env.REACT_APP_NSURFERICON!;
  const githubFavicon:string= process.env.REACT_APP_GITHUBFAVICON!;
  const notionFavicon:string= process.env.REACT_APP_NOTIONFAVICON!;

  // 서버시간 
  const [serverOn, setServerOn]= useState<Boolean>(false);

  // 앱 동작시 accessToken 여부 확인 후 로그인
  useEffect(()=>{
    if(localStorage.getItem('accessToken')){
      // 토큰존재 => 프로필 받아옴 => authStore 로그인 변경
      value.profileStore.getMyUserData();
      value.authStore.setIsLogin();
    }else{
      // 유저 데이터 제거하지 않으면 이미지가 남은채로 리랜더링 됨
      value.profileStore.setMyUserData({});
      value.authStore.setIsLogout();
    }
  },[localStorage.getItem('accessToken')]);

  // 프로필 이미지 지정
  useEffect(()=>{
    const imgUrl = value.profileStore.userData.imgUrl;
    const defaultImg = profileBaseImg;
    setUserImgSrc(imgUrl || defaultImg);
  },[value.profileStore.userData.imgUrl])
  
  // Github 클릭 시 두 링크
  const handleLinksOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    window.open("https://github.com/JeongJuRyu/n-surfer-be", '_blank');
    window.open("https://github.com/2cleanwater/N-Surfer", '_blank');
  }

  // 로그아웃 체크 ===================================================
  // const logout = ()=>{
  //   if (window.confirm('로그아웃 하시겠습니까?')){
  //       value.authStore.logout(); 
  //       navigate("/");
  //   }else return}

  const logout = ()=>{
    Swal.fire({
      title: '로그아웃하시겠어요?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Please'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "잘가요! 다음에 또 만나요!",
          // text: "다음에 또 만나요! 안녕!",
          imageUrl: "https://res.cloudinary.com/nsurfer/image/upload/v1711561309/byecat_ff44et.png",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Custom image"
        });
        value.authStore.logout(); 
        navigate("/");
      }
    })}

  // 서버시간 체크
  useEffect(()=>{
    const currentTime = new Date();
    const currentDay = currentTime.getDay();
    const currentHour = currentTime.getHours();
    if (currentHour >= 10 && currentHour <= 18 && currentDay>=1 && currentDay<=5) {
      setServerOn(true);
    }

    const intervalId = setInterval(()=>{
      const newTime = new Date();
      const newDay = newTime.getDay();
      const newHour = newTime.getHours();
      if (newHour >= 10 && newHour <= 18 && newDay>=1 && newDay<=5) {
        setServerOn(true);
      }
      else{
        setServerOn(false);
      }
    }, 60000);
    return ()=>{
      clearInterval(intervalId);
    }
  },[]);

  //* 서랍 on/off 관련 state
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  //* 서랍 내용물

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box sx={{px:"0.5em",py:"0.1em", display:"flex",textAlign:"right", fontSize:"0.9em", justifyContent: "space-between", bgcolor:"#E2E2E2"}}>
        <div>
          {serverOn?"🟢 Online":"🔴 Offline"}
        </div>
        <div>(평일 10:00 ~ 18:00)</div>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding >
          <ListItemButton sx={{textAlign:"left", pl:"1.5em",}} component={Link} to='/card' >
            <ListItemText primaryTypographyProps={{fontSize: '1.2em'}}  primary="🌊 &nbsp; 파도 목록" />
          </ListItemButton>    
        </ListItem>

        {isLogin&&(
          <ListItem disablePadding >
            <ListItemButton sx={{textAlign:"left", pl:"1.5em",}} component={Link} to='/cardForm' >
              <ListItemText primaryTypographyProps={{fontSize: '1.2em'}}  primary="➕ &nbsp; 파도추가" />
            </ListItemButton>    
          </ListItem>
        )}

        <ListItem disablePadding >
          <ListItemButton sx={{textAlign:"left", pl:"1.5em",}} component={Link} to='/lottery/daily' >
            <ListItemText primaryTypographyProps={{fontSize: '1.2em', color:"#b81414"}}  primary="🌟 &nbsp; 행운 뽑기" />
          </ListItemButton>    
        </ListItem>
        <Box sx={{position: "fixed",bottom: 0, display:"flex",flexDirection:"column"}}>
          <Divider />
          <Box sx={{px:"1em"}}>
            <Box component="img" src={githubFavicon} onClick={(e)=>{handleLinksOpen(e)}} 
            sx={{width:"1.5em", height:"1.5em", m:"0.7em", "&:hover": {transform: "scale(1.1)",cursor:"pointer"}}}/>
            <Box component="img" src={notionFavicon}
            onClick={()=>{window.open('https://2cleanwater.notion.site/N-Surfer-0d2ae67e463b46dc96126f0044208100')}}
            sx={{width:"1.5em", height:"1.5em", m:"0.7em", "&:hover": {transform: "scale(1.1)",cursor:"pointer"}}}/>
          </Box>
          <Divider />
          {isLogin? 
              (<Button onClick={()=>{logout();}} variant="contained" color="error"
              sx={{fontSize:"1.3em", m:"1em", alignSelf:"center", fontWeight:"bolder", width:"10em","&:hover": {
                transform: "scale(1.1)"
              } }} >
                Logout</Button>) : 
              (<Button onClick={()=>{value.authStore.setIsLoginLoading(true); value.modalStore.openModal()}} variant="contained" color="success"
              sx={{fontSize:"1.3em", m:"1em", alignSelf:"center", fontWeight:"bolder", width:"10em","&:hover": {
                transform: "scale(1.1)"
              } }} >
                Login</Button>)
            }
        </Box>
      </List>
    </Box>
  );

  return (
    <Box 
    sx={{width: "100%", height: "230px", textAlign: "center", position: "relative", justifyContent: "space-between"}}>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      
      <Box className='menu' sx={{display:"flex", justifyContent: "space-between", m:"1.5em"}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
          sx={{
            alignSelf: "flex-start"
          }}
        >
          <MenuIcon sx={{ fontSize: 45 }}/>
        </IconButton>

        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" , ml:"2em",
          "&:hover": {transform: "scale(1.03)",cursor:"pointer"}
          }}>
          <Box component="img"
          sx={{width:"5em",height:"5em"}}
          src={nSurferIcon} alt="logo"></Box>
          <Box component="h1" onClick={()=>navigate("/")}
          sx={{m: "20px", fontSize:"3em", color: "#0067a3", textShadow:"2px 2px 2px gray", 
          
          }}>
            N-Surfer</Box>
        </Box>

        <Box sx={{display: "flex"}}>
          <Tooltip title="개발 중">
            <IconButton sx={{my:"0.5em", mx:"1em", alignSelf: "flex-start"}}>
              <Badge color="primary" badgeContent="2" >
                <NotificationsIcon fontSize='large' sx={{ color: "#b28704" }}/>
              </Badge>
            </IconButton>
          </Tooltip>
          {isLogin?
          (<Box component="img" onClick={()=>{navigate(`/user/profile?nickname=${value.profileStore.userData.nickname}`)}} 
          sx={{"&:hover":{cursor:"pointer"}, width: "3em", height: "3em", objectFit:"cover",objectPosition:"center" ,borderRadius: "50%",my:"0.5em"}} src={userImgSrc} alt="profile"/>):
          (<Box component="img" sx={{width: "3em", height: "3em", objectFit:"cover",objectPosition:"center" ,borderRadius: "50%", my:"0.5em", "&:hover":{cursor:"pointer"},}} src={userImgSrc} 
          onClick={()=>{value.authStore.setIsLoginLoading(true); value.modalStore.openModal()}}
          alt="profile"/>)}
          </Box>
      </Box>
    </Box>
  );
}
export default observer(Navbar);