import InteractiveWave from '@components/utils/InteractiveWave';
import { labelColor, OceanData } from '@store/OceanStore';
import { dateConverter } from '@service/dateConverter';

import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react';

import { Box, Checkbox } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const CardMini = ({OceanData}:{OceanData:OceanData}) => {
  // css
  const mainBox = {
    width: "15em", 
    height: "18.7em", 
    boxShadow: 3, 
    m:"2em",
    borderRadius:"1em", 
    ":hover": {
      // transform: "scale(1.02)", 
    cursor:"pointer"},
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    position:"relative",
    // textAlign:"center"
  }

  const navigate = useNavigate();
  const baseOceanImg:string= process.env.REACT_APP_OCEAN_BASE_IMG!;
  const bottle:string= process.env.REACT_APP_BOTTLE!;
  const profileBaseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;
  
  return (
    <Box sx={mainBox} onClick={()=>{navigate(`/card/${OceanData.cardId}`)}}>
      <Box component="img" src={bottle} sx={{zIndex:"-100", position:"absolute", width:"17em", top:"37%", left:"50%", transform:"translate(-50%,-50%)", filter: "drop-shadow(-10px 15px 5px gray)"}}/>
      <Box sx={{position:"absolute", zIndex:"-1"}}> 
        <InteractiveWave width={240} height={300} color="#F9F5F5" percent={1.8}/>
      </Box>

      <Box className="date" sx={{width:"92%", alignContent:"right"}}>
        <Box sx={{mr:"0.5em", fontSize:"13px", textAlign:"right", fontWeight:"300"}}>
          {dateConverter({dateString:OceanData.createDate, tag:"."})}
        </Box>
      </Box>

      <Box className="nickname&bookmark" sx={{width:"100%", display:"flex", justifyContent: "space-between", alignItems:"center"}}>
        <Box sx={{fontSize:"14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight:"400", textAlign:"left",display:"flex", alignItems:"center",justifySelf:"left"}}
        onClick={(e)=>{e.stopPropagation();navigate(`/user/profile?nickname=${OceanData.nickname}`)}}
        >
          <Box component="img" sx={{ml:"0.7em", mr:"0.5em",width: "2em", height: "2em", objectFit:"cover",objectPosition:"center" ,borderRadius: "50%"}} alt="profile"
          src={profileBaseImg} />
          {/* src={oceanData.userProfileImg?oceanData.userProfileImg:profileBaseImg} /> */}
          {OceanData.nickname}
        </Box>
        <Checkbox
          sx={{fontSize:"1.5em", }}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon sx={{color:"#008000"}}/>}
          onClick={(e)=>{e.stopPropagation();}}
        />
      </Box>

      <Box className="label" sx={{position:"absolute",left:"5%",top:"0em", display:"flex"}}>
        {[...Array(10)].map((_, index) => (<div key={index}>
          {OceanData.labels[index]&&<Box sx={{width:"0.7em",height:"0.8em",mx:"0.3em",
          bgcolor: labelColor(OceanData.labels[index]?.color)?.backgroundColor||""}}/>}
        </div>))}
      </Box>
      
      <Box className="img" sx={{width:"92%",my:"0.1em",height: "8em", alignItems: "center", justifyItems:"center"}}>
        <Box component="img" src={OceanData.images[0]?.imageUrl||baseOceanImg}
        sx={{ width: "100%", height: "8em" ,objectFit: OceanData.images[0]?'cover':'contain', borderRadius:"1em", boxShadow: 3, bgcolor:"white"}} alt='CardImg'></Box>
      </Box>

      <Box className="title" sx={{width:"92%",m:"0.5em", height:"25%", alignItems: "center", justifyContent:"center", overflow: "hidden", display: 'flex',textOverflow: "ellipsis"}}>
        <Box sx={{color:"Black",display: '-webkit-box',WebkitLineClamp : "3",WebkitBoxOrient: 'vertical',fontSize:"18px",fontWeight:"700", wordWrap: "break-word", textOverflow: "ellipsis",textAlign:"center"}}>
          {OceanData.title}
        </Box> 
      </Box>

      <Box className="subs" sx={{width:"92%", my:"2%", color:"lightblue",fontWeight:"bold",fontSize:"5px" ,textAlign:"right", display:"grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems:"center",
      justifyContent: "stretch"
      }}>
        <Box sx={{ justifySelf: "start", display:"flex",alignItems:"center" }}>
          <VisibilityIcon sx={{mr:"0.3em", fontSize:"3em"}}/> 12,345
        </Box>
        {/* {oceanData?.nickname.toLocaleString('ko-KR') ?? "Unknown"} */}
        <Box sx={{justifySelf:"center",display:"flex",alignItems:"center"}}>
          <Favorite sx={{mr:"0.3em", fontSize:"3em", color:"#FB3958"}}/> 12,345
        </Box>
        <Box sx={{justifySelf:"right",display:"flex",alignItems:"center"}}>
          <ChatBubbleOutlineIcon sx={{mr:"0.3em", fontSize:"3em"}}/> 12
        </Box>
      </Box>
    </Box>
  )
}

export default observer(CardMini)