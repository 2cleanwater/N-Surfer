import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import InteractiveWave from '@/components/InteractiveWave';
import { OceanData } from '@/store/OceanStore';
import { useRootStore } from '@/provider/rootContext';

const CardMini = ({OceanData}:{OceanData:OceanData}) => {
  // css
  const mainBox = {
    width: 230, 
    height: 300, 
    boxShadow: 3, 
    m:3, 
    borderRadius:"1em", 
    ":hover": {transform: "scale(1.02)", cursor:"pointer"},
    justifyItems:"center",alignItems:"center", alignContent:"center", justifyContents:"center",
    position:"relative",
    textAlign:"center"
  }
  
  const value = useRootStore();
  const transData = value!.oceanStore.transDate;
  const navigate = useNavigate();
  const baseOceanImg:string= process.env.REACT_APP_OCEAN_BASE_IMG!;
  
  return (
    <Box sx={mainBox} onClick={()=>{navigate(`/card/${OceanData.cardId}`)}}> 
      <Box sx={{position:"absolute", zIndex:"-1"}}> 
        <InteractiveWave width={230} height={300} color="#E7BD73"></InteractiveWave>
      </Box>
      <Box sx={{fontSize:"20px",fontWeight:"700",padding:"20px", paddingBottom:"10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
        {OceanData.title}</Box>
      <Box component="img" src={OceanData.images[0]?.imageUrl||baseOceanImg}
      sx={{minWidth: 180, minHeight: 120, width: 180, height: 120, objectFit: 'cover', justifyItems:"center",alignItems:"center", alignContent:"center", justifyContents:"center", borderRadius:"1em", boxShadow: 3}} alt='CardImg'></Box>
      <Box sx={{display:"flex", justifyContent: "space-between", paddingLeft:"25px", paddingRight:"25px", paddingTop:"10px"}}>
        <Box sx={{width:"110px",fontSize:"13px", textAlign:"left", fontWeight:"300"}}>{transData(OceanData?.createDate ?? "")}</Box>
        <Box sx={{width:"110px",fontSize:"13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight:"400", textAlign:"right"}}>
          {OceanData.username}</Box>
      </Box>
      <Box sx={{ padding:"20px",
        paddingTop:"10px",
        paddingBottom: "30px",
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp : "1",
        WebkitBoxOrient: 'vertical',
        wordWrap: "break-word",
        mask:"linear-gradient(black, black, transparent)"}}>{OceanData.content}</Box>
      {[...Array(10)].map((_, index) => (<div key={index}>
        {OceanData.labels[index]&&<Box sx={{width:"15px",height:"10px",position:"absolute",left:"0%",
        backgroundColor: OceanData.labels[index]?.color||"",top:`${(index+1) * 6}%`}}/>}
      </div>))}
    </Box>
  )
}

export default CardMini