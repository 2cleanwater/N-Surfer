import { OceanData, labelColor } from '@store/OceanStore';
import { dateConverter } from '@service/dateConverter';
import { useRootStore } from '@provider/rootContext';

import { observer } from 'mobx-react';
import { useEffect } from 'react';

import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';

const CardDetail = ({oceanData}:{oceanData:OceanData}) => {
  const value = useRootStore();
  const navigate = useNavigate();
  const profileBaseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;

  return (
    <Box sx={{bgcolor:"waveBackground", width:"57em", alignItems:"center",borderRadius:"2em", p:"0.5em", mb:"3em",boxShadow: "5"}}>
      <Box sx={{bgcolor:"#2158A8", borderRadius:"1em",width:"25em", p:"0.8em", py:"1.5em",wordBreak:"break-all",m: "1em auto", position:"relative", fontWeight:"bolder", fontSize:"30px", color: "white", display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center", boxShadow: "5"}}>
        {oceanData.title}
        <Box sx={{pl:"1em", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"1em", left:"0", display:"flex", alignItems:"center"}}>
          <VisibilityIcon sx={{mr:"0.5em"}}/> 12,345
          {/* {oceanData?.nickname.toLocaleString('ko-KR') ?? "Unknown"} */}
          </Box>
        <Box onClick={()=>{oceanData?.nickname&&navigate(`/user/profile?nickname=${oceanData.nickname}`)}} sx={{pr:"1em", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"1em", right:"0",display:"flex", alignItems:"center","&:hover":{cursor:"pointer", scale:"1.05"}}}>
          {oceanData?.nickname ?? "Unknown"}
          <Box component="img" sx={{ml:"0.5em",width: "1.5em", height: "1.5em", objectFit:"cover",objectPosition:"center" ,borderRadius: "50%"}} alt="profile"
          src={profileBaseImg} />
          {/* src={oceanData.userProfileImg?oceanData.userProfileImg:profileBaseImg} /> */}
        </Box>
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

