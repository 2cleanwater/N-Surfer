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
  selfCommentId?: string,
  parentCardCommentId?: string,
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
  const commentStore = value?.commentStore;

  const [commentList, setCommentList]= useState<Array<CommentForm>>([]);

  const [replyingComment, setReplyingComment]= useState<commentDataForm>({comment:"", selfCommentId:undefined, parentCardCommentId:undefined, parentCardCommentNickname:undefined});

  useEffect(()=>{
    const dummyCommentList:Array<CommentForm>= [
      {id:"1234",contents:"테스트입니다1.",likes:5,user:{id:"12345", nickname:"thisishey5", thumbnailImageUrl:""}, replies:[]},
      {id:"1234",contents:"테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.테스트입니다2.",likes:5,user:{id:"12346", nickname:"e9f9435c829db7b", thumbnailImageUrl:""}, replies:[
        {id:"1234",contents:"대댓글테스트1.",likes:4,user:{id:"2312345", nickname:"thisishey5", thumbnailImageUrl:""}},
        {id:"1234",contents:"대댓글테스트2.",likes:2,user:{id:"2312346", nickname:"e9f9435c829db7b", thumbnailImageUrl:""}}
      ]},
      {id:"1234",contents:"테스트입니다3.",likes:1,user:{id:"12347", nickname:"thisishey7", thumbnailImageUrl:""}, replies:[]}] 
    // commentStore?.getComments(cardId, setCommentList);
    setCommentList(dummyCommentList)
  },[]);

  if(commentList.length<=0) return <></>
  return (
    <CardReplyCss>
      {commentList.length&&commentList.map((commentItem,commentIndex)=>{
        return <Box key={commentIndex} sx={{ mr:"2em",ml:"2em",}}>
          <CardComment cardId={cardId} commentItem={commentItem} handleMoveScrollClick={handleMoveScrollClick} setReplyingComment={setReplyingComment}></CardComment>
          {commentItem.replies?.map((replyItem, replyIndex)=>{
            return <Box key={replyIndex} sx={{ mr:"0em",ml:"3em",}}>
              <CardComment cardId={cardId} commentItem={replyItem} handleMoveScrollClick={handleMoveScrollClick} setReplyingComment={setReplyingComment}></CardComment>
            </Box>
          })}
        </Box>
      })}
      
      <Box sx={{width:"100%",}} ref={scrollDiv}>
        <CardReplyUseForm cardId={cardId} commentForm={replyingComment} setReplyingComment={setReplyingComment}/>
      </Box>
    </CardReplyCss>
  )
}

export default CardReply