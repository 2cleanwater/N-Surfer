import { OceanData, labelColor } from '@store/OceanStore';
import { dateConverter } from '@service/dateConverter';
import { useRootStore } from '@provider/rootContext';

import { observer } from 'mobx-react';
import { useEffect } from 'react';

import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const CardDetail = ({oceanData}:{oceanData:OceanData}) => {
  const value = useRootStore();
  const navigate = useNavigate();

  return (
    <Box sx={{bgcolor:"waveBackground", width:"57em", alignItems:"center",borderRadius:"2em", p:"0.5em", mb:"3em",boxShadow: "5"}}>
      <Box sx={{bgcolor:"#2158A8", borderRadius:"1em",width:"25em", p:"0.8em", py:"1.5em",wordBreak:"break-all",m: "1em auto", position:"relative", fontWeight:"bolder", fontSize:"30px", color: "white", display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center", boxShadow: "5"}}>
        {oceanData.title}
        <Box onClick={()=>{oceanData?.nickname&&navigate(`/user/profile?nickname=${oceanData.nickname}`)}} sx={{pr:"2em", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"1em", right:"0","&:hover":{cursor:"pointer", scale:"1.1"}}}>
          by. {oceanData?.nickname ?? "Unknown"}</Box>
      </Box>
      <Box sx={{width:"50em", height:"5em", bgcolor:"#2E88C7", borderRadius:"1em",display:"flex", m: "0px auto", mb:"1em", justifyContent: "space-between", alignItems:"center", boxShadow: "5"}}>
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
          {oceanData.images[index]&&<Box component="img" sx={{borderRadius:"1em", boxShadow: 5, width:"40em", mt:"1em"}} alt='CardImg' 
          src={oceanData.images[index].imageUrl}></Box>}
        </div>))}
      <Box sx={{ width:"40em", p:"2em", wordBreak: "break-all", backgroundColor:"#D3ECF9", borderRadius:"1em", m:"1em auto", fontSize:"20px", boxShadow: "5",  whiteSpace:"pre-line"}}>
        {oceanData?.content ?? "내용이 없습니다."}</Box>
    </Box>
  )
}

export default observer(CardDetail)

