import instance from "@/service/axiosInterceptor";

export interface wave {
  date:string,
  count:number
}

export interface WaveData{
  myWaveForm: Map<string, number>;
  myWaveList: Array<wave>;
  getMyWaveList: ()=>void;
  setMyWaveList: (res:Array<wave>)=>void;
  stringifyDate: (date:Date)=>string;
  matchWaveForm: (userWaveList:Array<wave>)=>Map<string, number>;
}

const waveUrl:string= "/my-page/wave"

const WaveStore = (): WaveData=>{
  return {
    myWaveForm: new Map<string, number>(),
    myWaveList: [],
    getMyWaveList: async function(){
      await instance({
        method: "GET",
        url: waveUrl,
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then((res)=>{
          this.setMyWaveList(res.data.data as Array<wave>);
          console.log("내 wave 가져왔습니다."+ this.myWaveList);
        })
        .catch((err)=>{
          console.log(err);
          window.alert("정보를 가져올 수 없습니다.");
        });
    },

    setMyWaveList: function(res:Array<wave>){

      //더미 데이터
      this.myWaveList= require("@test/waveData.json");

      // this.myWaveList= res;
      this.myWaveForm= this.matchWaveForm(this.myWaveList);
    },

    stringifyDate: function(date:Date){
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateString:string = year + month + day;
      return dateString;
    },

    matchWaveForm: function(userWaveList:Array<wave>){
      const LastDay = new Date();
      let date = new Date(LastDay);
      const emptyDate:number = 6-LastDay.getDay();
      date.setDate(LastDay.getDate()+ emptyDate - 70);
      let waveForm= new Map<string, number>();
      for(let i=0;i<70-emptyDate;i++){
        date.setDate(date.getDate() + 1);
        waveForm.set(this.stringifyDate(date), 0);
      }
      userWaveList.map((w:wave) => {
        if(waveForm.has(w.date))waveForm.set(w.date, w.count);
      });
      return waveForm;
    }
  }
}

export default WaveStore;