import CardMini from '@components/CardMini'
import instance from '@service/axiosInterceptor'
import { OceanData, label, wholeLabelList } from '@store/OceanStore'
import Loading from '@components/Loading'
import { useRootStore } from '@provider/rootContext'

import { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import { Box, Button, IconButton, TextField } from '@mui/material'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';

import useIntersectionObserver from '@service/useIntersectionObserver'

const CardList =() => {
  const value = useRootStore()!;
  const navigate = useNavigate();

  const labelList:Array<string> = wholeLabelList.map(item => item.name);
  const [searchParams, setSearchParams] = useSearchParams();
  const [oceanList, setOceanList] = useState<Array<OceanData>>([]);
  const [inputNickname, setInputNickname] = useState<string>("");
  const labelParams:string= searchParams.get("label")||"";
  const nicknameParams:string= searchParams.get("nickname")||"";
  const selectedIndex:number = labelParams?labelList.indexOf(labelParams):-1

  const [cardExist, setCardExist]= useState<boolean>(true);

  // 무한스크롤 파트
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [itemIndex, setItemIndex] = useState(0);
  // const [data, setData] = useState();
  // // const [data, setData] = useState(CARD_DATA.slice(0, 10));
  
  // const testFetch = (delay = 1000) =>
  //   new Promise((res) => {setTimeout(res, delay); console.log("헤이")});

  // const getMoreItem = async () => {
  //   setIsLoaded(true);
  //   await testFetch();
  //   setItemIndex((i) => i + 1);
  //   // setData(data.concat(CARD_DATA.slice(itemIndex, itemIndex + 5)));
  //   console.log(itemIndex)
  //   console.log("검색")
  //   setIsLoaded(false);
  // };

  // const onIntersect: IntersectionObserverCallback = async (
  //   [entry],
  //   observer
  // ) => {
  //   if (entry.isIntersecting && !isLoaded) {
  //     observer.unobserve(entry.target);
  //     await getMoreItem();
  //     observer.observe(entry.target);
  //   }
  // };

  // const { setTarget } = useIntersectionObserver({
  //   root: null,
  //   rootMargin: '0px',
  //   threshold: 0.5,
  //   onIntersect,
  // });


  // ocean list 받아오기
  // sever data =============================================
  useEffect(()=>{
    //입력창과 파람을 비교해 파람기준으로 맞춰줌
    if(nicknameParams!==inputNickname)setInputNickname(nicknameParams);
    try{
      setCardExist(true);
      value.oceanStore.getOceanList(nicknameParams,labelParams,undefined,setOceanList);
    }catch(err){
      setCardExist(false);
    }
  },[searchParams])
  

  //label 선택 =============================================================
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
      if((event.target as HTMLDivElement).textContent=="모두"){
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
                selected={selectedIndex === -1}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="모두"/>
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="프론트엔드" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="백엔드" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="상식" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="자료구조" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemText primary="알고리즘" />
              </ListItemButton>
            </List>
          </Box>
        </Box>

        {oceanList.length>0?
        (<Box sx={{display: "flex", flexDirection:"column",  pr:"20px", mb:"50px" }}>
          {[...Array(3)].map((_, rowIndex) => (
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
          {/* <div ref={setTarget}>{isLoaded && <Loading/>}</div> */}
        </Box>):
      //   (<Box sx={{display: "flex", flexDirection:"column",  pr:"20px", mb:"50px" }}>
      //   {[...Array(3)].map((_, rowIndex) => (
      //     <div key={rowIndex} style={{ display: "flex",flexDirection:"row"}}>
      //       {[...Array(3)].map((_, colIndex) => {
      //         const index = rowIndex*3 + colIndex;
      //         return (
      //         <Box key={`${colIndex}-${rowIndex}`} sx={{ border:"1px solid black",width: "200px", height: "800px",}}>
      //           헤이헤이
      //         </Box>
      //         );
      //       })}
      //     </div>
      //   ))}
      //   <div ref={setTarget}>{isLoaded && <Loading/>}</div>
      // </Box>):
        (<Box sx={{width:"100%"}}>{cardExist?<Loading/>:<Box>작성된 글이 없습니다. 첫 파도를 일으켜보세요!</Box>}</Box>)}
      </Box>
    </Box>
  )
}

export default observer(CardList)