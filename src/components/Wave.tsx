import { useRootStore } from '@provider/rootContext';
import WaveBox from '@components/WaveBox';
import { waveData } from '@store/WaveStore';
import Loading from '@components/Loading';
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
  height: "55px",
  lineHeight: "60px"
});

// interface
interface hoverDate {
  date: string,
  number: number
}

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

  // 표현식으로 변화된 wave? 필요한가?
  // const [userWaveForm, setUserWaveForm]= useState<Array<waveData>>();

  // server data ==============================================
  // 날짜가 바뀔 때마다 웨이브를 불러오기 
  useEffect(()=>{
    waveStore.getWaveList(nickname,firstDate,setWaveList);
    // console.log(waveList)
    // setUserWaveForm(waveStore.matchWaveForm(waveList, firstDate));
  },[stringDate, value.profileStore.userData.todayWave])

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
    console.log(firstDate)
    setStringDate(dateConverter({date:firstDate, tag:""}))   
  }

  return (
    <Box sx={{ 
      m: "2em", 
      bgcolor:"waveBackground",
      justifyContent:"center",
      alignContent: "center",
      width: "900px",
      borderRadius:"2em",
      pt:"20px",
      pb:"40px",
      position:"relative"
      }}>
      <Box sx={{display:"flex", justifyContent: "space-between"}}>
        <Box sx={{textAlign:"left", color:"white", pl:"40px",pb:"20px", fontSize:"2em", fontWeight:"Bold", textShadow:"2px 2px 2px gray"}}>
          "{nickname}"님의 파도</Box>
        <Box id="singleItemValue" sx={{width:"220px", height:"30px", display:"flex", flexDirection:"row", justifyContent: "space-between", alignItems: "center", p:"10px", mr:"40px", bgcolor:"#F2E0C9",borderRadius: "30px",boxShadow: 3}}>
          {hoverData.date?
          (<Box sx={{fontWeight:"bold", color:"#0F8DBF", pl:"10px"}}>{dateConverter({dateString:hoverData.date,tag:"korean"})} : {hoverData.number}번</Box>):
          (<div></div>)}
          <Tooltip title={<div style={{fontSize:"15px"}}>파도 멈추기</div>}>
            <Box component="img" id="waveToggle"
            sx={{width:"30px", height:"30px", justifyContent:"center",alignContent: "center",borderRadius:"2em", bgcolor: waveToggle?"DarkBlue":"White", 
            "&:hover": {
              transform: "scale(1.1)",
              cursor : "pointer"
            },}} 
            src={waveIcon} onClick={()=>{setWaveToggle(!waveToggle)}}/>
          </Tooltip>  
        </Box>
      </Box>

      <Box sx={{ml:"150px",p:"5px",fontSize:"20px", color:"#0067a3", textShadow:"1px 1px 2px gray"}}>
        {dateConverter({date:firstDate, tag:"korean"})}</Box>

      <Box sx={{display:"flex",justifyContent:"center",
      alignContent: "center"}}>
        <Box component="ul" sx={{display:"flex", flexDirection:"column", listStyleType: "none", textAlign:"center", p: "0px", m:"0px", pr:"10px", justifyContent: "center", alignItems: "center"}} >
          <DayList>SUN</DayList>
          <DayList>MON</DayList>
          <DayList>TUE</DayList>
          <DayList>WED</DayList>
          <DayList>THU</DayList>
          <DayList>FRI</DayList>
          <DayList>SAT</DayList>
        </Box>
        {value.loadingStore._IsLoading_WaveList?
          <Loading/>:
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
                  <div key={`${colIndex}-${rowIndex}`} style={{ width: "100%"}} onClick={()=>{
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
      <IconButton type="submit" size="small" sx={{position:"absolute", bottom:"7%", left:"2em", color: "white", bgcolor:"#0F7B6C", 
        "&:hover":{
          color: "#0F7B6C", bgcolor:"white",
          transform: "scale(1.1)",
          cursor : "pointer"
        }}} onClick={(e)=>{changeDate(firstDate, -70); setHoverData({date:"",number:0}); setHoverIndex(70);}}>
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <IconButton type="submit" size="small" disabled={isSameDay(firstDate,latestDate)?true:false} sx={{position:"absolute", bottom:"7%",right:"2em", color: "white", bgcolor:"#0F7B6C", 
        "&:hover":{
          color: "#0F7B6C", bgcolor:"white",
          transform: "scale(1.1)",
          cursor : "pointer"
        }}} onClick={(e)=>{changeDate(firstDate, +70); setHoverData({date:"",number:0});setHoverIndex(70);}}>
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default observer(Wave)