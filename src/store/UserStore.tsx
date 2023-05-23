import instance from '@service/axiosInterceptor';

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

export interface Badges{
  badgeId: string,
  name: string,
  description: string,
  presentValue: number,
  goalValue: number,
  isAcquired: boolean,
  imgUrl?:string
}

export interface categories{
  categoryId: string,
  categoryName: string,
  badges: Array<Badges>
}

export interface BadgeDataForm{
  categories: Array<categories>
}

export interface UserStoreForm{
  userData: UserDataForm;
  isUserDataLoading: boolean;
  setIsUserDataLoading: (loading: boolean) => void;
  getUserData:(nickname:string, setUserData:(userData:UserDataForm)=>void, setIsUserHere:(is:boolean)=>void)=>void;
  getBadgeData: (nickname:string, setBadgeData:(badgeData:BadgeDataForm)=>void)=>void;
}
const UserStore = (): UserStoreForm => {
  return {
    userData: {},
    isUserDataLoading: false,
    setIsUserDataLoading: function(loading: boolean){
      this.isUserDataLoading=loading;
    },
    getUserData:async function(nickname:string, setUserData:(userData:UserDataForm)=>void, setIsUserHere:(is:boolean)=>void){
      const profileUrl = `/user/profile?nickname=${nickname}`;
      await instance({
        method: "GET",
        url: profileUrl,
        headers:{
          'Content-Type': 'application/json; charset=UTF-8',
        }})
        .then((res)=>{
          setUserData(res.data as UserDataForm)
          setIsUserHere(true);
        })
        .catch((err)=>{
          console.log(err);
          setIsUserHere(false);
        })
    },
    getBadgeData: async function(nickname:string, setBadgeData:(badgeData:BadgeDataForm)=>void){
      const badgeUrl = `/user/badge?nickname=${nickname}`
      await instance({
        method:"GET",
        url: badgeUrl,
        headers:{
          'Content-Type': 'application/json; charset=UTF-8',
        }})
      .then((res)=>{
        setBadgeData(res.data as BadgeDataForm)
      })
      .catch((err)=>{})
    }
  }
}

export default UserStore;