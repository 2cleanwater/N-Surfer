import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material';

import { observer } from 'mobx-react';

import { useRootStore } from '@provider/rootContext';

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const value = useRootStore()!;
  const userData = value.profileStore.userData;
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [userImgSrc, setUserImgSrc] = useState<string>("");
  const [useBasicImg, setUseBasicImg] = useState<string>("NO");

  // useForm 선언 ===================================================
  const methods = useForm<{
    inputImg: File[];
    inputName: string;
    inputBirth: string;
  }>({
    defaultValues:{
      inputName: userData.userName
    }
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = methods;

  // submit 버튼 클릭 시 ===================================================
  const onSubmit = async(data:any)=>{
    const formData:FormData = new FormData();
    formData.append("useBasicImg", useBasicImg)
    formData.append("imgFile", data.inputImg);
    formData.append("userName", data.inputName);
    formData.append("userBirth", data.inputBirth);
    value.profileStore.patchMyUserData(formData);
  };
  
  // 새로고침 방지 ===================================================
  const preventEvent = (e:React.MouseEvent) =>{
    e.preventDefault();
  };

  // 이미지 프리뷰 ===================================================
  let userImg: string|undefined = userData.imgUrl;
  if(userImgSrc===""){
    userImg = userData.imgUrl||"/images/profile_logo.jpg";
  }else{
    userImg = userImgSrc;
  };

  // 탈퇴 체크 ===================================================
  const checkDeleteUser = ()=>{
    if (window.confirm('확인을 누르면 탈퇴됩니다.')){
      value.profileStore.deleteMyUserData();
      navigate("/");
    }
    else {
        return;
      }
  }

  //기본 이미지 체커
  useEffect(()=>{
    (userImg==="/images/profile_logo.jpg")?setUseBasicImg("YES"):setUseBasicImg("NO")
  },[userImg]);
  
  //이미지를 URL 처리해서 userImgSrc에 저장 이미지 입력받을 때마다 리렌더링 ===================================================
  const inputFile = watch("inputImg");
  useEffect(()=>{
    if(inputFile && inputFile.length>0){
      setUserImgSrc(URL.createObjectURL(inputFile[0]))
    }
  },[inputFile]);

  //이미지 업로드 취소 ===================================================
  const resetFileInput = ():void => {
    setValue("inputImg", []);
  };

  return (
    <Box sx={{border:"solid 1px", width: 300, height: 450, boxShadow: 3, m:2, p:1, borderRadius:"0.5em", alignContent:"center"}}>
        <Box component="img" src={userImg} alt='UserImage' 
        sx={{ objectFit: "cover", objectPosition:"center" ,borderRadius:"50%", width:"200px", height:"200px", overflow: "hidden"}}  />
        {isEditing?
          //수정 활성화 ===================================================
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <label className="profileImgInput" htmlFor='profileImg'>업로드</label>
              <input type="file" className="profileImgInput" id= "profileImg" accept="image/png, image/jpeg, image/jpg"
              {...register("inputImg", {
                validate:{
                  maxSize : (files) => (!files[0]||files[0]?.size<3 * 1024 * 1024)||"이미지는 3MB 이내로만 업로드 가능합니다.",
                }
              })} />
              {errors.inputImg && <span>{errors.inputImg.message}</span>}
              <button onClick={(e)=>{preventEvent(e); setUserImgSrc("/images/profile_logo.jpg"); resetFileInput()}}>기본프로필</button>
              <button onClick={(e)=>{preventEvent(e); setUserImgSrc(""); resetFileInput()}}>현재프로필</button>
            </Box>
            <Box component="ul">
              <li>
                회원 이름 : <input
                {...register("inputName", {
                  required: "이름을 입력해주세요.",
                  onChange: (e) => setValue("inputName", e.target.value),
                  pattern: {
                    value: /^[가-힣a-zA-Z]+$/,
                    message: "올바른 이름을 입력해주세요."
                  }
                })}></input>
                {errors.inputName && <span>{errors.inputName.message}</span>}
              </li>
              <li>
                회원 가입 경로 : {userData.provider}
              </li>
              <li>
                회원 이메일 : {userData.userEmail}
              </li>
              <li>
                생년월일 : <input placeholder={userData.userBirth} value={userData.userBirth||undefined} {...register("inputBirth", {
                  pattern:{
                    value: /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
                    message: "올바른 생일을 입력해주세요."
                  }
                })}></input>
                {errors.inputBirth && <span>{errors.inputBirth.message}</span>}
              </li>
            </Box>
            <Box>
              <button onClick={()=>{setIsEditing(!isEditing);setUserImgSrc(""); resetFileInput()}}>취소하기</button>
              <button type="submit" >저장하기</button>
            </Box>
          </Box>:
          // 수정 비활성화 ===================================================
          <Box>
            <Box component="ul">
              <li>회원 이름 : {isEditing?(<input></input>):(userData.userName)}</li>
              <li>회원 가입 경로 : {userData.provider}</li>
              <li>회원 이메일 : {userData.userEmail}</li>
              <li>생년월일 : {isEditing?(<input></input>):(userData.userBirth||"없음")}</li>
            </Box>
            <Box>
              <button onClick={()=>{setIsEditing(!isEditing)}}>수정하기</button>
              <button onClick={(e)=>{preventEvent(e); checkDeleteUser()}}>탈퇴하기</button>
            </Box>
          </Box>
        }
    </Box>
  )
}

export default observer(EditProfile)