import { observer } from 'mobx-react';
import CardMini from '@/components/CardMini';
import Wave from '@/components/Wave';
import { Box } from '@mui/material';
import { useRootStore } from '@provider/rootContext';
import instance from '@/service/axiosInterceptor';
import { OceanData } from '@/store/OceanStore';
import { useEffect, useState } from 'react';

const Home = () => {
  const value = useRootStore()!;
  const isLogin = value.authStore.isLogin;
  const [recentList, setRecentList] = useState<Array<OceanData>>([]);

  // ocean list 받아오기
  const getOceanList= async function(){
    const oceanListUrl = `/card?nickname=${value.profileStore.userData.nickname}&numOfCards=3`;
    await instance({
      method: "GET",
      url: oceanListUrl,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      setRecentList(res.data.cardList as Array<OceanData>|| [])
    })
    .catch((err)=>{
      console.log(err);
      window.alert("Ocean List의 정보를 가져올 수 없습니다.");
    })
  }

  // sever data =============================================
  useEffect(()=>{
    getOceanList();
  },[isLogin]);

  return (
    <Box sx={{position: "relative", border:"1px black ", display:"flex", flexDirection:"column",justifyContent: "center", alignItems: "center"}}>
      {isLogin?
      (value.profileStore.userData.nickname&&<Wave nickname={value.profileStore.userData.nickname!}/>):
      (<Box component="img" src={require('@images/testHome.png')} alt='HomeIMG'
      sx={{ width:"900px", borderRadius:"3em", boxShadow: 3, mb:"50px" }}/>)}
      <Box sx={{width:"860px", borderRadius:"1em", boxShadow: 3, backgroundColor:"#0067a3", m:"10px", p:"20px", pl:"40px", fontSize:"25px", fontWeight:"bold", color:"white"}}>최근 작성된 파도</Box>
      {recentList&&<Box sx={{display:'flex',justifyContent: "center", alignItems: "center", p:"90px"}}>
        {/* {[...Array(3)].map((_, index) => {return (<CardMini key={index} OceanData={recentList[index]}/>)})} */}
      </Box>}
    </Box>
  )
}
export default observer(Home);