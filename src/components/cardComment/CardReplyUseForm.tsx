import { useRootStore } from '@provider/rootContext';
import { Box, IconButton, TextField, Tooltip, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { CommentForm, axiosCommentForm } from '@store/CommentsStore';
import _ from 'lodash';

const CommentUserImg= styled("img")({
  width:"3em",
  height:"3em",
  objectFit:"cover",
  objectPosition:"center",
  borderRadius: "50%"
})

interface commentDataForm{
  comment?: string,
  selfCommentId?: number,
  parentCardCommentId?: number,
  parentCardCommentNickname?: string
}

// 새로고침 방지 ===================================================
const preventEvent = (e:React.MouseEvent) =>{e.preventDefault();};

// 쓰로쓸링 디바운싱
let timer: NodeJS.Timeout | number = 0;
const throttle = (func:Function): void => {
  if (timer) {return}  
  timer = setTimeout(() => {
    func()
    timer = 0;
  }, 1000);
};
const debounce = (func:Function) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func()
    }, 1000);
}

const CardReplyUseForm = ({cardId, commentForm, setReplyingComment, setCommentList}:{cardId:string, commentForm:commentDataForm, setReplyingComment:(commentData:commentDataForm)=>void, setCommentList:(commentArray:Array<CommentForm>)=>void}) => {
  const value= useRootStore();
  const profileBaseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;

  const [commentState, setCommentState]= useState<string>(commentForm.comment?commentForm.comment:"");

  useEffect(()=>{
    setCommentState(commentForm.comment?commentForm.comment:"");
    setValue("inputContent", commentState)
  },[commentForm, commentState])

  // useForm 선언 ===================================================
  const methods = useForm<{
    inputContent: string;
  }>({
    defaultValues:{
      inputContent: commentState
    }
  });
  const { register, handleSubmit, formState, formState: { errors }, setValue, watch, reset, getValues } = methods;

  // submit 버튼 클릭 시 ===================================================
  const onSubmit = async(data:any)=>{
    const commentData:axiosCommentForm= {"parentCardCommentId":commentForm.parentCardCommentId?commentForm.parentCardCommentId:0,"contents":data.inputContent}
    try {
      if(commentForm.comment===""&&commentForm.selfCommentId===0){
        value?.commentStore.postComments(cardId, commentData, setCommentList)
      }
      else if(commentForm.selfCommentId){
        value?.commentStore.patchComments(cardId, commentForm.selfCommentId ,commentData, setCommentList)
      }
    } catch(err) {
      console.log(err);
    }
    setReplyingComment({comment:"", selfCommentId:0, parentCardCommentId:0, parentCardCommentNickname:""});
  };

  // 저장 체크 ===================================================
  const checkSave = ()=>{
    if(
    //컨텐츠가 바꼈는지
    watch("inputContent")==commentForm.comment){
      window.confirm('변경된 내용이 없습니다.');
    }else{
      handleSubmit(onSubmit)();
    }  
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display:"flex", justifyContent:"center", mx:"2em", py:"1em", borderRadius:"1em"}}>
      <Box sx={{flexShrink: 0, width:"6em", display:"flex", justifyContent:"center"}}>
        <CommentUserImg alt="profile"
        src={value?.profileStore.userData.imgUrl?value?.profileStore.userData.imgUrl:profileBaseImg} />
      </Box>
      <Box sx={{flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", wordBreak: "break-all", whiteSpace:"pre-line"}}>
        <TextField
          type="text"
          id="outlined-basic"
          variant="outlined"
          size="small"
          multiline
          rows={3}
          error={watch("inputContent").length==0 ?true:false}
          sx={{width:"100%"}}
          inputProps={{style: {fontSize: 20}}}
          {...register("inputContent", {
            onChange: _.debounce((e) => {
              setValue("inputContent", e.target.value)
            }, 1000),
          })}/>
        {commentForm.parentCardCommentNickname?<Box sx={{fontSize:"1em", ml:"0.5em"}}>{commentForm.parentCardCommentNickname} 에게 답글 다는 중...</Box>:<Box></Box>}
        {commentForm.selfCommentId?<Box sx={{fontSize:"1em", ml:"0.5em"}}>내 댓글 수정하는 중...</Box>:<Box></Box>}
      </Box>
      <Box sx={{display:"flex", flexDirection:"column",alignItems:"center" ,flexShrink: 0, width:"5em"}}>
        <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>글 저장</div>}>
          <IconButton type="submit" sx={{width:"1.5em",height:"1.5em",color: "black", bgcolor:"#0F7B6C", mb:"1em",
          "&:hover":{
            color: "black", bgcolor:"#0F7B6C",
            transform: "scale(1.1)",
            cursor : "pointer"
          }}} 
          onClick={(e)=>(
            preventEvent(e),
            // checkSave()
            throttle(checkSave)
            )}>
            <SendIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>취소</div>}>
          <IconButton sx={{width:"1.5em",height:"1.5em",color: "black", bgcolor:"gray", 
          "&:hover":{
            color: "black", bgcolor:"gray",
            transform: "scale(1.1)",
            cursor : "pointer"
          }}} 
          onClick={(e)=>{preventEvent(e);
            setReplyingComment({comment:"", selfCommentId:0, parentCardCommentId:0, parentCardCommentNickname:""});
          }}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default CardReplyUseForm