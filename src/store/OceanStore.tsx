import instance from "@service/axiosInterceptor";

interface user{
  username:string,
  userProfileUrl:string
}

export interface imageForm{
  imageId:string;
  imageUrl:string
}
export interface label{
  name:string;
  color:string;
}
export const wholeLabelList = [
  {name: "프론트엔드", color:"red"},
  {name: "백엔드", color:"blue"},
  {name: "상식", color:"orange"},
  {name: "자료구조", color:"green"},
  {name: "알고리즘", color:"brown"}
]

export const labelColor = (color:string) => {
  switch(color){
    case "red":
      return {textColor:"#FBE4E4", backgroundColor:"#E03E3E"}
    case "pink":
      return {textColor:"#F4DFEB", backgroundColor:"#AD1A72"}
    case "purple":
      return {textColor:"#EAE4F2", backgroundColor:"#6940A5"}
    case "blue":
      return {textColor:"#DDEBF1", backgroundColor:"#0B6E99"}
    case "green":
      return {textColor:"#DDEDEA", backgroundColor:"#0F7B6C"}
    case "yellow":
      return {textColor:"#FBF3DB", backgroundColor:"#DFAB01"}
    case "orange":
      return {textColor:"#FAEBDD", backgroundColor:"#D9730D"}
    case "brown":
      return {textColor:"#E9E5E3", backgroundColor:"#64473A"}
    case "gray":
      return {textColor:"#EBECED", backgroundColor:"#9B9A97"}
    case "default":
      return {textColor:"#FFFFFF", backgroundColor:"#37352F"}
    default:
  }
}

export interface OceanData{
  cardId: string;
  user: user;
  title?: string;
  content?: string;
  createDate?: string;
  likes: number;
  views: number;
  labels: Array<label>;
  images: Array<imageForm>;
  isLiked?: boolean;
  isBookmarked: boolean;
  replies?: number;
}

export interface OceanParams{
  numOfCards: number;
  nextCardId?: string;
  nickname?: string;
  label?: string;
  setValue?:(oceanList:Array<OceanData>)=>void;
  setNextCursor?:(CardId:string)=>void;
}

export interface OceanStoreForm{
  isOceanLoading: boolean;
  setIsOceanLoading: (loading: boolean) => void;
  isOceanListLoading: boolean;
  setIsOceanListLoading: (loading: boolean) => void;
  getOcean: (cardId:string, setValue:(oceanData:OceanData)=>void)=>void;
  postOcean: (formData:FormData, navigate:(link:string)=>void)=>void;
  patchOcean: (cardId:string, formData:FormData)=>void;
  deleteOcean: (cardId:string)=>void;
  getOceanList: (OceanParams:OceanParams)=>void;
  isLikedComments: (cardId:string)=>void;
  isNotLikedComments: (cardId:string)=>void;
}

const OceanStore = (): OceanStoreForm => {
  return {
    isOceanLoading: false,
    setIsOceanLoading: function(loading: boolean){
      this.isOceanLoading=loading;
    },
    isOceanListLoading: false,
    setIsOceanListLoading: function(loading: boolean){
      this.isOceanListLoading=loading;
    },
    getOcean: async function(cardId:string, setValue:(oceanData:OceanData)=>void){
      this.setIsOceanLoading(true);
      const oceanUrl = `/card/${cardId}`;
      await instance({
        method: "GET",
        url: oceanUrl,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          setValue(res.data as OceanData);
          this.setIsOceanLoading(false);
        })
        .catch((err)=>{
          setValue({} as OceanData)
          this.setIsOceanLoading(false);
      })
    },
    postOcean: async function(formData:FormData, navigate:(link:string)=>void){
      this.setIsOceanLoading(true);
      const oceanUrl = `/card`;
      await instance({
        method: "POST",
        url: oceanUrl,
        data: formData,
        headers:{
          'Content-Type': 'multipart/form-data'
        }})
        .then((res)=>{
          const ocean = res.data as OceanData;
          window.alert("성공적으로 저장되었습니다.");
          navigate(`/card/${ocean.cardId}`)
          this.setIsOceanLoading(false);
        })
        .catch((err)=>{
          console.log(err);
          window.alert("저장에 실패했습니다.")
          this.setIsOceanLoading(false);
      })
    },
    patchOcean: async function(cardId:string, formData:FormData){
      this.setIsOceanLoading(true);
      const oceanUrl = `/card/${cardId}`;
      await instance({
        method: "PATCH",
        url: oceanUrl,
        data: formData,
        headers:{
          'Content-Type': 'multipart/form-data'
        }})
        .then((res)=>{
          window.alert("성공적으로 수정되었습니다.")
          this.setIsOceanLoading(false);
        })
        .catch((err)=>{
          console.log(err);
          window.alert("수정에 실패했습니다.")
          this.setIsOceanLoading(false);
      })
    },
    deleteOcean: async function(cardId:string){
      this.setIsOceanLoading(true);
      const oceanUrl = `/card/${cardId}`;
      await instance({
        method: "DELETE",
        url: oceanUrl,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then(()=>{
          window.alert("성공적으로 삭제되었습니다.")
          this.setIsOceanLoading(false);
        })
        .catch((err)=>{
          console.log(err);
          window.alert("삭제에 실패했습니다.")
          this.setIsOceanLoading(false);
      })
    },
    getOceanList: async function(OceanParams:OceanParams){
      this.setIsOceanListLoading(true);
      const params = [
        OceanParams.numOfCards && `numOfCards=${OceanParams.numOfCards}`,
        OceanParams.nextCardId && `nextCardId=${OceanParams.nextCardId}`,
        OceanParams.nickname && `nickname=${OceanParams.nickname}`,
        OceanParams.label && `label=${OceanParams.label}`
      ].filter(Boolean).join('&');
      const oceanListUrl = `/card?${params}`;
      await instance({
        method: "GET",
        url: oceanListUrl,
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((res)=>{
        OceanParams.setValue&&OceanParams.setValue(res.data.cardList as Array<OceanData>|| []);
        OceanParams.setNextCursor&&OceanParams.setNextCursor(res.data.nextCardId as string||"noMore");
        this.setIsOceanListLoading(false);
      })
      .catch((err)=>{
        console.log(err);
        this.setIsOceanListLoading(false);
      })
    },
    isLikedComments: async function(cardId:string){
      //this.setIsOceanLoading(true);
      const oceanListUrl = `/card/${cardId}/like`;
      await instance({
        method: "POST",
        url: oceanListUrl,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
//          this.setIsOceanLoading(false);
        })
        .catch((err)=>{
//          this.setIsOceanLoading(false);
      })
    },
    isNotLikedComments: async function(cardId:string){
      //this.setIsOceanLoading(true);
      const oceanListUrl = `/card/${cardId}/like`;
      await instance({
        method: "DELETE",
        url: oceanListUrl,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
//          this.setIsOceanLoading(false);
        })
        .catch((err)=>{
//          this.setIsOceanLoading(false);
      })
    }
  }
}

export default OceanStore;
