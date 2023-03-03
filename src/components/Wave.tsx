import { Box } from '@mui/material';
import { observer } from 'mobx-react'

import { useRootStore } from '@provider/rootContext';
import WaveBox from '@components/WaveBox';

//테스트 파일
// import testJson from '@'

const Wave = () => {
  const value = useRootStore()!;

  // 기능 완료시 변경
  // const waveList = value.profileStore.userData.waveList;
  const userWaveList = require("@test/waveData.json");
  interface wave {
    date:string,
    count:number
  }

  function stringifyDate(date:Date){
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateString:string = year + month + day;
    return dateString;
  }

  function makeWaveForm(){
    const LastDay = new Date();
    let date = new Date(LastDay);
    const emptyDate:number = 6-LastDay.getDay();
    date.setDate(LastDay.getDate()+ emptyDate - 70);
    let waveForm= new Map<string, number>();
    for(let i=0;i<70-emptyDate;i++){
      date.setDate(date.getDate() + 1);
      waveForm.set(stringifyDate(date), 0);
    }
    return waveForm;
  }

  function matchWaveForm(){
    let waveForm = makeWaveForm();
    userWaveList.map((w:wave) => {
      if(waveForm.has(w.date))waveForm.set(w.date, w.count);
    });
    return waveForm;
  }
  
  const waveForm = matchWaveForm();
  console.log(waveForm)
  return (
    <Box sx={{ backgroundColor:"white", width: "800px", height: "300px", margin: "2em", display: "flex" }}>
      {[...Array(10)].map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex",flexDirection:"column"  }}>
          {[...Array(7)].map((_, colIndex) => {
            const index = rowIndex*7 + colIndex;
            let item:wave={ date: '', count: 0 };
            Array.from(waveForm).map(([date, count], mapIndex) => {
              if (mapIndex === index) item = { date, count };
            });
            return (
              <div key={`${colIndex}-${rowIndex}`} style={{ width: "100%", border: "1px solid black" }}>
                {item ? (
                  <WaveBox date={item.date} count={item.count}/>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </Box>
  )
}

export default observer(Wave)