import { useRootStore } from '@provider/rootContext';
import { label, labelColor, OceanData, wholeLabelList } from '@store/OceanStore';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Box, Checkbox, FormControlLabel, IconButton, TextField, Tooltip} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ReplayIcon from '@mui/icons-material/Replay';
import Swal from 'sweetalert2';


type cardEditProps = {
  oceanData: OceanData;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardDetailEditable = ({ oceanData, setIsEditing }:cardEditProps) => {
  const value = useRootStore();
  const navigate = useNavigate();
  const wholeLabels:Array<label> = wholeLabelList;

  const oceanLabelList: Array<string> = oceanData.labels.map(item=>JSON.stringify(item));
  const oceanImgUrlList: Array<string> = oceanData.images.map(item => item.imageUrl);
  const oceanImgIdList: Array<string> = oceanData.images.map(item => item.imageId);

  //라벨 기본 클릭 설정
  const labelResetData = ()=>{
    let resetLabel = Array(5);
    for(let i=0;i<resetLabel.length;i++){ 
      if(oceanLabelList.includes(JSON.stringify(wholeLabelList[i]))){
        resetLabel[i]= JSON.stringify(wholeLabelList[i]);
      }
    }
    return resetLabel
  }

  //라벨 비교용 함수
  const labelFilledWithFalse = ()=>{
    let falseLabel = Array(5);
    for(let i=0;i<falseLabel.length;i++){ 
      if(oceanLabelList.includes(JSON.stringify(wholeLabelList[i]))){
        falseLabel[i]= JSON.stringify(wholeLabelList[i]);
      }else{
        falseLabel[i]= false;
      }
    }
    return falseLabel
  }

  const [userImgSrc, setUserImgSrc] = useState<Array<string>>(oceanImgUrlList);
  const [deleteImgSrc, setDeleteImgSrc] = useState<Array<string>>(["","",""]);

  // useForm 선언 ===================================================
  const methods = useForm<{
    inputImg: File[];
    inputTitle: string;
    inputLabel: Array<string>;
    inputContent: string;
  }>({
    defaultValues:{
      inputImg:[],
      inputTitle: oceanData.title,
      inputContent: oceanData.content,
      inputLabel: labelResetData()
    }
  });
  const { register, handleSubmit, formState, formState: { errors }, setValue, watch, reset, getValues } = methods;
  
  const today = new Date().toLocaleDateString();

  // submit 버튼 클릭 시 ===================================================
  const onSubmit = async(data:any)=>{
    const formData:FormData = new FormData();
    let dataLabel:Array<label> = [];
    data.inputLabel.map((element:string)=>{
      if(element) dataLabel.push(JSON.parse(element));
    });
    const updateCard:object= {
      "title": data.inputTitle,
      "labels": dataLabel,
      "content": data.inputContent,
      "deletedImages": deleteImgSrc
    }
    const blob = new Blob([JSON.stringify(updateCard)], {type:"application/json"});
    formData.append("updateCard",blob);
    for(let i=0;i<data.inputImg.length;i++){
      data.inputImg[i]&&formData.append("imgFiles", data.inputImg[i]);
    }
    try {
      value?.modalStore.openModal();
      await value?.oceanStore.patchOcean(oceanData.cardId ,formData);
      setIsEditing(false);
      navigate(`/card/${oceanData.cardId}`)
    } catch (err) {
      console.log(err);
    }
  };

  //이미지를 URL 처리해서 userImgSrc에 저장 이미지 입력받을 때마다 리렌더링 ===================================================
  const changeMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>, index:number): void => {
    if (e.target.files) {
      let changedUserImgSrc = [...userImgSrc];
      changedUserImgSrc[index] = URL.createObjectURL(e.target.files[0]);
      setUserImgSrc([...changedUserImgSrc]);
    }
  };

  //이미지 삭제 ===================================================
  const handleImgClear = (index:number) => {
    // 저장 이미지 변경
    reset({
      inputImg: [
        ...getValues("inputImg").slice(0, index),
        undefined,
        ...getValues("inputImg").slice(index + 1),
      ],
      inputTitle: getValues("inputTitle"),
      inputLabel: getValues("inputLabel"),
      inputContent: getValues("inputContent")
    });

    // 표현 이미지 변경
    let changedUserImgSrc = [...userImgSrc];
    changedUserImgSrc[index] = "";
    setUserImgSrc([...changedUserImgSrc]);

    // 삭제 이미지 변경
    let changedDeleteImgSrc = [...deleteImgSrc];
    changedDeleteImgSrc[index] = oceanImgIdList[index];
    setDeleteImgSrc([...changedDeleteImgSrc]);
  };

   //이미지 리셋  ===================================================
  const handleImgReset = (index:number) => {
    // 저장 이미지 변경
    reset({
      inputImg: [
        ...getValues("inputImg").slice(0, index),
        undefined,
        ...getValues("inputImg").slice(index + 1),
      ],
      inputTitle: getValues("inputTitle"),
      inputLabel: getValues("inputLabel"),
      inputContent: getValues("inputContent")
    });
    
    // 표현 이미지 변경
    let changedUserImgSrc = [...userImgSrc];
    changedUserImgSrc[index] = oceanImgUrlList[index];
    setUserImgSrc([...changedUserImgSrc]);

    // 삭제 이미지 변경
    let changedDeleteImgSrc = [...deleteImgSrc];
    changedDeleteImgSrc[index] = "";
    setDeleteImgSrc([...changedDeleteImgSrc]);
  };

  // 새로고침 방지 ===================================================
  const preventEvent = (e:React.MouseEvent) =>{e.preventDefault();};

  // 삭제 체크 ===================================================
  const checkDelete = ()=>{
    // if (window.confirm('글을 삭제하시겠습니까?')){
    //   if(window.confirm('확인을 누르면 글이 삭제됩니다.')){
    //     value?.oceanStore.deleteOcean(oceanData.cardId); 
    //     navigate(`/card`);} 
    // }else {
    //   return}
    Swal.fire({
      title: '파도를 삭제하시겠어요?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Please'
    }).then((result) => {
      if (result.isConfirmed) {
        value?.oceanStore.deleteOcean(oceanData.cardId); 
        navigate(`/card`);
      }})
    }

  // 저장 체크 ===================================================
  const checkSave = ()=>{
    if(
    //타이틀이 바꼈는지
    watch("inputTitle")===oceanData.title
    //컨텐츠가 바꼈는지
    &&watch("inputContent")===oceanData.content
    //라벨이 바꼈는지
    &&JSON.stringify(labelFilledWithFalse())===JSON.stringify(watch("inputLabel"))
    //이미지 Url이 카드 데이터 Url과 동일한지
    &&JSON.stringify(oceanImgUrlList)==JSON.stringify(userImgSrc)
    //삭제리스트 비어있는지
    &&deleteImgSrc.every((value) => value === "")){
      // window.confirm('변경된 내용이 없습니다.');
      Swal.fire({
        title: "변경된 내용이 없습니다",
        icon: "warning",
      });
    }else{
      // if (window.confirm('저장하시겠습니까?')){
      //   handleSubmit(onSubmit)();
      // }else {return}
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

  // 로딩이 끝나면 모달 닫기
  useEffect(()=>{
    !value?.oceanStore.isOceanLoading&&value?.modalStore.closeModal();
  },[value?.oceanStore.isOceanLoading])

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{bgcolor:"waveBackground", alignItems:"center",borderRadius:"1em", p:"0.5em", mb:"2em",position:"relative", boxShadow: "5"}}>
      <Box sx={{ width:"85%", bgcolor:"#2158A8", borderRadius:"0.5em", py:"1.5em", wordBreak:"break-all",m: "1em auto", position:"relative", fontWeight:"bolder", fontSize:"30px", color: "white", display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center", boxShadow: "5"}}>
        <TextField
          type="text"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          size="small"
          multiline
          error={watch("inputTitle").length>50||watch("inputTitle").length==0 ?true:false}
          helperText={watch("inputTitle").length==0? '제목을 적어주세요.' : watch("inputTitle").length>500 ? '제목은 50글자를 넘을 수 없습니다.' : ''}
          inputProps={{style: {minHeight:"50px", fontWeight:"bolder", fontSize:"30px", color: "white", textAlign:"center", lineHeight: '1.5'}}}
          sx={{width:"90%"}}
          {...register("inputTitle", {
            onChange: (e) => debounce(()=>setValue("inputTitle", e.target.value)),
            required:"제목을 입력해주세요"        
          })}/>
        <Box sx={{pr:"2em", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"1em", right:"0"}}>
          {value?.profileStore.userData.nickname} </Box>
      </Box>

      <Box sx={{width:"85%", height:"5em", bgcolor:"#2E88C7", borderRadius:"1em",display:"flex", m: "0px auto", mb:"1em", justifyContent: "space-between", alignItems:"center", boxShadow: "5" }}>
        <Box sx={{display:"flex",  m:"0.5em"}}>
          {wholeLabels.map((element, index)=>(
            <FormControlLabel key={index} control={<Checkbox value={JSON.stringify(element)} {...register(`inputLabel.${index}`,{onChange:(e) => {}})} sx={{display:"none"}}/>}
            sx={{p:"0.5em",m:"0.5em","&:hover":{transform: "scale(1.1)", cursor : "pointer"},bgcolor:watch(`inputLabel.${index}`)?labelColor(element.color)?.backgroundColor:"white",color: watch(`inputLabel.${index}`)?labelColor(element.color)?.textColor:"gray", display:"flex",borderRadius:"0.8em", boxShadow:watch(`inputLabel.${index}`)?5:"inset 1px 1px 3px #444"}} 
            label={element.name} />
          ))}
        </Box>
        <Box sx={{width:"6em",fontSize:"20px", textAlign:"center", fontWeight:"400", mr:"1em"}}>
          {today}
        </Box>
      </Box>

      <Box sx={{ width:"85%",wordWrap: "break-word", borderRadius:"1em", m:"0px auto", pt:"1em", fontSize:"30px", fontWeight:"bolder",color:"white",alignContent:"center", display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
        {[...Array(3)].map((_, index)=>(
          <Box key={index}
          sx={{backgroundImage: userImgSrc[index]?`url(${userImgSrc[index]})`:"none",width:"25em",height:"10.1em", mx:"0.4em", borderRadius:"20px", border: userImgSrc[index]?" ":"lightblue 5px dashed", position: "relative", boxShadow: "5",backgroundSize: "cover", boxSizing: "border-box", backgroundPosition: "center", }}>
          {errors.inputImg&&<Box sx={{fontSize:"15px", position:"absolute", top:"105%",left:"8%"}}>{errors.inputImg[index]?.message}</Box>}
          {userImgSrc[index]?
          <>
            <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>이미지 삭제</div>}>
              <IconButton size="small" sx={{ position: "absolute", right: "0.5em", top: "0.5em", bgcolor:"gray", color:"white", 
                "&:hover":{
                  bgcolor:"white",color:"gray",
                  transform: "scale(1.1)",
                  cursor : "pointer"
                }}} onClick={() => {handleImgClear(index);}}>
                <CloseIcon fontSize="small"/>
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>이미지 복구</div>}>
              <IconButton size="small" sx={{ position: "absolute", right: "3em", top: "0.5em", bgcolor:"#0B6E99", color:"white", 
              "&:hover":{
                bgcolor:"white",color:"#0B6E99",
                transform: "scale(1.1)",
                cursor : "pointer"
                }}} onClick={() => {handleImgReset(index);}}>
                <ReplayIcon fontSize="small"/>
              </IconButton>
            </Tooltip>
          </>
          :
          <Tooltip placement="top" title={<div style={{ fontSize:"15px" }}>이미지 업로드</div>}>
            <IconButton component="label" size="large" sx={{color:"#0B6E99", display: userImgSrc[index]?'none':"", position:"absolute",top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} >
              {!userImgSrc[index]&&<FileUploadIcon sx={{}} fontSize="large"  />}
              <input type="file" hidden className="profileImgInput" id= "profileImg" accept="image/png, image/jpeg, image/jpg"
              {...register(`inputImg.${index}`, {
                validate:{maxSize : (files:File) => {
                  if(!files||files.length<=0){return true}
                  else if(files.size>3 * 1024 * 1024){return "3MB 이하 파일만 업로드 가능"}
                  else{return true}
                }},
                onChange: (e) => {changeMultipleFiles(e, index); setValue(`inputImg.${index}`, e.target.files[0]);}
              })} />
            </IconButton>
          </Tooltip>
          }
        </Box>
        ))}
      </Box>

      <Box sx={{ width:"80%", p:"2em", wordWrap: "break-word", bgcolor:"#D3ECF9", borderRadius:"1em", m:"2em auto", fontSize:"20px", alignContent:"center", boxShadow: "5"}}>
        <TextField
          type="text"
          id="outlined-basic"
          label="Content"
          variant="outlined"
          size="small"
          multiline
          rows={6}
          error={watch("inputContent").length==0 ?true:false}
          helperText={watch("inputContent").length==0? '내용을 적어주세요.' :''}
          sx={{width:"100%"}}
          inputProps={{style: {fontSize: 20}}}
          {...register("inputContent", {
            onChange: (e) => debounce(()=>setValue("inputContent", e.target.value)),
            required:"내용을 입력해주세요" 
          })}/>
      </Box>

      <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>글 수정</div>}>
        <IconButton type="submit" size="medium" sx={{position:"absolute", top:"5em", right:"1em", color: "white", bgcolor:"#0F7B6C", 
        "&:hover":{
          color: "#0F7B6C", bgcolor:"white",
          transform: "scale(1.1)",
          cursor : "pointer",
        }}} onClick={(e)=>{preventEvent(e); throttle(checkSave);}}>
          <SaveIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      
      <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>글 삭제</div>}>
        <IconButton size="medium" sx={{position:"absolute", top:"9em", right:"1em", color: "white", bgcolor:"#E03E3E", 
        "&:hover":{
          color: "#E03E3E", bgcolor:"white",
          transform: "scale(1.1)",
          cursor : "pointer"
        }}} onClick={(e)=>{preventEvent(e); throttle(checkDelete) }} >
          <DeleteForeverIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      
    </Box>
  )
}

export default observer(CardDetailEditable)

