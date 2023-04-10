import InteractiveWave from '@components/InteractiveWave';
import { labelColor, OceanData } from '@store/OceanStore';
import { useRootStore } from '@provider/rootContext';
import { dateConverter } from '@service/dateConverter';

import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material'

const CardMini = ({OceanData}:{OceanData:OceanData}) => {
  // css
  const mainBox = {
    width: 240, 
    height: 300, 
    boxShadow: 3, 
    m:3.5, 
    // border: "5px solid lightblue",
    borderRadius:"1em", 
    ":hover": {transform: "scale(1.02)", cursor:"pointer"},
    justifyItems:"center",alignItems:"center", alignContent:"center", justifyContents:"center",
    position:"relative",
    textAlign:"center"
  }

  const navigate = useNavigate();
  const baseOceanImg:string= process.env.REACT_APP_OCEAN_BASE_IMG!;
  const bottle:string= process.env.REACT_APP_BOTTLE!;
  
  return (
    <Box sx={mainBox} onClick={()=>{navigate(`/card/${OceanData.cardId}`)}}>
      <Box component="img" src={bottle} sx={{zIndex:"-100", position:"absolute", width:"270px", top:"37%", left:"50%", transform:"translate(-50%,-50%)"}}/>
      <Box sx={{position:"absolute", zIndex:"-1"}}> 
        <InteractiveWave width={240} height={300} color="#F9F5F5"></InteractiveWave>
      </Box>
      <Box sx={{fontSize:"20px",fontWeight:"700",p:"20px", pb:"10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
        {OceanData.title}</Box>
      <Box component="img" src={OceanData.images[0]?.imageUrl||baseOceanImg}
      sx={{minWidth: 180, minHeight: 120, width: 180, height: 120, objectFit: OceanData.images[0]?'cover':'contain', justifyItems:"center",alignItems:"center", alignContent:"center", justifyContents:"center", borderRadius:"1em", boxShadow: 3}} alt='CardImg'></Box>
      <Box sx={{display:"flex", justifyContent: "space-between", px: "25px", pt:"10px"}}>
        <Box sx={{width:"110px",fontSize:"13px", textAlign:"left", fontWeight:"300"}}>{dateConverter({dateString:OceanData.createDate, tag:"korean"})}</Box>
        <Box sx={{width:"110px",fontSize:"13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight:"400", textAlign:"right"}}>
          {OceanData.nickname}</Box>
      </Box>
      <Box sx={{ p:"20px",
        pt:"10px",
        pb: "30px",
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp : "1",
        WebkitBoxOrient: 'vertical',
        wordWrap: "break-word",
        mask:"linear-gradient(black, black, transparent)"}}>{OceanData.content}</Box>
        {[...Array(10)].map((_, index) => (<div key={index}>
          {OceanData.labels[index]&&<Box sx={{width:"15px",height:"10px",position:"absolute",left:"0%",
          bgcolor: labelColor(OceanData.labels[index]?.color)?.backgroundColor||"",top:`${(index+1) * 6}%`}}/>}
      </div>))}
    </Box>
  )
}

export default CardMini