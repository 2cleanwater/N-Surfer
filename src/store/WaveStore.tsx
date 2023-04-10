import instance from "@service/axiosInterceptor";
import LoadingStore from "@store/LoadingStore";
import { dateConverter } from "@service/dateConverter";

export interface waveData {
  date:string,
  count:number
}

export interface WaveStoreForm{
  getWaveList: (nickname:string, startDate:Date, setValue:(waveData:Array<waveData>)=>void)=>void;
  calFirstDate: (todayDate:Date)=>Date;
  matchWaveForm: (userWaveList:Array<waveData>, startDate:Date)=>Array<waveData>;
}

const WaveStore = (): WaveStoreForm=>{
  return {
    getWaveList: async function(nickname:string, startDate:Date, setValue:(waveData:Array<waveData>)=>void){
      const firstDate = dateConverter({date:startDate,tag:"-"})
      await instance({
        method: "GET",
        url: `/user/wave?nickname=${nickname}&startDate=${firstDate}`,
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then((res)=>{
          LoadingStore()._IsLoading_True("waveList");
          setValue(this.matchWaveForm(res.data.waves,startDate)as Array<waveData>);

          LoadingStore()._IsLoading_False("waveList");
        })
        .catch((err)=>{
          console.log(err);
          window.alert(nickname + "의 Wave를 가져올 수 없습니다.");
        });
    },

    calFirstDate: function(todayDate:Date){
      const LastDay = new Date(todayDate);
      let date = new Date(todayDate);
      //일요일로 맞춘 후 70일 과거 날짜 출력)
      const emptyDate:number = 6-LastDay.getDay();
      date.setDate(LastDay.getDate()+ emptyDate - 69);
      return date;
    },

    matchWaveForm: function(userWaveList:Array<waveData>,startDate:Date){
      let waveForm:Array<waveData>= [];
      let timeline = new Date(startDate);
      const today = new Date();
      for(let i=0;i<70;i++){
        const isDateExist:number=userWaveList.findIndex(wave=>wave.date === dateConverter({date:timeline,tag:""}));
        if(timeline.getTime()<today.getTime()){
          if(isDateExist===-1){
            waveForm.push({date:dateConverter({date:timeline,tag:""}),count:0});
          }
          else{
            waveForm.push({date:userWaveList[isDateExist].date,count:userWaveList[isDateExist].count});
          }
        }
        // 70일까지 날짜 올리기
        timeline.setDate(timeline.getDate() + 1);
      }
      return waveForm;
    }
  }
}

export default WaveStore;