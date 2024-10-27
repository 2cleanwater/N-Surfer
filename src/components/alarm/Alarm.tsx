import { useRootStore } from '@provider/rootContext';
import { Box, Button, Skeleton, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Alarm = ({offAlarm, eventSource}:{offAlarm:()=>void, eventSource?:EventSource}) => {

  const Alarm = styled(Box)({
    zIndex: "1500",
    backgroundColor:"#F5F6F8",
    width:"25.5rem",
    height:"30rem",
    borderRadius:"0.5rem",
    boxShadow: "5px 5px 20px 0px rgba(0,0,0,0.3)",
    display:"flex",
    flexDirection:"column",
    margin:"1rem",
    alignItems:"center",
    paddingTop:"1rem",
    paddingBottom:"1rem",
    overflow:"hidden"
  });

  const AlarmBox = styled(Box)({
    width:"20rem",
    minHeight:"5rem",
    borderRadius:"0.5rem",
    marginTop:"0.5rem",
    marginBottom:"0.5rem",
    marginLeft:"0.5rem",
    marginRight:"0.5rem",
    boxShadow: "5px 5px 10px 0px rgba(0,0,0,0.3)",
    display: "flex",
    padding:"1rem",
    justifyContent:"center",
    flexDirection:"column"
  });
  
  const nSurferIcon:string= process.env.REACT_APP_NSURFERICON!;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alarmList, setAlarmList] = useState([]);
  
  const sampleAlarmList = [
    {
      "id": 1,
      "title": "댓글이 달렸어요",
      "contents": "헤이헤이유유유유유ㅠ융유ㅠ",
      "createdAt": "어제 오후 07:00",
      "nickname": "admin투클린워터",
      "readByUser": false,
      "cardId": "0"
    },
    {
      "id": 4,
      "title": "댓글이 달렸어요",
      "contents": "작성하신 \"너는 정말..\" 글에 투ㅀㅇㅀ님이 댓글을 달았습니다.",
      "createdAt": "어제 오후 07:00",
      "nickname": "admin투클린워터",
      "readByUser": true,
      "cardId": "0"
    },
    {
      "id": 3,
      "title": "댓글이 달렸어요",
      "contents": "작성하신 \"너는 정말..\" 글에 투ㅗㅇ로터님이 댓글을 달았습니다.",
      "createdAt": "어제 오후 07:00",
      "nickname": "admin투클린워터",
      "readByUser": false,
      "cardId": "0"
    },        {
      "id": 2,
      "title": "댓글이 달렸어요",
      "contents": "작성하신 \"너는 정말..\" 글에 투ㅁㄴㄻㄴㄹ린워터님이 댓글을 달았습니다.",
      "createdAt": "어제 오후 07:00",
      "nickname": "admin투클린워터",
      "readByUser": true,
      "cardId": "0"
    }
  ];

  //* 시간 폼 변경해줄 함수 
  const changeTime = ()=>{

  };

  //* 내용 폼 변경해줄 함수
  const changeContents = (contents:string)=>{
    return contents.slice(0,6);
  }

  //* 알림 async
  useEffect(() => {
    //로그인했을 때 동작
    if(eventSource){
      eventSource.onmessage = async (e) => {
        setIsLoading(true);
        try{
          const res = await e.data;
          setAlarmList(res);
          setIsLoading(false);
        } catch(error){
          setIsLoading(false);
          throw error;
        }
      };
    }
  }, [eventSource]);

  //* 알림 더 불러오기
  // usestate로 갯수를 정해서 요청 보낼 때 같이 보내야하나?

  //* 알림 블럭
  const divAlarmList = sampleAlarmList.sort((a, b) => b.id - a.id).map((item,index)=>{
    return <AlarmBox sx={{backgroundColor:item.readByUser?"white":"#F1F1F1"}} onClick={()=>{navigate("/card/"+item.cardId);offAlarm();}} key={index}>
      <Box sx={{display:"flex", alignItems:"center"}}>
        <Box id="alertIcon" component={"img"} src={nSurferIcon} sx={{width:"2rem",height:"2rem", borderRadius:"50%"}}/>
        <Box sx={{alignItems:"center", fontWeight:"bold",fontSize:"1.1rem", px:"0.5rem"}}>{item.title}</Box>
        <Box sx={{alignItems:"center", fontSize:"0.8rem"}}>{item.createdAt}</Box>
      </Box>
      <Box sx={{pt:"0.5rem"}}>
        {/* {item.contents} */}
        {'작성하신 "'+changeContents(item.contents)+'"글에 '}
        <Box component="span" sx={{color:"#0074D9"}} onMouseUp={()=>{}} onClick={(e)=>{e.stopPropagation(); navigate("/user/profile/?nickname="+item.nickname); offAlarm();}} onMouseOver={()=>{}}>{item.nickname}</Box>
        {'님이'}
        {"~~했습니다"}
      </Box>
    </AlarmBox>
  });

  //* 알림 스켈레톤
  const divSkeleton = [...Array(3)].map((_, index) => {
    return <AlarmBox sx={{}} key={index}>
      <Box sx={{display:"flex", alignItems:"center"}}>
        <Skeleton variant="circular" width="2rem" height="2rem" />
        <Box sx={{alignItems:"center", fontWeight:"bold",fontSize:"1.1rem", px:"0.5rem"}}>
          <Skeleton variant="text" sx={{ px:"0.5rem", fontSize: '1.1rem', width:"8rem"}} />
        </Box>
      </Box>
      <Box sx={{pt:"0.5rem"}}>
        <Skeleton variant="text" sx={{ px:"0.5rem", fontSize: '1.1rem', }} />
        <Skeleton variant="text" sx={{ px:"0.5rem", fontSize: '1.1rem', }} />
      </Box>
    </AlarmBox>
  });

  return (
    <Alarm>
      <Box sx={{overflow:"auto",justifyContent:"center", height:"30rem"}}>
        {isLoading?
        divSkeleton:
        sampleAlarmList.length>0?
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", }}>
          {divAlarmList}
          {/* <Button variant="contained" sx={{margin:"0.5rem"}}>⬇ 더보기</Button> */}
        </Box>
        :
        <AlarmBox sx={{backgroundColor:"#F1F1F1", alignItems:"center", fontWeight:"bold",fontSize:"1.1rem"}}>알림이 없습니다 🔔❌</AlarmBox>}
      </Box>
    </Alarm>
  )
}

export default Alarm