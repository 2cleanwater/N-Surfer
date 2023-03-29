import { useRootStore } from '@/provider/rootContext';
import { OceanData, imageForm } from '@/store/OceanStore';
import { Box, IconButton} from '@mui/material'
import { observer } from 'mobx-react';

const CardDetail = ({oceanData}:{oceanData:OceanData}) => {
  const value = useRootStore()!;
  const transData = value!.oceanStore.transDate;
  const baseOceanImg:string= process.env.REACT_APP_OCEAN_BASE_IMG!;

  return (
    <Box sx={{backgroundColor:"waveBackground", width:"900px", alignItems:"center",borderRadius:"2em", padding:"10px", marginBottom:"50px",boxShadow: "5"}}>
      <Box sx={{backgroundColor:"#2158A8", borderRadius:"1em",width:"750px", padding:"25px",paddingTop:"55px", paddingBottom:"55px",wordBreak:"break-all",margin: "30px auto", marginBottom:"15px", position:"relative", fontWeight:"bolder", fontSize:"30px", color: "white", display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center", boxShadow: "5"}}>
        {oceanData.title}
        <Box sx={{paddingRight:"50px", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"20px", right:"0px"}}>
          by. {oceanData?.username ?? "Unknown"}</Box>
      </Box>
      <Box sx={{width:"800px", height:"80px", backgroundColor:"#2E88C7", borderRadius:"1em",display:"flex", margin: "0px auto", marginBottom:"40px", justifyContent: "space-between", alignItems:"center", boxShadow: "5"}}>
        {oceanData.labels&&<Box sx={{display:"flex"}}>
          {oceanData.labels.map((element, index)=>(
            <Box component="label" key={index} htmlFor='' sx={{backgroundColor:element.color, display:"flex", marginLeft:"20px", borderRadius:"0.8em", paddingLeft:"10px", boxShadow: "5" }}>
              <Box sx={{margin:"10px auto", marginRight:"10px", color: "white",}}>
                {element.name}
              </Box>
            </Box>
            ))}
        </Box>}
        <Box sx={{width:"110px",fontSize:"20px", textAlign:"center", fontWeight:"400", marginRight:"30px"}}>
          {transData(oceanData?.createDate?? "")}</Box>
      </Box>
      {[...Array(3)].map((_, index) => (<div key={index}>
          {oceanData.images[index]&&<Box component="img" sx={{borderRadius:"1em", boxShadow: 5, width:"600px", marginTop:"30px"}} alt='CardImg' 
          src={oceanData.images[index].imageUrl}></Box>}
        </div>))}
      <Box sx={{ width:"720px", padding:"40px", wordWrap: "break-word", backgroundColor:"#D3ECF9", borderRadius:"1em", margin:"30px auto", fontSize:"20px", boxShadow: "5"}}>
        {oceanData?.content ?? ""}</Box>
    </Box>
  )
}

export default observer(CardDetail)

