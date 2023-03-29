import { observer } from 'mobx-react';
import CardMini from '@/components/CardMini';
import Wave from '@/components/Wave';
import { Box } from '@mui/material';
import { useRootStore } from '@provider/rootContext';
import { Link } from 'react-router-dom';
import instance from '@/service/axiosInterceptor';
import { OceanData } from '@/store/OceanStore';
import { useEffect, useState } from 'react';

const Home = () => {
  const value = useRootStore()!;
  const isLogin = value.authStore.isLogin;
  const [recentList, setRecentList] = useState<Array<OceanData>>([]);

  // 추가 예정: 최근 작성된 카드 리스트를 받아오기

  // ocean list 받아오기
  const getOceanList= async function(){
    const oceanListUrl = `/card`;
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
  },[])
  
  // Test data ================================================
  // useEffect(()=>{
  //   setRecentList(require("@test/oceanData.json") as Array<OceanData>);
  // },[]);

  const index = recentList.length;

  return (
    <Box sx={{position: "relative", m:2, border:"1px black ", display:"flex", flexDirection:"column",justifyContent: "center", alignItems: "center"}}>
      {isLogin?
      (<Wave userName={value.profileStore.userData.userName!}/>):
      (<Box component="img" src={require('@static/images/testHome.png')} alt='HomeIMG'
      sx={{ width:"900px", borderRadius:"3em", boxShadow: 3 }}/>)}
      <Box sx={{display:'flex',justifyContent: "center", alignItems: "center", padding:"30px"}}>
        {index>1&&<CardMini OceanData={recentList[index-1]}/>}
        {index>2&&<CardMini OceanData={recentList[index-2]}/>}
        {index>3&&<CardMini OceanData={recentList[index-3]}/>}
      </Box>
    </Box>
  )
}
export default observer(Home);