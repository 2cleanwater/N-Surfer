import instance from '@service/axiosInterceptor';
import AuthStore from './AuthStore';

export interface UserDataForm{
  useId?: number;
  userEmail?: string;
  provider?: string;
  nickname?: string;
  userBirth?: string;
  imgUrl?: string;
  totalWave?: number;
  todayWave?: number;
}

export interface ProfileStoreForm{
  userData: UserDataForm;
  setMyUserData: (userData:UserDataForm)=>void;
  getMyUserData: ()=>void;
  patchMyUserData: (formData:FormData)=>void;
  deleteMyUserData: ()=>void;
}

const profileUrl:string = "/my-page/profile";

const ProfileStore = (): ProfileStoreForm => {
  return {
    userData: {},
    setMyUserData: function(userData: UserDataForm){
      this.userData = JSON.parse(JSON.stringify(userData));
    },
    getMyUserData: async function(){
      await instance({
        method: "GET",
        url: profileUrl,
        headers: {
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          this.setMyUserData(res.data as UserDataForm);
        }).catch((err) => {
          console.log(err);
          window.alert("정보를 가져올 수 없습니다.");
          localStorage.clear();
          this.setMyUserData({});
          AuthStore().setIsLogout();
      });
    },
    patchMyUserData: async function(formData:FormData){
      await instance({
        method: "PATCH",
        url: profileUrl,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(((res)=>{
        console.log(res)
        // this.setMyUserData(res.data as UserDataForm);
        this.getMyUserData();
        window.alert("성공적으로 변경되었습니다.")
      }))
      .catch((err)=>{
        console.log(err);
        window.alert("변경에 실패했습니다.")
      })
    },
    deleteMyUserData: async function(){
      await instance({
        method: "DELETE",
        url: profileUrl,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((()=>{
        window.alert("성공적으로 탈퇴되었습니다.")
        this.setMyUserData({});
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