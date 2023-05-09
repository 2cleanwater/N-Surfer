import instance from '@service/axiosInterceptor';
import AuthStore from '@store/AuthStore';

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
  isUserDataLoading: boolean;
  setIsUserDataLoading: (loading: boolean) => void;
  setMyUserData: (userData:UserDataForm)=>void;
  getMyUserData: ()=>void;
  patchMyUserData: (formData:FormData)=>void;
  deleteMyUserData: ()=>void;
}

const profileUrl:string = "/my-page/profile";

const ProfileStore = (): ProfileStoreForm => {
  return {
    userData: {},
    isUserDataLoading: false,
    setIsUserDataLoading: function(loading: boolean){
      this.isUserDataLoading=loading;
    },
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
          this.setIsUserDataLoading(false)
        }).catch((err) => {
          console.log(err);
          localStorage.clear();
          this.setMyUserData({});
          AuthStore().setIsLogout();
          this.setIsUserDataLoading(false)
      });
    },
    patchMyUserData: async function(formData:FormData){
      this.setIsUserDataLoading(true)
      await instance({
        method: "PATCH",
        url: profileUrl,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(((res)=>{
        this.getMyUserData();
        window.alert("성공적으로 변경되었습니다.")
      }))
      .catch((err)=>{
        console.log(err);
        window.alert("변경에 실패했습니다.")
        this.setIsUserDataLoading(false)
      })
    },
    deleteMyUserData: async function(){
      this.setIsUserDataLoading(true)
      await instance({
        method: "DELETE",
        url: "/user",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((()=>{
        window.alert("성공적으로 탈퇴되었습니다.")
        this.setMyUserData({});
        AuthStore().setIsLogout();
        localStorage.clear();
        this.setIsUserDataLoading(false)
      }))
      .catch((err)=>{
        console.log(err);
        window.alert("탈퇴에 실패했습니다.");
        this.setIsUserDataLoading(false)
      })
    }
  }
}

export default ProfileStore;