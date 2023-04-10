export interface LoadingStoreForm{
  _IsLoading_WaveList: boolean;
  _IsLoading_MyProfile: boolean;
  _IsLoading_UserProfile: boolean;
  _IsLoading_OceanList: boolean;
  _IsLoading_Ocean: boolean;
  _IsLoading_True: (name:string)=>void;
  _IsLoading_False: (name:string)=>void;
}

const LoadingStore = (): LoadingStoreForm=>{
  return {
    _IsLoading_WaveList: false,
    _IsLoading_MyProfile: false,
    _IsLoading_UserProfile: false,
    _IsLoading_OceanList: false,
    _IsLoading_Ocean: false,
    _IsLoading_True: function (name:string) {
      switch(name){
        case "waveList":
          this._IsLoading_WaveList=true;
          console.log("waveList" + this._IsLoading_WaveList)
        break;
        case "myProfile":
          this._IsLoading_MyProfile=true;
          console.log("myProfile" + this._IsLoading_MyProfile)
        break;
        case "userProfile":
          this._IsLoading_UserProfile=true;
          console.log("userProfile" + this._IsLoading_UserProfile)
        break;
        case "oceanList":
          this._IsLoading_OceanList=true;
          console.log("oceanList" + this._IsLoading_OceanList)
        break;
        case "ocean":
          this._IsLoading_Ocean=true;
          console.log("ocean" + this._IsLoading_Ocean)
        break;        
      }
    },
    _IsLoading_False: function(name:string){
      switch(name){
        case "waveList":
          this._IsLoading_WaveList=false;
          console.log("waveList" + this._IsLoading_WaveList)
        break;
        case "myProfile":
          this._IsLoading_MyProfile=false;
          console.log("myProfile" + this._IsLoading_MyProfile)
        break;
        case "userProfile":
          this._IsLoading_UserProfile=false;
          console.log("userProfile" + this._IsLoading_UserProfile)
        break;
        case "oceanList":
          this._IsLoading_OceanList=false;
          console.log("oceanList" + this._IsLoading_OceanList)
        break;
        case "ocean":
          this._IsLoading_Ocean=false;
          console.log("ocean" + this._IsLoading_Ocean)
        break;   
      }
    }
  }
}

export default LoadingStore;