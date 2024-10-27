import instance from '@service/axiosInterceptor';
import AuthStore from '@store/AuthStore';
import Swal from 'sweetalert2'

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
        // window.alert("성공적으로 변경되었습니다.")
        Swal.fire(
          '변경 완료!',
          '보여줄게 완전히 달라진 나 🙋‍♀️',
          'success'
        )
        this.getMyUserData();
      }))
      .catch((err)=>{
        console.log(err);
        // window.alert("변경에 실패했습니다.")
        Swal.fire({
          icon: "error",
          title: "변경 실패...",
          text: "신호가 바닷속으로 가라앉았습니다!! 꼬르륵 🙃",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
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
        // window.alert("성공적으로 탈퇴되었습니다.")
        Swal.fire(
          '탈퇴 완료ㅠㅠ',
          '언젠간 다시 돌아오세요! 🖐',
          'success'
        )
        this.setMyUserData({});
        AuthStore().setIsLogout();
        localStorage.clear();
        this.setIsUserDataLoading(false)
      }))
      .catch((err)=>{
        console.log(err);
        // window.alert("탈퇴에 실패했습니다.");
        Swal.fire({
          icon: "error",
          title: "탈퇴 실패...",
          text: "신호가 바닷속으로 가라앉았습니다!! 꼬르륵 🙃",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        this.setIsUserDataLoading(false)
      })
    }
  }
}

export default ProfileStore;