import axios from 'axios';


//임시 JSON 데이터
import userJsonData from "../testjson/useData.json"


interface waveList{
  date:string;
  count:number;
}

export interface UserData{
  useId?: number;
  userEmail?: string;
  provider?: string;
  userName?: string;
  userBirth?: string;
  userType?: string;
  imgUrl?: string;
  waveList?: waveList[];
}

export interface ProfileData{
  userData: UserData;
  setUserData: (userData:UserData)=>void;
  getUserData: ()=>void;
}

const ProfileStore = (): ProfileData => {
  return {
    userData: {},
    setUserData: function(userData: UserData){
      this.userData = JSON.parse(JSON.stringify(userData));},
    getUserData: async function(){
      // 백엔드 완료시 적용
      await axios({
        method: "GET",
        // 백엔드 서버
        // url: process.env.REACT_APP_BACKEND_SERVER+ "/my-page/profile",
        // 로컬 서버
        url: process.env.REACT_APP_LOCALHOST_BACKEND_SERVER+ "/my-page/profile",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
        })
        .then((res)=>{
          const data = res.data.data;
          this.setUserData(data as UserData);
          console.log(this.userData.imgUrl)
        }).catch((err) => {
          console.log(err);
          window.alert("정보를 가져올 수 없습니다.");
      });
      // this.setAuth(userJsonData[0] as UserData);
    },
  }
}

export default ProfileStore;