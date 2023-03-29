import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, FormControl, FormHelperText, IconButton, Input, InputLabel, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useRootStore } from '@provider/rootContext';
import InteractiveWave from '@components/InteractiveWave'
import {UserDataForm} from '@store/ProfileStore'

const EditProfile = () => {
  const value = useRootStore()!;
  const userData = value.profileStore.userData;
  // const userData = require("@test/userData.json")[1] as UserDataForm; 
  const navigate = useNavigate();
  const baseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;

  const [isEditing, setIsEditing] = useState(false);
  const [userImgSrc, setUserImgSrc] = useState<string>("");
  const [isBasicImg, setIsBasicImg] = useState<string>("NO");

  const [dataChanged, setDataChanged] = useState<boolean>(false);

  // useForm 선언 ===================================================
  const methods = useForm<{
    inputImg: File[];
    inputName: string;
  }>({
    defaultValues:{
      inputName: userData.userName
    }
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, clearErrors, getValues } = methods;

  // submit 버튼 클릭 시 ===================================================
  const onSubmit = async(data:any)=>{
    const formData:FormData = new FormData();
    formData.append("isBasicImg", isBasicImg);
    formData.append("imgFile", data.inputImg);
    formData.append("userName", data.inputName);
    console.log(formData)
    value.profileStore.patchMyUserData(formData);
  };
  
  // 새로고침 방지 ===================================================
  const preventEvent = (e:React.MouseEvent) =>{e.preventDefault();};

  // 이미지 프리뷰 ===================================================
  let userImg: string|undefined = userData.imgUrl;
  if(userImgSrc===""){userImg = userData.imgUrl||baseImg;}
  else{userImg = userImgSrc;};

  // 탈퇴 체크 ===================================================
  const checkDeleteUser = ()=>{
    if (window.confirm('탈퇴하시겠습니까?')){
      if(window.confirm('확인을 누르면 탈퇴됩니다.')){
        value.profileStore.deleteMyUserData();
        navigate("/");} 
    }else return}
  

  //기본 이미지 체커
  useEffect(()=>{
    (userImg==baseImg)?setIsBasicImg("YES"):setIsBasicImg("NO")
  },[userImg]);
  
  //이미지를 URL 처리해서 userImgSrc에 저장 이미지 입력받을 때마다 리렌더링 ===================================================
  const inputFile = watch("inputImg");
  useEffect(()=>{
    if(inputFile && inputFile.length>0){
      setUserImgSrc(URL.createObjectURL(inputFile[0]))
    }},[inputFile]);

  //이미지 업로드 취소 ===================================================
  const resetFileInput = ():void => {setValue("inputImg", []);};
  
  //설정 버튼 css
  const settingButton= {
    "&:hover":{
      "@keyframes rotate": {
        "100%": {
          transform: "rotate(180deg)"
        }
      },
      animation: "rotate 1s infinite",
      cursor : "pointer"
    },
    animation: isEditing?"rotate 1s infinite":"",
    color:"black",
    position: "absolute",
    top:"5%",
    right:"3%"
  }
  // 저장버튼 css
  const saveButton= {
    "&:hover":{
      color: dataChanged?("#0F7B6C"):("gray"),
      transform: "scale(1.1)",
      cursor : "pointer"
    },
    position: "absolute",
    top:"15%",
    right:"3%",
    color: dataChanged?("#0F7B6C"):("gray"),
  }

  // 탈퇴버튼 css
  const deleteButton= {
    "&:hover":{
      color: "#E03E3E",
      transform: "scale(1.1)",
      cursor : "pointer"
    },
    color: "#E03E3E",
    position: "absolute",
    top:"25%",
    right:"3%"
  }
  // 기본이미지 css
  const baseImgButton= {
    "&:hover":{
      color: "#E03E3E",
      transform: "scale(1.1)",
      cursor : "pointer"
    },
    color: "#E03E3E",
    position: "absolute",
    bottom:"10%",
    left:"15%"
  }

  // 본 이미지 css
  const originImgButton= {
    "&:hover":{
      color: "#0F7B6C",
      transform: "scale(1.1)",
      cursor : "pointer"
    },
    color: "#0F7B6C",
    position: "absolute",
    bottom:"10%",
    left:"10%"
  }

  //업로드 이미지 css
  const uploadImgButton= {
    "&:hover":{
      color: "#0B6E99",
      transform: "scale(1.1)",
      cursor : "pointer"
    },
    color: "#0B6E99",
  }

  // 입력창 변경 감지
  useEffect(()=>{
    if(isEditing){
      if(watch("inputName")==userData.userName&&(watch("inputImg")&&watch("inputImg").length==0)){
        setDataChanged(false)
      }else{
        setDataChanged(true)}
    }
  },[watch("inputName"),watch("inputImg"),isEditing]);

  return (
    <Box sx={{ width: "900px", height: "450px", margin:"10px" ,boxShadow: 3, borderRadius:"2em", alignItems:"center", justifyContent:"center",display:"flex", flexDirection:"row", backgroundColor:"#F5F5F7", position:"relative"}}>
      <Box component="img" src={userImg} alt='UserImage' 
      sx={{ objectFit: "cover", objectPosition:"center" ,borderRadius:"50%", width:"200px", height:"200px", overflow: "hidden", padding:"3%"}}  />
      <Box sx={{position: "absolute",bottom:"10%",left:"5%"}}>
          {isEditing&&
          <IconButton component="label" size="medium" sx={uploadImgButton} >
            <FileUploadIcon fontSize="medium"  />
            <input type="file" hidden className="profileImgInput" id= "profileImg" accept="image/png, image/jpeg, image/jpg"
            {...register("inputImg", {
              validate:{
                maxSize : (files) => (!files[0]||files[0]?.size<3 * 1024 * 1024)||"이미지는 3MB 이내로만 업로드 가능합니다.",
              }
            })} />
          </IconButton>
          }
        </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{paddingRight:"3%", paddingLeft:"3%"}}>
        <Box sx={{display:"flex", flexDirection:"row"}}>
          <Box component="ul" sx={{listStyle:"none", padding:"0",paddingRight:"20px", fontWeight:"bold", fontSize:"20px", color:"gray"}}>
            <Box sx={{margin:"20px"}}>이름 : </Box>
            <Box sx={{margin:"20px"}}>가입 경로 : </Box>
            <Box sx={{margin:"20px"}}>이메일 : </Box>
          </Box>
          {isEditing?
            (<Box component="ul" sx={{listStyle:"none", padding:"0", fontWeight:"bold", fontSize:"20px",}}>
              <TextField
                type="text"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                sx={{marginLeft:"10px", marginTop:"20px"}}
                {...register("inputName", {
                  required: "이름을 입력해주세요.",
                  onChange: (e) => {setValue("inputName", e.target.value);},
                  pattern: {
                    value: /^[가-힣a-zA-Z]+$/,
                    message: "올바른 이름을 입력해주세요."
                  }
                })}
              />
              <Box sx={{marginLeft:"20px", marginTop:"9px"}}>{userData.provider}</Box>
              <Box sx={{margin:"20px"}}>{userData.userEmail}</Box>
            </Box>):
            (<Box component="ul" sx={{listStyle:"none", padding:"0", fontWeight:"bold", fontSize:"20px",}}>
              <Box sx={{margin:"20px"}}>{userData.userName}</Box>
              <Box sx={{margin:"20px"}}>{userData.provider}</Box>
              <Box sx={{margin:"20px"}}>{userData.userEmail}</Box>
            </Box>)
          }
          </Box>

        <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", }}>
          <Box sx={{textAlign:"center",width:"220px", height:"130px", marginRight:"50px", boxShadow: 3, borderRadius:"1em", backgroundColor:"#FFFCBF", position:"relative", justifyItems:"center", alignItems:"center"}}>
            <Box sx={{}}>
              <InteractiveWave width={220} height={130} color="#FFFCBF"/>
            </Box>
            <Box sx={{position:"absolute", display:"flex",flexDirection:"column",top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <Box sx={{fontSize:"20px", fontWeight:"bold",color:"#F88C65", textShadow:"1px 1px orange"}}>오늘의 파도</Box>
              <Box sx={{fontSize:"40px", fontWeight:"bolder",color:"White", textShadow:" 1px 1px 1px blue" }}>15</Box>
            </Box>
          </Box>
          <Box sx={{textAlign:"center",width:"220px", height:"130px", boxShadow: 3, borderRadius:"1em", backgroundColor:"#FFFCBF", position:"relative", justifyItems:"center", alignItems:"center"}}>
            <Box sx={{}}>
              <InteractiveWave width={220} height={130} color="#FFFCBF"/>
            </Box>
            <Box sx={{position:"absolute", display:"flex",flexDirection:"column",top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <Box sx={{fontSize:"20px", fontWeight:"bold",color:"green",textShadow:"1px 1px gray"}}>모든 파도</Box>
              <Box sx={{fontSize:"40px", fontWeight:"bolder",color:"White", textShadow:" 1px 1px 1px blue" }}>105</Box>
            </Box>
          </Box>
        </Box>

        <IconButton size="medium" onClick={()=>{setIsEditing(!isEditing); setUserImgSrc(""); resetFileInput(); setValue("inputName",userData.userName!); clearErrors();}} sx={settingButton} >
          <SettingsIcon fontSize="medium" />
        </IconButton>
        {isEditing&&
        <IconButton size="medium" type="submit" disabled={!dataChanged} sx={saveButton} >
          <SaveIcon fontSize="medium" />
        </IconButton>}
        {isEditing&&
        <IconButton size="medium" onClick={(e)=>{preventEvent(e); checkDeleteUser()}} sx={deleteButton} >
          <PersonRemoveAlt1Icon fontSize="medium" />
        </IconButton>}
        {isEditing&&<IconButton size="medium" onClick={(e)=>{preventEvent(e); setUserImgSrc(""); resetFileInput()}} sx={originImgButton} >
          <AccountBoxIcon fontSize="medium" />
        </IconButton>}
        {isEditing&&<IconButton size="medium" onClick={(e)=>{preventEvent(e); setUserImgSrc(baseImg); resetFileInput()}} sx={baseImgButton} >
          <DeleteForeverIcon fontSize="medium" />
        </IconButton>}
        {isEditing&&<Box sx={{position:"absolute", top:"5%", right:"20%", color:"red"}} >
          {errors.inputImg?<span>{errors.inputImg.message}</span>:
            <div>{errors.inputName?<span>{errors.inputName.message}</span>:<div></div>}</div>}
        </Box>}
      </Box>
    </Box>
  )
}

export default observer(EditProfile)