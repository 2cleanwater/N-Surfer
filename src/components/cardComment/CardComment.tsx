import { dateConverter } from '@service/dateConverter';
import { Box, Checkbox, Tooltip, styled } from '@mui/material';
import React, { useState } from 'react'
import { useRootStore } from '@provider/rootContext';
import { CommentForm } from '@store/CommentsStore';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

const CommentUserImg= styled("img")({
  width:"3em",
  height:"3em",
  objectFit:"cover",
  objectPosition:"center",
  borderRadius: "50%"
})

// 코멘트 작성 데이터 폼
interface commentDataForm{
  method: string,
  comment?: string,
  selfCommentId?: number,
  parentCardCommentId?: number,
  parentCardCommentNickname?: string
}

const HeartCSS= styled(Checkbox)({
  color: "black", 
  zIndex:"11",
  "&:not(:active):not(:hover)": {
    animation: "animation-Heart .45s ease-in-out",
  },
  "&:active":{
    animation: "animation-Heart .45s ease-in-out",
  },
  transform: "scale(1)",
  "@keyframes animation-Heart": {
    "0%": {
      transform: "scale(1)"
    },
    "25%": {
      transform: "scale(1.2)"
    },
    "50%": {
      transform: "scale(.95)"
    },
    "100%": {
      transform: "scale(1)"
    },
  }
})

const profileBaseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;

const CardComment = (
  {cardId, commentItem, editingCommentId, parentCommentId, handleMoveScrollClick, setReplyingComment, setCommentList}:
  {cardId:string, commentItem:CommentForm, editingCommentId:number, parentCommentId:number, handleMoveScrollClick:()=>void, setReplyingComment:(commentData:commentDataForm)=>void, setCommentList:(commentArray:Array<CommentForm>)=>void }) => {
  const value = useRootStore();
  const navigate = useNavigate();
  const isLogin = value?.authStore.isLogin;
  const [isLiked, setIsLiked]= useState<boolean>(commentItem.isLiked?commentItem.isLiked:false);
  const [likedNumber, setLikedNumber]= useState<number>(commentItem.likes); 

  const handleLike= ()=>{
    if(isLogin){
      if (isLiked) {
        value?.commentStore.isNotLikedComments(cardId, commentItem.id);
        setLikedNumber(likedNumber-1);
        setIsLiked(false);
      } else {
        value?.commentStore.isLikedComments(cardId, commentItem.id);
        setLikedNumber(likedNumber+1);
        setIsLiked(true);
      }
    }
    else{
      value?.authStore.setIsLoginLoading(true); 
      value?.modalStore.openModal()
    }
  }

  // 삭제 체크 ===================================================
  const checkDelete = ()=>{
    if (window.confirm('댓글을 삭제하시겠습니까?')){
        value?.commentStore.deleteComments(cardId, commentItem.id, setCommentList);
    }else {
      return
    }
  }
  
  return (
    <Box sx={{display:"flex", justifyContent:"center", borderRadius:"1em",  py:"1em","&:hover":{backgroundColor:"#e0e0d3"}, bgcolor:(editingCommentId===commentItem.id)?"#e0e0d3":""}}>
      <Box sx={{flexShrink: 0, width:"6em", display:"flex", justifyContent:"center", "&:hover":{cursor:"pointer", scale:"1.05"}}}>
        <CommentUserImg alt="profile"
        onClick={()=>{commentItem?.user.nickname&&navigate(`/user/profile?nickname=${commentItem.user.nickname}`)}}
        src={commentItem.user.thumbnailImageUrl?commentItem.user.thumbnailImageUrl:profileBaseImg} />
      </Box>

      <Box sx={{flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", wordBreak: "break-all", whiteSpace:"pre-line"}}>
        <Box sx={{fontSize:"1em"}}>{commentItem.user.nickname}</Box>
        <Box sx={{fontSize:"1.1em",my:"0.5em", whiteSpace: "pre-wrap", wordWrap: "break-word", textAlign:"left"}}>
          {commentItem.contents}
        </Box>
        <Box sx={{display:"flex", flexDirection:"row", alignItems:"center",alignContent:"center", justifyItems:"center"}}>
          <Box sx={{fontSize:"0.8em",color:"gray", mr:"1em",alignItems:"center"}}>{dateConverter({date:new Date(commentItem.createdAt!), tag:"."})}</Box>
          <Box sx={{"&:hover":{scale:"1.1"},cursor:"pointer", mr:"0.5em"}} 
          onClick={()=>{
            if(isLogin){
              handleMoveScrollClick();
              setReplyingComment({method:"POST", comment:"", selfCommentId:0, parentCardCommentId:parentCommentId, parentCardCommentNickname:commentItem.user.nickname}) 
            }
            else{
              value?.authStore.setIsLoginLoading(true); 
              value?.modalStore.openModal()
            }
            }}>답글달기</Box>
          {value?.profileStore.userData.nickname===commentItem.user.nickname&&
            <>
            <Box sx={{"&:hover":{scale:"1.1"},cursor:"pointer", mr:"0.5em"}} 
            onClick={()=>{
              handleMoveScrollClick(); 
              setReplyingComment({method:"PATCH", comment:commentItem.contents, selfCommentId:commentItem.id, parentCardCommentId:0, parentCardCommentNickname:""})
              }}>수정</Box>
            <Box sx={{"&:hover":{scale:"1.1"},cursor:"pointer"}} 
            onClick={checkDelete}>삭제</Box>
            </>
          }
          
        </Box>
      </Box>

      <Box sx={{flexShrink: 0, width:"5em",}}>
        <Tooltip placement="top" title={<div style={{fontSize:"15px", wordWrap: "normal",}}>{isLiked?"좋아요 취소":"좋아요"}</div>}>
          <HeartCSS
          checked={isLiked}
          onClick={handleLike}
          icon={<FavoriteBorder sx={{fontSize:"1.5em"}}/>} checkedIcon={<Favorite sx={{color:"#FB3958", fontSize:"1.5em"}} />} />
        </Tooltip>
        <Box sx={{color:"black"}}>{likedNumber}</Box>
      </Box>
    </Box>)
}

export default CardComment