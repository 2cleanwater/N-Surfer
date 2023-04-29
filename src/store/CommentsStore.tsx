import instance from "@service/axiosInterceptor";

interface user{
  id:string,
  nickname:string
}

interface reply{
  id:string,
  contents:string,
  likes:number,
  user:user,
  createdAt:Date
}

export interface CommentForm{
  id:string,
  contents:string,
  likes:number,
  user:user,
  replies:Array<reply>,
  createdAt:Date
}

export interface CommentsStoreForm{
  getComments: (cardId:string, setValue:(comments:Array<CommentForm>)=>void)=>void;
  // patchComments: (cardId:string, formData:FormData)=>void;
  // postComments: (cardId:string, cardCommentId:string, formData:FormData)=>void;
  // deleteComments: (cardId:string, cardCommentId:string)=>void,
  // isLikedComments: (cardId:string, cardCommentId:string)=>void,
  // isNotLikedComments: (cardId:string, cardCommentId:string)=>void,
}

const CommentsStore = (): CommentsStoreForm=>{
  return {
    getComments: async function(cardId:string, setValue:(comments:Array<CommentForm>)=>void){
      //this.setIsOceanLoading(true);
      const commentsUrl = `/card/${cardId}/comment`;
      await instance({
        method: "GET",
        url: commentsUrl,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          setValue(res.data as Array<CommentForm>);
//          this.setIsOceanLoading(false);
        })
        .catch((err)=>{
          setValue({} as Array<CommentForm>)
//          this.setIsOceanLoading(false);
      })
    }, 
//     postComments: async function(cardId:string, setValue:(comments:Array<CommentForm>)=>void){
//       //this.setIsOceanLoading(true);
//       const commentsUrl = `/card/${cardId}/comment`;
//       await instance({
//         method: "GET",
//         url: commentsUrl,
//         headers:{
//           'Content-Type': 'application/json'
//         }})
//         .then((res)=>{
//           setValue(res.data as Array<CommentForm>);
// //          this.setIsOceanLoading(false);
//         })
//         .catch((err)=>{
//           setValue({} as Array<CommentForm>)
// //          this.setIsOceanLoading(false);
//       })
//     }, 
//     patchComments: async function(cardId:string, setValue:(comments:Array<CommentForm>)=>void){
//       //this.setIsOceanLoading(true);
//       const commentsUrl = `/card/${cardId}/comment`;
//       await instance({
//         method: "GET",
//         url: commentsUrl,
//         headers:{
//           'Content-Type': 'application/json'
//         }})
//         .then((res)=>{
//           setValue(res.data as Array<CommentForm>);
// //          this.setIsOceanLoading(false);
//         })
//         .catch((err)=>{
//           setValue({} as Array<CommentForm>)
// //          this.setIsOceanLoading(false);
//       })
//     }, 
//     deleteComments: async function(cardId:string, setValue:(comments:Array<CommentForm>)=>void){
//       //this.setIsOceanLoading(true);
//       const commentsUrl = `/card/${cardId}/comment`;
//       await instance({
//         method: "GET",
//         url: commentsUrl,
//         headers:{
//           'Content-Type': 'application/json'
//         }})
//         .then((res)=>{
//           setValue(res.data as Array<CommentForm>);
// //          this.setIsOceanLoading(false);
//         })
//         .catch((err)=>{
//           setValue({} as Array<CommentForm>)
// //          this.setIsOceanLoading(false);
//       })
//     }, 
//     isLikedComments: async function(cardId:string, setValue:(comments:Array<CommentForm>)=>void){
//       //this.setIsOceanLoading(true);
//       const commentsUrl = `/card/${cardId}/comment`;
//       await instance({
//         method: "GET",
//         url: commentsUrl,
//         headers:{
//           'Content-Type': 'application/json'
//         }})
//         .then((res)=>{
//           setValue(res.data as Array<CommentForm>);
// //          this.setIsOceanLoading(false);
//         })
//         .catch((err)=>{
//           setValue({} as Array<CommentForm>)
// //          this.setIsOceanLoading(false);
//       })
//     }, 
    
//     isNoteLikedComments: async function(cardId:string, setValue:(comments:Array<CommentForm>)=>void){
//       //this.setIsOceanLoading(true);
//       const commentsUrl = `/card/${cardId}/comment`;
//       await instance({
//         method: "GET",
//         url: commentsUrl,
//         headers:{
//           'Content-Type': 'application/json'
//         }})
//         .then((res)=>{
//           setValue(res.data as Array<CommentForm>);
// //          this.setIsOceanLoading(false);
//         })
//         .catch((err)=>{
//           setValue({} as Array<CommentForm>)
// //          this.setIsOceanLoading(false);
//       })
//     }, 
  }
}

export default CommentsStore;