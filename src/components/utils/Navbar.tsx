import { useRootStore } from '@provider/rootContext';

import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';

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
  const logout = ()=>{
    if (window.confirm('로그아웃 하시겠습니까?')){
        value.authStore.logout(); 
        navigate("/");
    }else return}

  // 서버시간 체크
  useEffect(()=>{
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 10 && currentHour <= 24) {
      setServerOn(true);
    }

    const intervalId = setInterval(()=>{
      const newTime = new Date();
      const newHour = newTime.getHours();
      if (newHour >= 10 && newHour <= 24) {
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

  return (
    <Box 
    sx={{width: "100%", height: "230px", textAlign: "center", position: "relative", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <Box sx={{position:"absolute", textAlign:"left", p:"0.5em", fontSize:"0.9em"}}>
        <div>
          {serverOn?"🟢Online":"🔴Offline"}
        </div>
        <div>(서버시간 10:00 ~ 24:00)</div>
      </Box>
      <Box
      sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}>
        <Box component="img"
        sx={{width:"5em",height:"5em",ml:"3em"}}
        src={nSurferIcon} alt="logo"></Box>
        <Box component="h1" onClick={()=>navigate("/")}
        sx={{m: "20px", fontSize:"3em", color: "#0067a3", textShadow:"2px 2px 2px gray", 
        "&:hover": {transform: "scale(1.03)",cursor:"pointer"}
        }}>
          N-Surfer</Box>
      </Box>

      <Box sx={{display: 'flex', alignItems: "center", justifyItems: "center", p: "2em"}}>
        <Box sx={{
          flexDirection: "row", 
          alignItems: "center",
          justifyItems: "center",
          color:"#097581", 
          textDecoration: "none",
          p:"1em"
          }}>
          <Button component={Link} to='/card' 
          sx={{fontSize:"1.3em", fontWeight:"bolder", color:"#097581","&:hover": {
            transform: "scale(1.1)"
          } }}>
            파도목록</Button>
          {isLogin&&(
            <Button component={Link} to='/cardForm' 
            sx={{fontSize:"1.3em", fontWeight:"bolder", color:"#097581", "&:hover": {
              transform: "scale(1.1)"
            } }}>
              파도추가</Button>
          )}
          <Button component={Link} to='/lottery/daily' 
            sx={{fontSize:"1.3em", fontWeight:"bolder", color:"#b81414", "&:hover": {
              transform: "scale(1.1)"
            } }}>
              행운뽑기</Button>
          {isLogin? 
            (<Button onClick={()=>{logout();}}
            sx={{fontSize:"1.3em", fontWeight:"bolder", color:"#097581", "&:hover": {
              transform: "scale(1.1)"
            } }} >
              Logout</Button>) : 
            (<Button onClick={()=>{value.authStore.setIsLoginLoading(true); value.modalStore.openModal()}}
            sx={{fontSize:"1.3em", fontWeight:"bolder", color:"#097581", "&:hover": {
              transform: "scale(1.1)"
            } }} >
              Login</Button>)
          }
        </Box>
        
        {isLogin?
          (<Box component="img" onClick={()=>{navigate(`/user/profile?nickname=${value.profileStore.userData.nickname}`)}} 
          sx={{"&:hover":{transform:"scale(1.1)", cursor:"pointer"},width: "3em", height: "3em", objectFit:"cover",objectPosition:"center" ,borderRadius: "50%"}} src={userImgSrc} alt="profile"/>):
          (<Box component="img" sx={{width: "3em", height: "3em", objectFit:"cover",objectPosition:"center" ,borderRadius: "50%"}} src={userImgSrc} alt="profile"/>)
        }
        <Box sx={{position:'absolute', top:0,right:0, display:"flex", flexDirection:"row"}}>
          <Box component="img" src={githubFavicon} onClick={(e)=>{handleLinksOpen(e)}} 
          sx={{width:"20px", height:"20px", m:"10px", "&:hover": {transform: "scale(1.1)",cursor:"pointer"}}}/>
          <Box component="img" src={notionFavicon}
          onClick={()=>{window.open('https://2cleanwater.notion.site/N-Surfer-0d2ae67e463b46dc96126f0044208100')}}
          sx={{width:"20px", height:"20px", m:"10px", "&:hover": {transform: "scale(1.1)",cursor:"pointer"}}}/>
        </Box>
      </Box>
    </Box>
  );
}
export default observer(Navbar);