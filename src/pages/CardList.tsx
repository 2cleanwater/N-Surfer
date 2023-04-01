import CardMini from '@/components/CardMini'
import instance from '@/service/axiosInterceptor'
import { OceanData, label, wholeLabelList } from '@/store/OceanStore'
import { Box, Button, IconButton, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search';
import { observer } from 'mobx-react'
import Loading from '@/components/Loading'

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const CardList =() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nicknameParams, setNicknameParams] = useState(searchParams.get("nickname")||"");
  const [labelParams, setLabelParams] = useState(searchParams.get("label")||"");
  const [oceanList, setOceanList] = useState<Array<OceanData>>([]);

  // ocean list 받아오기
  const getOceanList= async function(){
    const oceanListUrl = `/card?nickname=${nicknameParams}&label=${labelParams}`;
    await instance({
      method: "GET",
      url: oceanListUrl,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      setOceanList(res.data.cardList as Array<OceanData>|| [])
    })
    .catch((err)=>{
      console.log(err);
      window.alert("Ocean List의 정보를 가져올 수 없습니다.");
    })
  }

  // sever data =============================================
  useEffect(()=>{
    setNicknameParams(searchParams.get("nickname")||"");
    setLabelParams(searchParams.get("label")||"");
    getOceanList();
  },[searchParams])
  

  //label 선택
  const labelList:Array<string> = wholeLabelList.map(item => item.name);
  const [selectedIndex, setSelectedIndex] = useState<number>(labelList.indexOf(labelParams));

  const tagOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log((event.target as HTMLDivElement).textContent=="모두")
    if (event.target != null) {
      if((event.target as HTMLDivElement).textContent=="모두"){
        navigate(`/card?nickname=${nicknameParams}&label=`);
      }
      else {
        navigate(`/card?nickname=${nicknameParams}&label=${(event.target as HTMLDivElement).textContent}`)
      }}
  }

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    tagOnClick(event);
  };

  // 회원이름 검색
  const searchOnClick = ()=>{
    console.log(labelParams)
    navigate(`/card?nickname=${nicknameParams}&label=${labelParams}`)
  }

  const handleNicknameSearch= (e: React.ChangeEvent<HTMLInputElement>)=>{
    setNicknameParams(e.target.value)
  }

  return (
    <Box sx={{display:"flex", flexDirection:"column"}}>
      <Box id="title" sx={{ textAlign:"right" }}>
        <TextField variant="outlined" label="회원이름 검색" value={nicknameParams} onChange={handleNicknameSearch} inputProps={{style: {backgroundColor:"white", borderRadius:"5px"}}}></TextField>
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
                onClick={(event) => handleListItemClick(event, -1)}
              >
                <ListItemText primary="모두"/>
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemText primary="프론트엔드" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText primary="백엔드" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemText primary="상식" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemText primary="자료구조" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemText primary="알고리즘" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
        {oceanList.length>0?
        (<Box sx={{display: "flex", flexDirection:"column",  pr:"20px", mb:"50px" }}>
          {[...Array(100)].map((_, rowIndex) => (
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
        </Box>):
        (<Loading/>)}
      </Box>
      
    </Box>
  )
}

export default observer(CardList)