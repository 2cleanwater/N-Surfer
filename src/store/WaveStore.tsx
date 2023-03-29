import instance from "@/service/axiosInterceptor";

export interface waveData {
  date:string,
  count:number
}

export interface WaveStoreForm{
  // myWaveForm: Map<string, number>;
  // myWaveList: Array<waveData>;
  getWaveList: (userName:string,week:number,date:string, setValue:(waveData:Array<waveData>)=>void)=>void;
  // setMyWaveList: (res:Array<waveData>)=>void;
  stringifyDate: (date:Date)=>string;
  calFirstDate: (todayDate:Date)=>Date;
  matchWaveForm: (userWaveList:Array<waveData>)=>Map<string, number>;
}

const waveUrl:string= "/my-page/wave"

const WaveStore = (): WaveStoreForm=>{
  return {
    // myWaveForm: new Map<string, number>(),
    // myWaveList: [],
    getWaveList: async function(userName:string,week:number,date:string, setValue:(waveData:Array<waveData>)=>void){
      await instance({
        method: "GET",
        url: `/user/wave?userName=${userName}&month=${week}`,
        data:{"date":date},
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then((res)=>{
          setValue(res.data.waves as Array<waveData>);
          console.log("웨이브~")
        })
        .catch((err)=>{
          console.log(err);
          window.alert(userName + "의 Wave를 가져올 수 없습니다.");
        });
    },

    // setMyWaveList: function(res:Array<waveData>){

    //   //더미 데이터
    //   this.myWaveList= require("@test/waveData.json");

    //   // this.myWaveList= res;
    //   this.myWaveForm= this.matchWaveForm(this.myWaveList);
    // },

    stringifyDate: function(date:Date){
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateString:string = year + month + day;
      return dateString;
    },

    calFirstDate: function(todayDate:Date){
      const LastDay = new Date(todayDate);
      let date = new Date(todayDate);
      const emptyDate:number = 6-LastDay.getDay();
      date.setDate(LastDay.getDate()+ emptyDate - 69);
      return date;
    },

    matchWaveForm: function(userWaveList:Array<waveData>){
      const LastDay = new Date();
      let date = new Date(LastDay);
      const emptyDate:number = 6-LastDay.getDay();
      date.setDate(LastDay.getDate()+ emptyDate - 70);
      let waveForm= new Map<string, number>();
      for(let i=0;i<70-emptyDate;i++){
        date.setDate(date.getDate() + 1);
        waveForm.set(this.stringifyDate(date), 0);
      }
      userWaveList.map((w:waveData) => {
        if(waveForm.has(w.date))waveForm.set(w.date, w.count);
      });
      return waveForm;
    }
  }
}

export default WaveStore;