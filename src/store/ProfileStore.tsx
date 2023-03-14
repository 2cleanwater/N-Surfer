import instance from '@service/axiosInterceptor';
import AuthStore from './AuthStore';

export interface UserData{
  useId?: number;
  userEmail?: string;
  provider?: string;
  userName?: string;
  userBirth?: string;
  userType?: string;
  imgUrl?: string;
  isOwned?: boolean;
}

export interface ProfileData{
  userData: UserData;
  setMyUserData: (userData:UserData)=>void;
  getMyUserData: ()=>void;
  patchMyUserData: (formData:FormData)=>void;
  deleteMyUserData: ()=>void;
}

const profileUrl:string = "/my-page/profile";

const ProfileStore = (): ProfileData => {
  return {
    userData: {},
    setMyUserData: function(userData: UserData){
      this.userData = JSON.parse(JSON.stringify(userData));
    },
    getMyUserData: async function(){
      await instance({
        method: "GET",
        url: profileUrl,
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then((res)=>{
          this.setMyUserData(res.data as UserData);
          console.log(this.userData);
          return res.data;
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
          'Content-Type': 'multipart/form-data"'
        }
      })
      .then(((res)=>{
        console.log(res)
        this.setMyUserData(res.data as UserData);
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