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
        break;
        case "myProfile":
          this._IsLoading_MyProfile=true;
        break;
        case "userProfile":
          this._IsLoading_UserProfile=true;
        break;
        case "oceanList":
          this._IsLoading_OceanList=true;
        break;
        case "ocean":
          this._IsLoading_Ocean=true;
        break;        
      }
    },
    _IsLoading_False: function(name:string){
      switch(name){
        case "waveList":
          this._IsLoading_WaveList=false;
        break;
        case "myProfile":
          this._IsLoading_MyProfile=false;
        break;
        case "userProfile":
          this._IsLoading_UserProfile=false;
        break;
        case "oceanList":
          this._IsLoading_OceanList=false;
        break;
        case "ocean":
          this._IsLoading_Ocean=false;
        break;   
      }
    }
  }
}

export default LoadingStore;