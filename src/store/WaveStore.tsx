import instance from "@/service/axiosInterceptor";

export interface wave {
  date:string,
  count:number
}

export interface waveListRes {
  wave: Array<wave>
}

export interface WaveData{
  waveForm: Map<string, number>;
  userWaveList: Array<wave>;
  getUserWaveList: ()=>void;
  setUserWaveList: (res:waveListRes)=>void;
  stringifyDate: (date:Date)=>string;
  // makeWaveForm: ()=>Map<string, number>;
  matchWaveForm: ()=>Map<string, number>;
}

const waveUrl:string= ""

const WaveStore = (): WaveData=>{
  return {
    waveForm: new Map<string, number>(),
    userWaveList: [],
    getUserWaveList: async function(){
      await instance({
        method: "GET",
        url: waveUrl,
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then((res)=>{
          this.setUserWaveList(res.data as waveListRes);
          console.log("wave 가져왔습니다."+ this.userWaveList);
        })
        .catch((err)=>{
          console.log(err);
          window.alert("정보를 가져올 수 없습니다.");
        });
    },
    setUserWaveList: function(res:waveListRes){
      //더미 데이터
      this.userWaveList= require("@test/waveData.json");
      // this.userWaveList= res.wave;
    },
    stringifyDate: function(date:Date){
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateString:string = year + month + day;
      return dateString;
    },
    // makeWaveForm: function (){
    //   const LastDay = new Date();
    //   let date = new Date(LastDay);
    //   const emptyDate:number = 6-LastDay.getDay();
    //   date.setDate(LastDay.getDate()+ emptyDate - 70);
    //   let emptyWaveForm= new Map<string, number>();
    //   for(let i=0;i<70-emptyDate;i++){
    //     date.setDate(date.getDate() + 1);
    //     emptyWaveForm.set(this.stringifyDate(date), 0);
    //   }
    //   return emptyWaveForm;
    // },
    matchWaveForm: function(){
      const LastDay = new Date();
      let date = new Date(LastDay);
      const emptyDate:number = 6-LastDay.getDay();
      date.setDate(LastDay.getDate()+ emptyDate - 70);
      let waveForm= new Map<string, number>();
      for(let i=0;i<70-emptyDate;i++){
        date.setDate(date.getDate() + 1);
        waveForm.set(this.stringifyDate(date), 0);
      }
      this.userWaveList.map((w:wave) => {
        if(waveForm.has(w.date))waveForm.set(w.date, w.count);
      });
      return waveForm;
    }
  }
}

export default WaveStore;