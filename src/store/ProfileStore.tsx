import instance from '@service/axiosInterceptor';
import AuthStore from './AuthStore';

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

const profileUrl:string = "/my-page/profile";

const ProfileStore = (): ProfileData => {
  return {
    userData: {},
    setUserData: function(userData: UserData){
      this.userData = JSON.parse(JSON.stringify(userData));},
    getUserData: async function(){
      await instance({
        method: "GET",
        url: profileUrl,
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then((res)=>{
          this.setUserData(res.data as UserData);
          console.log(this.userData);
        }).catch((err) => {
          console.log(err);
          window.alert("정보를 가져올 수 없습니다.");
          this.setUserData({});
          AuthStore().setIsLogout();
          localStorage.clear();
      });
    },
    putUserData: async function(formData:FormData){
      await instance({
        method: "PUT",
        url: profileUrl,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data"'
        }
      })
      .then(((res)=>{
        console.log(res)
        this.setUserData(res.data as UserData);
        window.alert("성공적으로 변경되었습니다.")
      }))
      .catch((err)=>{
        console.log(err);
        window.alert("변경에 실패했습니다.")
      })
    },
    deleteUserData: async function(){
      await instance({
        method: "DELETE",
        url: profileUrl,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((()=>{
        window.alert("성공적으로 탈퇴되었습니다.")
        this.setUserData({});
        AuthStore().setIsLogout();
        localStorage.clear();
      }))
      .catch((err)=>{
        console.log(err);
        window.alert("탈퇴에 실패했습니다.");
      })
    } 
  }
}

export default ProfileStore;