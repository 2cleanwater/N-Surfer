import { useRootStore } from '@provider/rootContext';
import WaveBox from '@components/waveBox/WaveBox';
import { waveData } from '@store/WaveStore';
import Loading from '@components/utils/Loading';
import { dateConverter } from '@service/dateConverter';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, styled, Tooltip } from '@mui/material';

// css
const DayList = styled("li")({
  flexGrow: "1",
  display: "inline-block",
  height: "2em",
  lineHeight: "4em"
});

// interface
interface hoverDate {
  date: string,
  number: number
}

const BlueCss = styled("span")({
  color:"#0679C0",
})

const Wave = ({nickname}:{nickname:string}) => {
  const value = useRootStore()!;
  const waveStore = value.waveStore;
  const waveIcon:string= process.env.REACT_APP_WAVEICON!;
  // 오늘 날짜 
  const latestDate = waveStore.calFirstDate(new Date());
  // wave의 First date
  const [firstDate,setFirstDate] = useState<Date>(latestDate);

  // 날짜를 문자형식으로
  const [stringDate, setStringDate]= useState<string>(dateConverter({date:firstDate,tag:""}));
  // date, date의 wave 갯수, index
  const [hoverIndex, setHoverIndex]= useState<number>(70);
  const [hoverData, setHoverData]= useState<hoverDate>({date:"",number:0});

  // wave 움직임
  const [waveToggle, setWaveToggle]= useState(false);

  // 받아온 waveList
  const [waveList, setWaveList]= useState<Array<waveData>>([]);

  // server data ==============================================
  // 날짜가 바뀔 때마다 웨이브를 불러오기 
  useEffect(()=>{
    waveStore.getWaveList(nickname,firstDate,setWaveList);
  },[stringDate])

  //Click 체크
  const isClicked=(index:number)=>{
    if(index===hoverIndex){
      return true
    }else return false
  }
  
  // 날짜 동일 확인
  const isSameDay = (target1:Date, target2: Date) => {
    return dateConverter({date:target1, tag:""}) === dateConverter({date:target2, tag:""})
  }

  // 날짜 변경
  const changeDate= async(date:Date, number:number)=>{
    date.setDate(date.getDate()+ number);
    setFirstDate(date);
    setStringDate(dateConverter({date:firstDate, tag:""}))   
  }

  // string 날짜 / 형태로 변경
  const slashFormattedDate= (date:string)=>{
    const formatted_date:string = `${date.slice(4, 6)}/${date.slice(6, 8)}`;
    return formatted_date
  }
  
  return (
    <Box sx={{ 
      m: "2em", 
      bgcolor:"waveBackground",
      justifyContent:"center",
      alignContent: "center",
      width: "55em",
      borderRadius:"2em",
      pt:"1em",
      position:"relative"
      }}>
      <Box sx={{display:"flex", justifyContent: "space-between", pb:"1em"}}>
        <Box sx={{textAlign:"left",color:"white", pl:"1.5em", pt:"1em", fontSize:"2em", fontWeight:"Bold", textShadow:"2px 2px 2px gray"}}>
          "<BlueCss>{nickname}</BlueCss>" 님의 파도</Box>
        <Box id="singleItemValue" sx={{width:"15em", display:"flex", flexDirection:"row", justifyContent: "space-between", alignItems: "center", p:"0.5em", mr:"1em", bgcolor:"#F2E0C9",borderRadius: "30px",boxShadow: 3}}>
          {hoverData.date?
          (<Box sx={{fontWeight:"bold", color:"#0F8DBF", pl:"1em", textAlign:"center",ml:"1em"}}>
            <Box>{dateConverter({dateString:hoverData.date,tag:"korean"})}</Box>
            <Box sx={{fontSize:"25px", color:hoverData.number>12?"#fff6a9":"#014B60", textShadow: hoverData.number>12?"0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000":""}}>
              {hoverData.number} 번</Box>
          </Box>):
          (<div></div>)}
          <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>파도 멈추기</div>}>
            <Box component="img" id="waveToggle"
            sx={{width:"3em", height:"3em", justifyContent:"center",alignContent: "center",borderRadius:"2em", bgcolor: waveToggle?"DarkBlue":"White", 
            "&:hover": {
              transform: "scale(1.1)",
              cursor : "pointer"
            },}} 
            src={waveIcon} onClick={()=>{setWaveToggle(!waveToggle)}}/>
          </Tooltip>  
        </Box>
      </Box>

      <Box sx={{pt:"0.5em",pb:"0.5em",pl:"9.3em",pr:"6.8em",fontSize:"15px", color:"#0067a3", textShadow:"1px 1px 2px gray", display:"flex", justifyContent: "space-between"}}>
        {[...Array(10)].map((_, index) => (
          <Box key={index}>{waveList.length>0?slashFormattedDate(waveList[index*7].date):""}</Box>
        ))}
      </Box>

      <IconButton type="submit" size="medium" 
      sx={{position:"absolute", top:"5em", left:"1em", color: "white", bgcolor:"#0F7B6C", 
        "&:hover":{
          color: "#0F7B6C", bgcolor:"white",
          transform: "scale(1.1)",
          cursor : "pointer"
        }}} onClick={(e)=>{changeDate(firstDate, -70); setHoverData({date:"",number:0}); setHoverIndex(70);}}>
        <ChevronLeftIcon fontSize="medium" />
      </IconButton>
      
      <IconButton type="submit" size="medium" disabled={isSameDay(firstDate,latestDate)?true:false} 
      sx={{position:"absolute", top:"5em",right:"1em", color: "white", bgcolor:"#0F7B6C", 
        "&:hover":{
          color: "#0F7B6C", bgcolor:"white",
          transform: "scale(1.1)",
          cursor : "pointer"
        }}} onClick={(e)=>{changeDate(firstDate, +70); setHoverData({date:"",number:0});setHoverIndex(70);}}>
        <ChevronRightIcon fontSize="medium" />
      </IconButton>

      <Box sx={{display:"flex",justifyContent:"center", alignContent: "center"}}>
        <Box component="ul" sx={{display:"flex", flexDirection:"column", listStyleType: "none", textAlign:"center", p: "0px", m:"0px", pr:"0.1em", justifyContent: "center", alignItems: "center"}} >
          <DayList>SUN</DayList>
          <DayList>MON</DayList>
          <DayList>TUE</DayList>
          <DayList>WED</DayList>
          <DayList>THU</DayList>
          <DayList>FRI</DayList>
          <DayList>SAT</DayList>
        </Box>
        {value.waveStore.isWaveLoading?
          <Box sx={{display: "flex", width:"47em", height:"26em"}}><Loading/></Box>:
          <Box sx={{display: "flex",}}>
          {[...Array(10)].map((_, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex",flexDirection:"column"}}>
              {[...Array(7)].map((_, colIndex) => {
                const index = rowIndex*7 + colIndex;
                let item:waveData={ date: '', count: 0 };
                waveList&&Array.from(waveList).map(({date, count}, mapIndex) => {
                  if (mapIndex === index) item = { date, count };
                });
                return (
                  <div key={`${colIndex}-${rowIndex}`} style={{ width: "100%" }} onClick={()=>{
                    if(hoverIndex===index) {
                      setHoverData({date:"",number:0});
                      setHoverIndex(70);
                    } else {
                      setHoverData({date:item.date,number:item.count});
                      setHoverIndex(index);
                    }
                  }}>
                    {item.date ? (
                      <WaveBox date={item.date} count={item.count} toggle={waveToggle} isClicked={isClicked(index)}/>
                    ) : null}
                  </div>);
              })}
            </div>
          ))}
          </Box>}
      </Box>
      <Box sx={{display:"flex", justifyContent: "flex-end", alignItems: "center", textAlign:"center", mr:"2em", mt:"1em",mb:"1em"}}>
        Less
        <Box sx={{width:"1em",height:"1em",m:"0.1em", bgcolor:"#F4FAFB"}}></Box>
        <Box sx={{width:"1em",height:"1em",m:"0.1em",  bgcolor:"#C3E3F6"}}></Box>
        <Box sx={{width:"1em",height:"1em",m:"0.1em",  bgcolor:"#9CCCE8"}}></Box>
        <Box sx={{width:"1em",height:"1em",m:"0.1em",  bgcolor:"#2E88C7"}}></Box>
        <Box sx={{width:"1em",height:"1em",m:"0.1em",  bgcolor:"#01234C"}}></Box>
        More
      </Box>
    </Box>
  )
}

export default observer(Wave)