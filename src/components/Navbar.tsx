import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton } from '@mui/material';

import { observer } from 'mobx-react';

import { useRootStore } from '@provider/rootContext';
import { useEffect, useState } from 'react';

const Navbar = ()=>{
  // store 및 service 선언
  const value = useRootStore()!;
  const isLogin = value.authStore.isLogin;
  const navigate = useNavigate();

  const [userImgSrc, setUserImgSrc] = useState<string | undefined>(undefined);

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
    const defaultImg = "https://res.cloudinary.com/nsurfer/image/upload/v1677038493/profile_logo_mapxvu.jpg";
    setUserImgSrc(imgUrl || defaultImg);
  },[value.profileStore.userData.userEmail])
  
  // Github 클릭 시 두 링크
  const handleLinksOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    window.open("https://github.com/JeongJuRyu/n-surfer-be", '_blank');
    window.open("https://github.com/2cleanwater/N-Surfer", '_blank');
  }

  return (
    <Box 
    sx={{width: "100%", height: "250px", textAlign: "center", position: "relative", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      
      <Box component={Link} to='/'
      sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}>
        <Box component="img"
        sx={{width:"5em",height:"5em",marginLeft:"3em"}}
        src={require('@static/images/N-Surfer_Icon.png')} alt="logo"></Box>
        <Box component="h1"
        sx={{margin: "20px", fontSize:"3em", color: "#0067a3", textShadow:"2px 2px 2px gray", "&:hover": {
          transform: "scale(1.1)"
        }}}>
          N-Surfer</Box>
      </Box>

      <Box sx={{display: 'flex', alignItems: "center", justifyItems: "center", padding: "2em"}}>
        <Box sx={{
          flexDirection: "row", 
          alignItems: "center",
          justifyItems: "center",
          color:"#097581", 
          textDecoration: "none",
          padding:"1em"
          }}>
          <Button component={Link} to='/card/list' 
          sx={{fontSize:"1.3em", fontWeight:"bolder", color:"#097581","&:hover": {
            transform: "scale(1.1)"
          } }}>
            카드목록</Button>
          {isLogin&&(
            <Button component={Link} to='/cardForm' 
            sx={{fontSize:"1.3em", fontWeight:"bolder", color:"#097581", "&:hover": {
              transform: "scale(1.1)"
            } }}>
              카드추가</Button>
          )}
          {isLogin? 
            (<Button onClick={()=>{value.authStore.logout(); navigate("/");}}
            sx={{fontSize:"1.3em", fontWeight:"bolder", color:"#097581", "&:hover": {
              transform: "scale(1.1)"
            } }} >
              Logout</Button>) : 
            (<Button onClick={()=>{value.modalStore.openModal()}}
            sx={{fontSize:"1.3em", fontWeight:"bolder", color:"#097581", "&:hover": {
              transform: "scale(1.1)"
            } }} >
              Login</Button>)
          }
        </Box>
        
        {isLogin?
          (<Box component={Link} to={`/user/profile?userName=${value.profileStore.userData.userName}`}
          sx={{w : "3em", h: "3em", borderRadius: "100%"}}>
            <Box component="img" sx={{w : "3em", height: "3em", borderRadius: "100%"}} src={userImgSrc} alt="profile"/>
          </Box>):
          (<Box 
          sx={{w : "3em", h: "3em", borderRadius: "100%"}}>
            <Box component="img" sx={{w : "3em", height: "3em", borderRadius: "100%"}} src={userImgSrc} alt="profile"/>
          </Box>)
        }
        <Box sx={{position:'absolute', top:0,right:0, display:"flex", flexDirection:"row"}}>
          <div onClick={(e)=>{handleLinksOpen(e)}}>
            <Box component="img" src={require('@images/GitHub.png')} sx={{width:"20px", height:"20px", margin:"10px", "&:hover": {
              transform: "scale(1.1)"
            }}}/>
          </div>
          <div onClick={()=>{window.open('https://2cleanwater.notion.site/N-Surfer-0d2ae67e463b46dc96126f0044208100')}}>
            <Box component="img" src={require('@images/Notion.png')} sx={{width:"20px", height:"20px", margin:"10px", "&:hover": {
              transform: "scale(1.1)"
            }}}/>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
export default observer(Navbar);