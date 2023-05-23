import CardMini from '@components/cardList/CardMini'
import { OceanData, wholeLabelList } from '@store/OceanStore'
import Loading from '@components/utils/Loading'
import { useRootStore } from '@provider/rootContext'

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import { Box, IconButton, TextField } from '@mui/material'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import Aos from 'aos'

import AlbumIcon from '@mui/icons-material/Album';

import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import ComputerIcon from '@mui/icons-material/Computer';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ErrorIcon from '@mui/icons-material/Error';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ExploreIcon from '@mui/icons-material/Explore';


const CardList =() => {
  useEffect(()=>{
    Aos.init();
  })


  const value = useRootStore()!;
  const navigate = useNavigate();

  const labelList:Array<string> = wholeLabelList.map(item => item.name);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [inputNickname, setInputNickname] = useState<string>("");
  const labelParams:string= searchParams.get("label")||"";
  const nicknameParams:string= searchParams.get("nickname")||"";
  const selectedLabelIndex:number = labelParams?labelList.indexOf(labelParams):-1

  // 무한스크롤 파트
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [oceanList, setOceanList] = useState<Array<OceanData>>([]);
  const [nextOcean, setNextOcean] = useState<Array<OceanData>>([]);
  const [nextCursor, setNextCursor]= useState<string>("");
  const [oceanIndex,setOceanIndex]= useState<number>(1);

  // ocean list 받아오기
  // sever data =============================================
  useEffect(()=>{
    //입력창과 파람을 비교해 파람기준으로 맞춰줌
    if(nicknameParams!==inputNickname)setInputNickname(nicknameParams);
    try{
      // 첫 데이터 받아옴
      value.oceanStore.getOceanList({
        numOfCards:9,
        nickname:nicknameParams,
        label:labelParams,
        setValue:setOceanList,
        setNextCursor:setNextCursor
      });
    }catch(err){
    }
  },[searchParams])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px 0px 600px 0px', // add 200px margin at the bottom
      threshold: 0.5,
    };
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(async ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true);
          setOceanIndex((i)=>i+1);
          await value.oceanStore.getOceanList({
            numOfCards: 9,
            nextCardId:nextCursor,
            nickname: nicknameParams,
            label: labelParams,
            setValue: setNextOcean,
            setNextCursor:setNextCursor
          });
          setIsLoaded(false);
        }
      }, options);
  
      observer.observe(target);
    }
  
    return () => observer?.disconnect();
  }, [target, isLoaded, nextOcean, oceanList]);

  useEffect(() => {
    setOceanList((oceanList) => oceanList.concat(nextOcean));
  }, [nextOcean]);

  //label 선택 =============================================================
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
      if((event.target as HTMLDivElement).textContent==="전체"){
        nicknameParams?navigate(`/card?nickname=${nicknameParams}`):navigate(`/card`);
      }
      else{
        nicknameParams?
        navigate(`/card?nickname=${nicknameParams}&label=${(event.target as HTMLDivElement).textContent}`):
        navigate(`/card?label=${(event.target as HTMLDivElement).textContent}`)
      }
  };

  // 회원이름 검색 =============================================================
  const searchOnClick = ()=>{
    navigate(`/card?nickname=${inputNickname}&label=${labelParams}`)
    navigate(`/card?nickname=${inputNickname}`)
  }

  const handleNicknameSearch= (e: React.ChangeEvent<HTMLInputElement>)=>{
    setInputNickname(e.target.value)
  }

  // 엔터로 검색 =============================================================
  const activeEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === "Enter") {
      searchOnClick();
    }
  }

  return (
    <Box sx={{display:"flex", flexDirection:"column"}}>
      <Box id="title" sx={{ textAlign:"right" }}>
        <TextField variant="outlined" label="회원이름 검색" value={inputNickname} onChange={handleNicknameSearch} onKeyDown={activeEnter} inputProps={{style: {backgroundColor:"white", borderRadius:"5px"}}}/>
        <IconButton size="large" onClick={searchOnClick} >
          <SearchIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box id="body" sx={{display:"flex"}}>
        <Box id="tags" sx={{listStyle:"none", p:"0.5em",m:"1em" ,width:"8em", borderRadius:"1em", bgcolor:"background.paper"}}>
          <Box sx={{ width: '8em', maxWidth: "10em", bgcolor: 'background.paper'}}>
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItemButton
                selected={selectedLabelIndex === -1}
                onClick={(e) => handleListItemClick(e)}
              > 
                <DensitySmallIcon fontSize="small" sx={{mr:"1em"}}/>전체
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 0}
                onClick={(e) => handleListItemClick(e)}
              >
                <ComputerIcon fontSize="small" sx={{mr:"1em", color:"#E03E3E"}}/>개발
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 1}
                onClick={(e) => handleListItemClick(e)}
              >
                <CircleNotificationsIcon fontSize="small" sx={{mr:"1em", color:"#D9730D"}}/>뉴스
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 2}
                onClick={(e) => handleListItemClick(e)}
              >
                <ErrorIcon fontSize="small" sx={{mr:"1em", color:"#0B6E99"}}/>정보
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 3}
                onClick={(e) => handleListItemClick(e)}
              >
                <ChatBubbleIcon fontSize="small" sx={{mr:"1em", color:"#0F7B6C"}}/>잡담
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 4}
                onClick={(e) => handleListItemClick(e)}
              >
                <ExploreIcon fontSize="small" sx={{mr:"1em", color:"#64473A"}}/> 노하우
              </ListItemButton>
            </List>
          </Box>
        </Box>
        {oceanList.length>0?
        (<Box sx={{display: "flex", flexDirection:"column",  pr:"1em"}}>
          {[...Array(3*oceanIndex)].map((_, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex",flexDirection:"row"}}>
              {[...Array(3)].map((_, colIndex) => {
                const index = rowIndex*3 + colIndex;
                return (
                <Box data-aos="fade-up" data-aos-delay={((index % 9) + 1)*100} data-aos-duration="1000" data-aos-easing="easy-in-out" data-aos-once="true" key={`${colIndex}-${rowIndex}`} sx={{ width: "100%", height: index<oceanList.length?"100%":"0%", mt:index<oceanList.length?"80px":"0%"}}>
                  {index<oceanList.length?<CardMini OceanData={oceanList[index]}/>:<></>}
                </Box>
                );
              })}
            </div>
          ))}
          {nextCursor==="noMore"?
          <Box sx={{width:"18.5em",bgcolor:"#2158A8", borderRadius:"1em", textAlign:"center", m:"1em", p:"1em",fontSize:"40px", fontWeight:"bold",color:"white"}}>마지막 글입니다.</Box>:
          <Box sx={{width:"100%"}} ref={setTarget}>{isLoaded && <Loading/>}</Box>}
        </Box>):
        (<Box sx={{width:"100%"}}>{value.oceanStore.isOceanListLoading?<Loading/>:
        <Box sx={{width:"25em",bgcolor:"#2158A8", borderRadius:"1em", textAlign:"center", m:"1em", p:"1em",fontSize:"30px", fontWeight:"bold",color:"white"}}>
          작성된 글이 없습니다.<br></br> <br></br>첫 파도를 일으켜보세요!</Box>}</Box>)
        }
      </Box>
    </Box>
  )
}

export default observer(CardList)