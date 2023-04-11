import CardMini from '@components/CardMini'
import { OceanData, wholeLabelList } from '@store/OceanStore'
import Loading from '@components/Loading'
import { useRootStore } from '@provider/rootContext'

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import { Box, IconButton, TextField } from '@mui/material'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';

const CardList =() => {
  const value = useRootStore()!;
  const navigate = useNavigate();

  const labelList:Array<string> = wholeLabelList.map(item => item.name);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [inputNickname, setInputNickname] = useState<string>("");
  const labelParams:string= searchParams.get("label")||"";
  const nicknameParams:string= searchParams.get("nickname")||"";
  const selectedLabelIndex:number = labelParams?labelList.indexOf(labelParams):-1

  const [cardExist, setCardExist]= useState<boolean>(true);

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
      setCardExist(true);
      // 첫 데이터 받아옴
      console.log(nextCursor)
      value.oceanStore.getOceanList({
        numOfCards:9,
        nickname:nicknameParams,
        label:labelParams,
        setValue:setOceanList,
        setNextCursor:setNextCursor
      });
    }catch(err){
      setCardExist(false);
    }
  },[searchParams])

  useEffect(() => {
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
      }, {
        threshold: 0.5,
      });
  
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
      if((event.target as HTMLDivElement).textContent==="모두"){
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
        <TextField variant="outlined" label="회원이름 검색" value={inputNickname} onChange={handleNicknameSearch} onKeyDown={activeEnter} inputProps={{style: {backgroundColor:"white", borderRadius:"5px"}}}></TextField>
        <IconButton size="large" onClick={searchOnClick} >
          <SearchIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box id="body" sx={{display:"flex"}}>
        <Box id="tags" sx={{listStyle:"none", p:"15px",m:"20px" ,width:"150px", borderRadius:"1em", bgcolor:"waveBackground"}}>
          <Box sx={{ w: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItemButton
                selected={selectedLabelIndex === -1}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="모두"/>
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 0}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="프론트엔드" />
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 1}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="백엔드" />
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 2}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="상식" />
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 3}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="자료구조" />
              </ListItemButton>
              <ListItemButton
                selected={selectedLabelIndex === 4}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="알고리즘" />
              </ListItemButton>
            </List>
          </Box>
        </Box>

        {oceanList.length>0?
        // (<Box sx={{display: "flex", flexDirection:"column",  pr:"20px", mb:"50px" }}>
        //   {[...Array(3)].map((_, rowIndex) => (
        //     <div key={rowIndex} style={{ display: "flex",flexDirection:"row"}}>
        //       {[...Array(3)].map((_, colIndex) => {
        //         const index = rowIndex*3 + colIndex;
        //         return (
        //         <Box key={`${colIndex}-${rowIndex}`} sx={{ width: "100%", height: index<oceanList.length?"100%":"0%", mt:index<oceanList.length?"80px":"0%"}}>
        //           {index<oceanList.length?<CardMini OceanData={oceanList[index]}/>:<></>}
        //         </Box>
        //         );
        //       })}
        //     </div>
        //   ))}
        //   <div ref={setTarget}>{isLoaded && <Loading/>}</div>
        // </Box>):
        (<Box sx={{display: "flex", flexDirection:"column",  pr:"20px", mb:"50px" }}>
          {[...Array(3*oceanIndex)].map((_, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex",flexDirection:"row"}}>
              {[...Array(3)].map((_, colIndex) => {
                const index = rowIndex*3 + colIndex;
                return (
                <Box key={`${colIndex}-${rowIndex}`} sx={{ width: "100%", height: index<oceanList.length?"100%":"0%", mt:index<oceanList.length?"80px":"0%"}}>
                  {index<oceanList.length?<CardMini OceanData={oceanList[index]}/>:<></>}
                </Box>
                );
              })}
            </div>
          ))}
          {nextCursor==="noMore"?<div>마지막 글입니다.</div>:<Box sx={{}} ref={setTarget}>{isLoaded && <Loading/>}</Box>}
        </Box>):
        (<Box sx={{width:"100%"}}>{cardExist?<Loading/>:<Box>작성된 글이 없습니다. 첫 파도를 일으켜보세요!</Box>}</Box>)}
      </Box>
    </Box>
  )
}

export default observer(CardList)