import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  putUserData: (formData:FormData)=>void;
  deleteUserData: ()=>void;
}

// 백엔드 서버
// const BackendUrl:string = process.env.REACT_APP_BACKEND_SERVER+ "/my-page/profile",
// 로컬 서버
const BackendUrl:string = process.env.REACT_APP_LOCALHOST_BACKEND_SERVER+ "/my-page/profile"

const ProfileStore = (): ProfileData => {
  return {
    userData: {},
    setUserData: function(userData: UserData){
      this.userData = JSON.parse(JSON.stringify(userData));},
    getUserData: async function(){
      await axios({
        method: "GET",
        url: BackendUrl,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
        })
        .then((res)=>{
          const data = res.data.data;
          this.setUserData(data as UserData);
        }).catch((err) => {
          console.log(err);
          window.alert("정보를 가져올 수 없습니다.");
      });
    },
    putUserData: async function(formData:FormData){
      await axios({
        method: "PUT",
        // url: BackendUrl,
        url: "https://5c843bdb-6dd4-4dcc-aa90-5ec03fbbb883.mock.pstmn.io/my-page/profile",
        data: formData,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data"'
        }
      })
      .then(((res)=>{
        console.log(res)
        // const data = res.data.data;
        // this.setUserData(data as UserData);
        window.alert("성공적으로 변경되었습니다.")
    }))
    .catch((err)=>{
      console.log(err);
      window.alert("변경에 실패했습니다.")
    })
    },
    deleteUserData: async function(){
      await axios({
        method: "DELETE",
        url: BackendUrl,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
      .then((()=>{
        localStorage.clear();
        window.alert("성공적으로 탈퇴되었습니다.")
      }))
      .catch((err)=>{
        console.log(err);
        window.alert("탈퇴에 실패했습니다.")
      })
    } 
  }
}

export default ProfileStore;