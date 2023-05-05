import { OceanData, labelColor } from '@store/OceanStore';
import { dateConverter } from '@service/dateConverter';
import { useRootStore } from '@provider/rootContext';

import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import { Badge, Box, Checkbox, Tooltip, IconButton, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';

import ShareIcon from '@mui/icons-material/Share';
import { notionToHtml } from '@service/notionToHtml';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

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

const CardDetail = ({oceanData}:{oceanData:OceanData}) => {
  const value = useRootStore();
  const navigate = useNavigate();

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

  const [isLiked, setIsLiked]= useState<boolean>(oceanData.isLiked?oceanData.isLiked:false);
  const [likedNumber, setLikedNumber]= useState<number>(oceanData.likes); 
  const [isBookMarked, setIsBookMarked]= useState<boolean>(oceanData.isBookmarked?oceanData.isBookmarked:false);
  const profileBaseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;

  const [likeChangeCount, setLikeChangeCount]= useState<number>(0);
  
  const handleLike= ()=>{
    if (isLiked) {
      value?.oceanStore.isNotLikedComments(oceanData.cardId);
      setLikedNumber(likedNumber-1);
      setIsLiked(false);
    } else {
      value?.oceanStore.isLikedComments(oceanData.cardId);
      setLikedNumber(likedNumber+1);
      setIsLiked(true);
    }
  }

  const handleBookmark= ()=>{
    if (isLiked) {
      // value?.oceanStore.isNotLikedComments(oceanData.cardId);
      setIsBookMarked(false);
    } else {
      // value?.oceanStore.isLikedComments(oceanData.cardId);
      setIsBookMarked(true);
    }
  }

  return (
    <Box sx={{ bgcolor:"waveBackground", alignItems:"center",borderRadius:"1em", p:"0.5em", mb:"2em",boxShadow: "5"}}>
      <Box sx={{bgcolor:"#2158A8", borderRadius:"0.5em",width:"85%", py:"1.5em",wordBreak:"break-all",m: "1em auto", position:"relative", fontWeight:"bolder", fontSize:"30px", color: "white", display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center", boxShadow: "5"}}>
        {oceanData.title}
        <Box sx={{pl:"1em", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"0.5em", left:"0", display:"flex", alignItems:"center"}}>
          <VisibilityIcon sx={{mr:"0.5em"}}/>
          {oceanData?.views.toLocaleString('ko-KR') ?? "Unknown"}
          </Box>
        <Box onClick={()=>{oceanData?.user.username&&navigate(`/user/profile?nickname=${oceanData.user.username}`)}} sx={{pr:"1em", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"0.5em", right:"0",display:"flex", alignItems:"center","&:hover":{cursor:"pointer", scale:"1.05"}}}>
          {oceanData?.user.username ?? "Unknown"}
          <Box component="img" sx={{ml:"0.5em",width: "1.5em", height: "1.5em", objectFit:"cover",objectPosition:"center" ,borderRadius: "50%"}} alt="profile"
          src={oceanData.user.userProfileUrl?oceanData.user.userProfileUrl:profileBaseImg} />
        </Box>
      </Box>
      <Box sx={{width:"85%", height:"5em", bgcolor:"#2E88C7", borderRadius:"1em",display:"flex", m: "0px auto", mb:"1em", justifyContent: "space-between", alignItems:"center", boxShadow: "5"}}>
        {oceanData.labels&&<Box sx={{display:"flex"}}>
          {oceanData.labels.map((element, index)=>(
            <Box component="label" key={index} htmlFor='' sx={{bgcolor:labelColor(element.color)?.backgroundColor, display:"flex", ml:"1em", borderRadius:"0.8em", pl:"0.5em", boxShadow: "5" }}>
              <Box sx={{m:"0.5em auto", mr:"0.5em", color: labelColor(element.color)?.textColor}}>
                {element.name}
              </Box>
            </Box>
            ))}
        </Box>}
        <Box sx={{width:"5em",fontSize:"20px", textAlign:"center", fontWeight:"400", mr:"1em"}}>
          {dateConverter({dateString:oceanData.createDate,tag:"."})}</Box>
      </Box>
      {[...Array(3)].map((_, index) => (<div key={index}>
          {oceanData.images[index]&&<Box component="img" sx={{borderRadius:"1em", boxShadow: 5, width:"75%", mt:"1em"}} alt='CardImg' 
          src={oceanData.images[index].imageUrl}></Box>}
        </div>))}
      <Box sx={{ width:"80%", p:"2em",textAlign:"left", wordBreak: "break-all", backgroundColor:"#D3ECF9", borderRadius:"1em", m:"2em auto", fontSize:"20px", boxShadow: "5",  whiteSpace:"pre-line"}}>
        {oceanData?.content ?? "내용이 없습니다."}</Box>

      <Tooltip placement="top" title={<div style={{fontSize:"15px", wordWrap: "normal", width:"14em" }}>저장된 HTML파일을 노션에서 "가져오기"해서 추가해보세요!</div>}>
        <IconButton type="submit" size="medium" sx={{position:"absolute", top:"5em", right:"1em", color: "white", bgcolor:"#0B6E99", zIndex:"11",
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
      
      <Badge badgeContent={likedNumber} color="primary"  sx={{position:"absolute", top:"13em", right:"2em", color: "white", zIndex:"11"}}/>
      
      <Tooltip placement="top" title={<div style={{fontSize:"15px", wordWrap: "normal",}}>{isLiked?"좋아요 취소":"좋아요"}</div>}>
        <HeartCSS
        sx={{position:"absolute", top:"13em", right:"1.3em", color: "black", zIndex:"11"}}
        checked={isLiked}
        onClick={handleLike}
        icon={<FavoriteBorder sx={{fontSize:"2em"}}/>} checkedIcon={<Favorite sx={{color:"#FB3958", fontSize:"2em"}} />} />
      </Tooltip>

      <Tooltip placement="top" title={<div style={{fontSize:"15px", wordWrap: "normal"}}>{isBookMarked?"북마크 취소":"북마크"}</div>}>
        <Checkbox
          sx={{position:"absolute", top:"18em", right:"1.3em", color: "black", zIndex:"11"}}
          icon={<BookmarkBorderIcon sx={{fontSize:"2em"}}/>}
          checkedIcon={<BookmarkIcon sx={{color:"#008000", fontSize:"2em"}}/>}
        />
      </Tooltip>
    </Box>
  )
}

export default observer(CardDetail)

