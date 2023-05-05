import instance from "@service/axiosInterceptor";

interface user{
  id:string,
  nickname:string,
  thumbnailImageUrl:string
}

interface reply{
  id:string,
  contents:string,
  likes:number,
  user:user,
  createdAt?:Date
}

export interface CommentForm{
  id:string,
  contents:string,
  likes:number,
  user:user,
  replies?:Array<reply>,
  createdAt?:Date,
  isLiked?: boolean,
}

export interface CommentsStoreForm{
  getComments: (cardId:string, setValue:(comments:Array<CommentForm>)=>void)=>void;
  postComments: (cardId:string, formData:FormData)=>void;
  patchComments: (cardId:string, cardCommentId:string, formData:FormData, setValue:(comments:Array<CommentForm>)=>void)=>void;
  deleteComments: (cardId:string, cardCommentId:string)=>void,
  isLikedComments: (cardId:string, cardCommentId:string)=>void,
  isNotLikedComments: (cardId:string, cardCommentId:string)=>void,
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
    postComments: async function(cardId:string, formData:FormData){
      //this.setIsOceanLoading(true);
      const commentsUrl = `/card/${cardId}/comment`;
      await instance({
        method: "POST",
        url: commentsUrl,
        data: formData,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          console.log("됐니?")
        })
        .catch((err)=>{
//          this.setIsOceanLoading(false);
      })
    }, 
    patchComments: async function(cardId:string, cardCommentId:string, formData:FormData){
      //this.setIsOceanLoading(true);
      const commentsUrl = `/card/${cardId}/comment/${cardCommentId}`;
      await instance({
        method: "PATCH",
        url: commentsUrl,
        data: formData,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          
        })
        .catch((err)=>{
//          this.setIsOceanLoading(false);
      })
    }, 
    deleteComments: async function(cardId:string, cardCommentId:string){
      //this.setIsOceanLoading(true);
      const commentsUrl = `/card/${cardId}/comment/${cardCommentId}`;
      await instance({
        method: "DELETE",
        url: commentsUrl,
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
    isLikedComments: async function(cardId:string, cardCommentId:string){
      //this.setIsOceanLoading(true);
      const commentsUrl = `/card/${cardId}/comment/${cardCommentId}/like`;
      await instance({
        method: "POST",
        url: commentsUrl,
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
    isNotLikedComments: async function(cardId:string, cardCommentId:string){
      //this.setIsOceanLoading(true);
      const commentsUrl = `/card/${cardId}/comment/${cardCommentId}/like`;
      await instance({
        method: "DELETE",
        url: commentsUrl,
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

export default CommentsStore;