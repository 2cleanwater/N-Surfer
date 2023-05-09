import instance from "@service/axiosInterceptor";

interface user{
  id:string,
  nickname:string,
  thumbnailImageUrl:string
}

interface reply{
  id:number,
  contents:string,
  likes:number,
  user:user,
  createdAt?:Date
}

export interface CommentForm{
  id:number,
  contents:string,
  likes:number,
  user:user,
  replies?:Array<reply>,
  createdAt?:Date,
  isLiked?: boolean,
}

export interface axiosCommentForm{
  parentCardCommentId:number,
  contents:string
}

export interface CommentsStoreForm{
  getComments: (cardId:string, setValue:(comments:Array<CommentForm>)=>void)=>void;
  postComments: (cardId:string, axiosCommentForm:axiosCommentForm, setValue:(comments:Array<CommentForm>)=>void)=>void;
  patchComments: (cardId:string, cardCommentId:number, axiosCommentForm:axiosCommentForm, setValue:(comments:Array<CommentForm>)=>void)=>void;
  deleteComments: (cardId:string, cardCommentId:number)=>void,
  isLikedComments: (cardId:string, cardCommentId:number)=>void,
  isNotLikedComments: (cardId:string, cardCommentId:number)=>void,
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
          setValue(res.data.comments as Array<CommentForm>);
//          this.setIsOceanLoading(false);
        })
        .catch((err)=>{
          setValue({} as Array<CommentForm>)
//          this.setIsOceanLoading(false);
      })
    }, 
    postComments: async function(cardId:string, axiosCommentForm:axiosCommentForm, setValue:(comments:Array<CommentForm>)=>void){
      //this.setIsOceanLoading(true);
      const commentsUrl = `/card/${cardId}/comment`;
      await instance({
        method: "POST",
        url: commentsUrl,
        data: axiosCommentForm,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          this.getComments(cardId, setValue);
        })
        .catch((err)=>{
//          this.setIsOceanLoading(false);
      })
    }, 
    patchComments: async function(cardId:string, cardCommentId:number, axiosCommentForm:axiosCommentForm, setValue:(comments:Array<CommentForm>)=>void){
      //this.setIsOceanLoading(true);
      const commentsUrl = `/card/${cardId}/comment/${cardCommentId}`;
      await instance({
        method: "PATCH",
        url: commentsUrl,
        data: axiosCommentForm,
        headers:{
          'Content-Type': 'application/json'
        }})
        .then((res)=>{
          this.getComments(cardId, setValue);
        })
        .catch((err)=>{
//          this.setIsOceanLoading(false);
      })
    }, 
    deleteComments: async function(cardId:string, cardCommentId:number){
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
    isLikedComments: async function(cardId:string, cardCommentId:number){
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
    isNotLikedComments: async function(cardId:string, cardCommentId:number){
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