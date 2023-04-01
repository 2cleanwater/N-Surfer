import instance from "@/service/axiosInterceptor";
import { useNavigate } from "react-router-dom";

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
  nickname?: number;
  title?: string;
  labels: Array<label>;
  content?: string;
  createDate?: string;
  images: Array<imageForm>;
}

export interface OceanStoreForm{
  // oceanData: OceanData;
  transDate: (createDate:string)=>string;
  // setOcean: (oceanData:OceanData)=>void;
  getOcean: (cardId:string, setValue:(oceanData:OceanData)=>void)=>void;
  postOcean: (formData:FormData, navigate:(link:string)=>void)=>void;
  patchOcean: (cardId:string, formData:FormData)=>void;
  deleteOcean: (cardId:string)=>void;
}

const OceanStore = (): OceanStoreForm => {
  return {
    // oceanData: {cardId:"",images:[],labels:[]},
    transDate: function(createDate:string){
      const date = new Date(createDate);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${year}.${month}.${day}`
    },
    // setOcean: function(oceanData: OceanData){
    //   this.oceanData = JSON.parse(JSON.stringify(oceanData));
    // },
    getOcean: async function(cardId:string, setValue:(oceanData:OceanData)=>void){
      const oceanUrl = `/card/${cardId}`;
      await instance({
        method: "GET",
        url: oceanUrl,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          setValue(res.data as OceanData);
          console.log(setValue)
          // this.setOcean(res.data as OceanData);
        })
        .catch((err)=>{
          console.log(err);
          window.alert("Ocean의 정보를 가져올 수 없습니다.");
      })
    },
    postOcean: async function(formData:FormData, navigate:(link:string)=>void){
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
        })
        .catch((err)=>{
          console.log(err);
          window.alert("저장에 실패했습니다.")
      })
    },
    patchOcean: async function(cardId:string, formData:FormData){
      const oceanUrl = `/card/${cardId}`;
      await instance({
        method: "PATCH",
        url: oceanUrl,
        data: formData,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          // this.getOcean(cardId);
          window.alert("성공적으로 수정되었습니다.")
        })
        .catch((err)=>{
          console.log(err);
          window.alert("수정에 실패했습니다.")
      })
    },
    deleteOcean: async function(cardId:string){
      const oceanUrl = `/card/${cardId}`;
      await instance({
        method: "DELETE",
        url: oceanUrl,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then(()=>{
          window.alert("성공적으로 삭제되었습니다.")
        })
        .catch((err)=>{
          console.log(err);
          window.alert("삭제에 실패했습니다.")
      })
    }
  }
}

export default OceanStore;
