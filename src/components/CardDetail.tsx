import { useRootStore } from '@provider/rootContext';
import { OceanData, imageForm, labelColor, transDate } from '@store/OceanStore';
import { Box, IconButton} from '@mui/material'
import { observer } from 'mobx-react';

const CardDetail = ({oceanData}:{oceanData:OceanData}) => {
  const value = useRootStore()!;
  const baseOceanImg:string= process.env.REACT_APP_OCEAN_BASE_IMG!;

  return (
    <Box sx={{bgcolor:"waveBackground", width:"900px", alignItems:"center",borderRadius:"2em", p:"10px", mb:"50px",boxShadow: "5"}}>
      <Box sx={{bgcolor:"#2158A8", borderRadius:"1em",width:"750px", p:"25px", py:"55px",wordBreak:"break-all",m: "30px auto", mb:"15px", position:"relative", fontWeight:"bolder", fontSize:"30px", color: "white", display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center", boxShadow: "5"}}>
        {oceanData.title}
        <Box sx={{pr:"50px", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"20px", right:"0px"}}>
          by. {oceanData?.nickname ?? "Unknown"}</Box>
      </Box>
      <Box sx={{width:"800px", height:"80px", bgcolor:"#2E88C7", borderRadius:"1em",display:"flex", m: "0px auto", mb:"40px", justifyContent: "space-between", alignItems:"center", boxShadow: "5"}}>
        {oceanData.labels&&<Box sx={{display:"flex"}}>
          {oceanData.labels.map((element, index)=>(
            <Box component="label" key={index} htmlFor='' sx={{bgcolor:labelColor(element.color)?.backgroundColor, display:"flex", ml:"20px", borderRadius:"0.8em", pl:"10px", boxShadow: "5" }}>
              <Box sx={{m:"10px auto", mr:"10px", color: labelColor(element.color)?.textColor,}}>
                {element.name}
              </Box>
            </Box>
            ))}
        </Box>}
        <Box sx={{width:"110px",fontSize:"20px", textAlign:"center", fontWeight:"400", mr:"30px"}}>
          {transDate(oceanData?.createDate?? "")}</Box>
      </Box>
      {[...Array(3)].map((_, index) => (<div key={index}>
          {oceanData.images[index]&&<Box component="img" sx={{borderRadius:"1em", boxShadow: 5, width:"600px", mt:"30px"}} alt='CardImg' 
          src={oceanData.images[index].imageUrl}></Box>}
        </div>))}
      <Box sx={{ width:"720px", p:"40px", wordWrap: "break-word", backgroundColor:"#D3ECF9", borderRadius:"1em", m:"30px auto", fontSize:"20px", boxShadow: "5"}}>
        {oceanData?.content ?? ""}</Box>
    </Box>
  )
}

export default observer(CardDetail)

