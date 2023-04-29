import CardDetail from '@components/cardDetail/CardDetail'
import CardDetailEditable from '@components/cardDetail/CardDetailEditable';
import { useRootStore } from '@provider/rootContext';
import { OceanData } from '@store/OceanStore';
import CardDetailNull from '@components/cardDetail/CardDetailNull';
import { notionToHtml } from '@service/notionToHtml';
import CardReply from '@components/cardDetail/CardReply';

import { useEffect, useState } from 'react';

import { Badge, Box,  Button,  Checkbox,  IconButton, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styled from '@emotion/styled';

const HeartCSS= styled(Checkbox)({
  position:"absolute", 
  top:"10.5em", 
  right:"6.7em", 
  color: "white", 
  zIndex:"11",
  "&:not(:active):not(:hover)": {
    animation: "animation-Heart .45s ease-in-out",
  },
  "&:active":{
    animation: "animation-Heart .45s ease-in-out",
  },
  transform: "scale(1)",
  "@keyframes animation-Heart": {
    "0%": {
      transform: "scale(1)"
    },
    "25%": {
      transform: "scale(1.2)"
    },
    "50%": {
      transform: "scale(.95)"
    },
    "100%": {
      transform: "scale(1)"
    },
  }
})

function Card() {
  const value = useRootStore()!;
  //카드 파라미터
  const cardId:string = window.location.pathname.split("/").splice(-1)[0];

  const [oceanData,setOceanData]= useState<OceanData>({} as OceanData);
  const [isEditing, setIsEditing]= useState<boolean>(false);
  const [isLiked, setIsLiked]= useState<boolean>(false);
  const [likedNumber, setLikedNumber]= useState<number>(99); 
  const [isBookMarked, setIsBookMarked]= useState<boolean>(false);

  // server data
  useEffect(()=>{
    value.modalStore.openModal();
    value?.oceanStore.getOcean(cardId, setOceanData);
  },[isEditing]);

  useEffect(()=>{
    !value?.oceanStore.isOceanLoading&&value?.modalStore.closeModal();
    return () => {
      value.modalStore.closeModal();
    };
  },[value?.oceanStore.isOceanLoading,oceanData]);

  const handleClickShare = () => {
    const htmlValue:string = notionToHtml(oceanData)
    const element = document.createElement('a');
    const file = new Blob([htmlValue], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${oceanData.title}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Box sx={{alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center", textAlign:"center", display:"flex", position:"relative"}}>
      {oceanData.title? 
      <div>
        {oceanData.user.username==value?.profileStore.userData.nickname&&
        <Tooltip title={<div style={{fontSize:"15px"}}>설정</div>}>
          <IconButton type="submit" size="medium" sx={{position:"absolute", top:"1em", right:"4.5em", color: "white", bgcolor:"#9B9A97", zIndex:"10",
            "&:hover":{
              "@keyframes rotate": {
                "100%": {
                  transform: "scale(1.1) rotate(180deg)"
                },
              },
              bgcolor:"#9B9A97",
              animation: "rotate 1s infinite",
              cursor : "pointer"
            },
            animation: isEditing?"rotate 1s infinite":"",
            }} onClick={(e)=>{setIsEditing(!isEditing);}}>
            <SettingsIcon fontSize="medium" />
          </IconButton>
        </Tooltip>}

        {!isEditing&&
          <div>
            <Tooltip title={<div style={{fontSize:"15px", wordWrap: "normal", width:"14em" }}>저장된 HTML파일을 노션에서 "가져오기"해서 추가해보세요!</div>}>
              <IconButton type="submit" size="medium" sx={{position:"absolute", top:"4em", right:"4.5em", color: "white", bgcolor:"#0B6E99", zIndex:"11",
              "&:hover":{
                  transform: "scale(1.1)",
                  color: "#0B6E99", 
                  bgcolor:"white"
                },
                cursor : "pointer",
              }} onClick={handleClickShare}>
              <ShareIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            
            {/* <Badge badgeContent={likedNumber} color="primary"  sx={{position:"absolute", top:"10.5em", right:"7.1em", color: "white", zIndex:"11"}}/>
            <HeartCSS
            sx={{position:"absolute", top:"10.5em", right:"6.7em", color: "white", zIndex:"11"}}
            checked={isLiked}
            onClick={()=>{setIsLiked(!isLiked);setLikedNumber(isLiked?likedNumber-1:likedNumber+1)}}
            icon={<FavoriteBorder sx={{fontSize:"2em"}}/>} checkedIcon={<Favorite sx={{color:"#FB3958", fontSize:"2em"}} />} />
            
            <Checkbox
              sx={{position:"absolute", top:"14.5em", right:"6.7em", color: "white", zIndex:"11"}}
              icon={<BookmarkBorderIcon sx={{fontSize:"2em"}}/>}
              checkedIcon={<BookmarkIcon sx={{color:"#008000", fontSize:"2em"}}/>}
            /> */}
          </div>
        }

        {isEditing?
          (<CardDetailEditable oceanData={oceanData} setIsEditing={setIsEditing}/>):
          (<CardDetail oceanData={oceanData}/>)}
        {/* <CardReply/> */}
      </div>:
      <>
      {value.modalStore._IsModalOpen?<CardDetailNull/>:<></>}
      </>
      }
    </Box>
  )
}

export default Card;