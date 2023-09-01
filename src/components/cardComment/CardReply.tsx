import { useRootStore } from '@provider/rootContext'

import { Box, Button, Checkbox, IconButton, TextField, Tooltip, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { CommentForm } from '@store/CommentsStore'
import { dateConverter } from '@service/dateConverter'

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { useForm } from 'react-hook-form'
import CardReplyUseForm from '@components/cardComment/CardReplyUseForm'
import CardComment from './CardComment'

const CardReplyCss= styled(Box)({
  width:"100%",
  margin:"auto",
  marginBottom:"2em",
  backgroundColor:"#FDFDE9",
  borderRadius:"1em",
  paddingTop:"1.5em",
  paddingBottom:"1.5em"
})

const CardCommentCss= styled(Box)({
  
}) 

const CommentUserImg= styled("img")({
  width:"3em",
  height:"3em",
  objectFit:"cover",
  objectPosition:"center",
  borderRadius: "50%"
})

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

// 코멘트 작성 데이터 폼
interface commentDataForm{
  comment?: string,
  selfCommentId?: number,
  parentCardCommentId?: number,
  parentCardCommentNickname?: string
}

const CardReply = ({cardId}:{cardId:string}) => {
  const scrollDiv= useRef<HTMLDivElement>(null);

  const handleMoveScrollClick = () => {
    scrollDiv.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const value= useRootStore();
  const isLogin = value?.authStore.isLogin;
  const commentStore = value?.commentStore;

  const [commentList, setCommentList]= useState<Array<CommentForm>>([]);

  const [replyingComment, setReplyingComment]= useState<commentDataForm>({comment:"", selfCommentId:0, parentCardCommentId:0, parentCardCommentNickname:""});

  useEffect(()=>{
    commentStore?.getComments(cardId, setCommentList);
  },[]);

  return (
    <CardReplyCss>
      {commentList.length>0&&commentList.map((commentItem,commentIndex)=>{
        return <Box key={commentIndex} sx={{ mr:"2em",ml:"2em"}}>
          <CardComment cardId={cardId} commentItem={commentItem} parentCommentId={commentItem.id} editingCommentId={replyingComment.selfCommentId??0} handleMoveScrollClick={handleMoveScrollClick} setReplyingComment={setReplyingComment} setCommentList={setCommentList}></CardComment>
          {commentItem.replies?.map((replyItem, replyIndex)=>{
            return <Box key={replyIndex} sx={{ mr:"0em",ml:"3em",}}>
              <CardComment cardId={cardId} commentItem={replyItem} parentCommentId={commentItem.id} editingCommentId={replyingComment.selfCommentId??0} handleMoveScrollClick={handleMoveScrollClick} setReplyingComment={setReplyingComment} setCommentList={setCommentList}></CardComment>
            </Box>
          })}
        </Box>
      })}
      {isLogin?      
      <Box sx={{width:"100%",}} ref={scrollDiv}>
        <CardReplyUseForm cardId={cardId} commentForm={replyingComment} setReplyingComment={setReplyingComment} setCommentList={setCommentList}/>
      </Box>:
      <></>}
    </CardReplyCss>
  )
}

export default CardReply