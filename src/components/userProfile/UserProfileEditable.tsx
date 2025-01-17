import { useRootStore } from '@provider/rootContext';
import InteractiveWave from '@components/utils/InteractiveWave'
import {UserDataForm} from '@store/ProfileStore'

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Swal from 'sweetalert2';


type myProfileEditProps = {
  userData: UserDataForm;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  // getUserData: (getByNickName:string)=>void;
}

const EditProfile = ({ userData, setIsEditing, 
  // getUserData 
}:myProfileEditProps) => {
  const value = useRootStore()!;
  const navigate = useNavigate();
  const baseImg:string= process.env.REACT_APP_PROFILE_BASE_IMG!;

  const [userImg, setUserImg] = useState<string>(userData.imgUrl||baseImg);
  const [imgSrc, setImgSrc] = useState<string>(userImg)
  const [isBasicImg, setIsBasicImg] = useState<string>("false");

  const [todayWave, setTodayWave] = useState<number>(userData.todayWave||0)
  const [totalWave, setTotalWave] = useState<number>(userData.totalWave||0)

  // useForm 선언 ===================================================
  const methods = useForm<{
    inputImg: File[];
    inputName: string;
  }>({
    defaultValues:{
      inputImg: [],
      inputName: userData.nickname
    }
  });

  const { register, handleSubmit,formState, formState: { errors }, setValue, watch, reset } = methods;

  // submit 버튼 클릭 시 ===================================================
  const onSubmit = async(data:any)=>{
    const formData:FormData = new FormData();
    const updateProfile:object= {"isBasicImg":isBasicImg,"nickname":data.inputName}
    const blob = new Blob([JSON.stringify(updateProfile)], {type:"application/json"});
    formData.append("updateProfile",blob);
    formData.append("imgFile", data.inputImg[0]);
    try {
      //patch후 navigate. param로 nickname을 받아온 후 getUserData가 완료될때까지 대기
      value?.modalStore.openModal();
      console.log(formData)
      await value.profileStore.patchMyUserData(formData);
      navigate(`/user/profile?nickname=${data.inputName}`)
      // await getUserData(data.inputName);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };
  
  // 새로고침 방지 ===================================================
  const preventEvent = (e:React.MouseEvent) =>{e.preventDefault();};

  // 삭제 체크 ===================================================
  const checkDeleteUser = ()=>{
    // if (window.confirm('탈퇴하시겠습니까?')){
    //   if(window.confirm('확인을 누르면 탈퇴됩니다.')){
    //     value.profileStore.deleteMyUserData();
    //     navigate("/");} 
    // }else {
    //   return}
    Swal.fire({
      title: '탈퇴하시겠어요?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Please'
    }).then((result) => {
      if (result.isConfirmed) {
        value.profileStore.deleteMyUserData();
        navigate("/")
      }
    })
    }
      
  // 저장 체크 ===================================================
  const checkSave = ()=>{
    if(Object.keys(formState.dirtyFields).length <= 0&&
    watch("inputName")==userData.nickname&&
    (watch("inputImg")&&
    watch("inputImg").length==0)&&
    userData.imgUrl===imgSrc
    ){
      // window.confirm('변경된 내용이 없습니다.');
      Swal.fire({
        title: "변경된 내용이 없습니다",
        icon: "warning",
      });
    }else{
      // if (window.confirm('저장하시겠습니까?')){
      //   handleSubmit(onSubmit)();
      // }else {
      //   return}
      Swal.fire({
        title: "저장하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "btn btn-success",
        cancelButtonColor: "#d33",
        confirmButtonText: "저장"
      }).then((result) => {
        if (result.isConfirmed) {
          handleSubmit(onSubmit)();
        }});
    }  
  }

  //기본 이미지 체커
  const handleBaseImg= ()=>{
    // if(isBasicImg==="true"){
    if(imgSrc===baseImg){
      // console.log("이미 기본 이미지입니다.")
      Swal.fire({
        title: "이미 기본 이미지입니다",
        icon: "warning",
      });
    }
    else{
      //표현 이미지 기본으로 변경
      setImgSrc(baseImg); 
      //기본이미지임을 명시
      setIsBasicImg("true");
      //input 비우기
      resetFileInput()
    }
  }

  //최근 이미지 체커
  const handleRecentImg= ()=>{
    //표현 이미지 최근이미지로 변경
    setImgSrc(userData.imgUrl||baseImg); 
    //기본이미지 거짓
    setIsBasicImg("false")
    //input 비우기 
    resetFileInput()
  }
  
  //이미지를 URL 처리해서 userImgSrc에 저장 이미지 입력받을 때마다 리렌더링 ===================================================
  const inputFile = watch("inputImg");
  useEffect(()=>{
    if(inputFile && inputFile.length>0){
      setImgSrc(URL.createObjectURL(inputFile[0]));
      setIsBasicImg("false");
    }},[inputFile]);

  //이미지 업로드 취소 ===================================================
  const resetFileInput = ():void => {
    // setValue("inputImg", []);
    reset({inputImg:[]});
  };

  // 쓰로쓸링 디바운싱
  let timer: NodeJS.Timeout | number = 0;
  const throttle = (func:Function): void => {
    if (timer) {return;}  
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

  // 저장버튼 css
  const saveButton= {
    "&:hover":{
      color: "#0F7B6C",
      transform: "scale(1.1)",
      cursor : "pointer"
    },
    position: "absolute",
    top:"3em",
    right:"1em",
    color: "#0F7B6C",
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
    top:"5.5em",
    right:"1em"
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
    bottom:"5%",
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
    bottom:"5%",
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
  return (
    <Box sx={{ width: "60em", height: "30em", m:"1em" ,boxShadow: 3, borderRadius:"2em", alignItems:"center", justifyContent:"center",display:"flex", flexDirection:"row", backgroundColor:"#F5F5F7", position:"relative"}}>
      <Box component="img" src={imgSrc} alt='UserImage' 
      sx={{ objectFit: "cover", objectPosition:"center" ,borderRadius:"50%", width:"18em", height:"18em", overflow: "hidden", m:"4%"}}  />
      <Box sx={{position: "absolute",bottom:"5%",left:"5%"}}>
        <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>사진 업로드</div>}>
          <IconButton component="label" size="medium" sx={uploadImgButton} >
            <FileUploadIcon fontSize="medium"  />
            <input type="file" hidden className="profileImgInput" id= "profileImg" accept="image/png, image/jpeg, image/jpg"
            {...register("inputImg", {
              validate:{
                maxSize : (files) => (!files[0]||files[0]?.size<3 * 1024 * 1024)||"이미지는 3MB 이내로만 업로드 가능합니다.",
              }
            })} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{pr:"3%", pl:"3%"}}>
        <Box sx={{display:"flex", flexDirection:"row"}}>
          <Box component="ul" sx={{listStyle:"none", p:"0",pr:"1em", fontWeight:"bold", fontSize:"20px", color:"gray"}}>
            <Box sx={{m:"1em"}}>이름 : </Box>
            <Box sx={{m:"1em"}}>가입 경로 : </Box>
            <Box sx={{m:"1em"}}>이메일 : </Box>
          </Box>
            <Box component="ul" sx={{listStyle:"none", p:"0", fontWeight:"bold", fontSize:"20px",}}>
              <TextField
                type="text"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                sx={{ml:"1em", mt:"0.8em"}}
                {...register("inputName", {
                  required: "이름을 입력해주세요.",
                  onChange: (e) => {debounce(()=>setValue("inputName", e.target.value))},
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9]+$/,
                    message: "올바른 이름을 입력해주세요."
                  }
                })}
              />
              <Box sx={{ml:"1em", mt:"0.7em"}}>{userData.provider}</Box>
              <Box sx={{m:"1em"}}>{userData.userEmail}</Box>
            </Box>
          </Box>

        <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", }}>
          <Box sx={{textAlign:"center",width:"180px", height:"180px", mr:"3em", boxShadow: 3, borderRadius:"50%", bgcolor:"#FFFCBF", position:"relative", justifyItems:"center", alignItems:"center"}}>
            <Box sx={{}}>
              <InteractiveWave width={180} height={180} color="#FFFCBF" percent={2.5} radius={"50%"}/>
            </Box>
            <Box sx={{position:"absolute", display:"flex",flexDirection:"column",top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <Box sx={{fontSize:"1.1em", fontWeight:"bold",color:"#F88C65", textShadow:"1px 1px orange", pb:"1em"}}>오늘의 파도</Box>
              <Box sx={{fontSize:"40px", fontWeight:"bolder",color:"White", textShadow:" 1px 1px 1px blue"}}>{userData?.todayWave}</Box>
            </Box>
          </Box>
          <Box sx={{textAlign:"center",width:"180px", height:"180px", boxShadow: 3, borderRadius:"50%", bgcolor:"#FFFCBF", position:"relative", justifyItems:"center", alignItems:"center"}}>
            <Box sx={{}}>
              <InteractiveWave width={180} height={180} color="#FFFCBF" percent={2.5} radius={"50%"}/>
            </Box>
            <Box sx={{position:"absolute", display:"flex",flexDirection:"column",top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <Box sx={{fontSize:"20px", fontWeight:"bold",color:"green",textShadow:"1px 1px green", pb:"1em"}}>모든 파도</Box>
              <Box sx={{fontSize:"40px", fontWeight:"bolder",color:"White", textShadow:" 1px 1px 1px blue"}}>{userData?.totalWave}</Box>
            </Box>
          </Box>
        </Box>
        
        <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>프로필 저장</div>}>
          <IconButton size="medium" type="submit" onClick={(e)=>{preventEvent(e); checkSave();}} sx={saveButton} >
            <SaveIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        
        <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>회원 탈퇴</div>}>
          <IconButton size="medium" onClick={(e)=>{preventEvent(e); throttle(checkDeleteUser);}} sx={deleteButton} >
            <PersonRemoveAlt1Icon fontSize="medium" />
          </IconButton>
        </Tooltip>
        
        <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>프로필 사진 복구</div>}>
          <IconButton size="medium" onClick={(e)=>{preventEvent(e); handleRecentImg()}} sx={originImgButton} >
            <AccountBoxIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        
        <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>기본 이미지로 변경</div>}>
          <IconButton size="medium" onClick={(e)=>{preventEvent(e); handleBaseImg()}} sx={baseImgButton} >
            <DeleteForeverIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        <Box sx={{position:"absolute", top:"5%", right:"20%", color:"red"}} >
          {errors.inputImg?<span>{errors.inputImg.message}</span>:
            <div>{errors.inputName?<span>{errors.inputName.message}</span>:<div></div>}</div>}
        </Box>
      </Box>
    </Box>
  )
}

export default observer(EditProfile)