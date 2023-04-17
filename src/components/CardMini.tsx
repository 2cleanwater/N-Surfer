import InteractiveWave from '@components/InteractiveWave';
import { labelColor, OceanData } from '@store/OceanStore';
import { dateConverter } from '@service/dateConverter';

import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react';

import { Box } from '@mui/material'


const CardMini = ({OceanData}:{OceanData:OceanData}) => {
  // css
  const mainBox = {
    width: "15em", 
    height: "18.7em", 
    boxShadow: 3, 
    m:"2em",
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
      <Box component="img" src={bottle} sx={{zIndex:"-100", position:"absolute", width:"17em", top:"37%", left:"50%", transform:"translate(-50%,-50%)"}}/>
      <Box sx={{position:"absolute", zIndex:"-1"}}> 
        <InteractiveWave width={240} height={300} color="#F9F5F5" percent={1.8}/>
      </Box>

      <Box sx={{display:"flex", justifyContent: "space-between", px: "0.5em"}}>
        <Box sx={{width:"110px",fontSize:"13px", textAlign:"left", fontWeight:"300"}}>
          {dateConverter({dateString:OceanData.createDate, tag:"."})}</Box>
        <Box sx={{width:"110px",fontSize:"13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight:"400", textAlign:"right"}}>
          {OceanData.nickname}</Box>
      </Box>

      <Box component="img" src={OceanData.images[0]?.imageUrl||baseOceanImg}
      sx={{minWidth: "12em", minHeight: "7em", width: "12em", height: "7em", m:"1em" ,objectFit: OceanData.images[0]?'cover':'contain', borderRadius:"1em", boxShadow: 3}} alt='CardImg'></Box>

      <Box sx={{fontSize:"20px",fontWeight:"700",px:"0.5em",py:"0.3em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
        {OceanData.title}</Box>
      
      <Box sx={{ 
        p:"1em",
        pt:"0em",
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp : "2",
        WebkitBoxOrient: 'vertical',
        wordWrap: "break-word",
        mask:"linear-gradient(black, black, transparent)"}}>{OceanData.content}</Box>

      {[...Array(10)].map((_, index) => (<div key={index}>
        {OceanData.labels[index]&&<Box sx={{width:"1em",height:"0.7em",position:"absolute",left:"0%",top:`${(index+1) * 1.6}em`,
        bgcolor: labelColor(OceanData.labels[index]?.color)?.backgroundColor||""}}/>}
      </div>))}
    </Box>
  )
}

export default observer(CardMini)