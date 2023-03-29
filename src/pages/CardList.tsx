import CardMini from '@/components/CardMini'
import instance from '@/service/axiosInterceptor'
import { OceanData } from '@/store/OceanStore'
import { Box, Button, IconButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search';
import { observer } from 'mobx-react'

const CardList =() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userName:string|null = searchParams.get("userName");
  const label:string|null = searchParams.get("label");
  const [oceanList, setOceanList] = useState<Array<OceanData>>([]);
  const userNameSearch = useRef(null);

  const searchOnClick = ()=>{
    navigate(`/card/?&userName=${userNameSearch}`)
  }

  const tagOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.target != null) {
      navigate(`/card?&label=${(e.target as HTMLLIElement).textContent}`)
    }
  }

  // ocean list 받아오기
  const getOceanList= async function(){
    const oceanListUrl = `/card?userName=${userName}&label=${label}`;
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
    getOceanList();
  },[])
  
  // Test data ================================================
  // useEffect(()=>{
  //   setOceanList(require("@test/oceanData.json") as Array<OceanData>);
  // },[]);

  return (
    <Box sx={{display:"flex", flexDirection:"column"}}>
      <Box id="title" sx={{backgroundColor:"gray", textAlign:"right"}}>
        회원이름
        <input ref={userNameSearch}></input>
        <IconButton size="medium" onClick={()=>{searchOnClick()}} >
          <SearchIcon fontSize="medium" />
        </IconButton>
      </Box>

      <Box id="body" sx={{display:"flex", padding:"20px"}}>
        <Box id="tags" component="ul" sx={{listStyle:"none", padding:"10px", width:"150px", backgroundColor:"gray"}}>
          <li>제목</li>
          <li onClick={tagOnClick}>태그1</li>
          <li onClick={tagOnClick}>태그2</li>
          <li onClick={tagOnClick}>태그3</li>
          <li onClick={tagOnClick}>태그4</li>
          <li onClick={tagOnClick}>태그5</li>
        </Box>
        {oceanList.length>0?
        (<Box sx={{display: "flex",}}>
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex",flexDirection:"column"}}>
              {[...Array(5)].map((_, colIndex) => {
                const index = rowIndex + colIndex*3;
                return (
                  <div key={`${colIndex}-${rowIndex}`} style={{ width: "100%"}}>
                    {index<oceanList.length&&<CardMini OceanData={oceanList[index]}/>}
                  </div>
                );
              })}
            </div>
          ))}
        </Box>):
        (<div>로오옹오오오딩주우우우우웅</div>)}
      </Box>
      
    </Box>
  )
}

export default observer(CardList)