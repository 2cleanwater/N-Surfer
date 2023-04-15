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
  const { register, handleSubmit, formState, formState: { isSubmitting, errors }, setValue, watch, reset, getValues } = methods;
  
  const today = new Date().toLocaleDateString();

  // submit 버튼 클릭 시 ===================================================
  const onSubmit = async(data:any)=>{
    const formData:FormData = new FormData();
    let dataLabel:Array<label> = [];
    data.inputLabel.map((element:string)=>{
      if(element) dataLabel.push(JSON.parse(element));
    });
    const postcard:object= {"title":data.inputTitle,"labels":dataLabel,"content":data.inputContent}
    const blob = new Blob([JSON.stringify(postcard)], {type:"application/json"});
    formData.append("updateCard",blob);
    for(let i=0;i<data.inputImg.length;i++){
      data.inputImg[i]&&formData.append("imgFiles", data.inputImg[i]);
    }
    for(let i=0;i<deleteImgSrc.length;i++){
      deleteImgSrc[i]&&formData.append("deletedImages", deleteImgSrc[i]);
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
    changedDeleteImgSrc[index] = oceanImgUrlList[index];
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
    if (window.confirm('글을 삭제하시겠습니까?')){
      if(window.confirm('확인을 누르면 글이 삭제됩니다.')){
        value?.oceanStore.deleteOcean(oceanData.cardId); 
        navigate(`/card`);} 
    }else {
      return}
    }

  // 저장 체크 ===================================================
  const checkSave = ()=>{
    if(Object.keys(formState.dirtyFields).length <= 0&&JSON.stringify(oceanImgUrlList)==JSON.stringify(userImgSrc)){
      window.confirm('변경된 내용이 없습니다.');
    }else{
      if (window.confirm('저장하시겠습니까?')){
        handleSubmit(onSubmit)();
      }else {return}
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{bgcolor:"waveBackground", width:"57em", alignItems:"center",borderRadius:"2em", p:"0.5em", mb:"3em",position:"relative", boxShadow: "5"}}>
      <Box sx={{bgcolor:"#2158A8", borderRadius:"1em",width:"25em", p:"0.8em",py:"1.5em", wordBreak:"break-all",m: "1em auto", position:"relative", fontWeight:"bolder", fontSize:"30px", color: "white", display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center", boxShadow: "5"}}>
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
          sx={{width:"23em"}}
          {...register("inputTitle", {
            onChange: (e) => debounce(()=>setValue("inputTitle", e.target.value)),
            required:"제목을 입력해주세요"        
          })}/>
        <Box sx={{pr:"2em", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"1em", right:"0"}}>
          by. {value?.profileStore.userData.nickname} </Box>
      </Box>

      <Box sx={{width:"50em", height:"5em", bgcolor:"#2E88C7", borderRadius:"1em",display:"flex", m: "0px auto", mb:"1em", justifyContent: "space-between", alignItems:"center", boxShadow: "5" }}>
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

      <Box sx={{ width:"25em",wordWrap: "break-word", borderRadius:"1em", m:"0px auto", pt:"1em", fontSize:"30px", fontWeight:"bolder",color:"white",alignContent:"center", display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
        {[...Array(3)].map((_, index)=>(
          <Box key={index} sx={{width:"25em",height:"10em", m:"0.2em", borderRadius:"20px", border: userImgSrc[index]?"lightblue 5px solid":"lightblue 5px dashed", position: "relative", boxShadow: "5"}}>
            {errors.inputImg&&<Box sx={{fontSize:"15px", position:"absolute", top:"105%",left:"8%"}}>{errors.inputImg[index]?.message}</Box>}
            <Box sx={{ display: userImgSrc[index]?'none':"", position:"absolute",top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
              <Tooltip title={<div style={{ fontSize:"15px" }}>이미지 업로드</div>}>
                <IconButton component="label" size="large" sx={{color:"#0B6E99"}} >
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
            </Box>
            {userImgSrc[index]&&
            <Box sx={{}}>
              <Box component="img" key={index} src={userImgSrc[index]} alt='UserImage' 
                sx={{width:"7.5em",height:"10em", borderRadius:"15px", objectFit: "cover", objectPosition:"center", overflow: "hidden"}} />
            </Box>}

            <Tooltip title={<div style={{fontSize:"15px"}}>이미지 삭제</div>}>
              <IconButton size="small" sx={{ position: "absolute", right: "0.5em", top: "0.5em", bgcolor:"gray", color:"white", 
                "&:hover":{
                  bgcolor:"white",color:"gray",
                  transform: "scale(1.1)",
                  cursor : "pointer"
                }}} onClick={() => {handleImgClear(index);}}>
                  <CloseIcon fontSize="small"/>
              </IconButton>
            </Tooltip>
            
            <Tooltip title={<div style={{fontSize:"15px"}}>이미지 복구</div>}>
              <IconButton size="small" sx={{ position: "absolute", right: "3em", top: "0.5em", bgcolor:"#0B6E99", color:"white", 
              "&:hover":{
                bgcolor:"white",color:"#0B6E99",
                transform: "scale(1.1)",
                cursor : "pointer"
                }}} onClick={() => {handleImgReset(index);}}>
                <ReplayIcon fontSize="small"/>
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </Box>

      <Box sx={{ width:"40em", p:"2em", wordWrap: "break-word", bgcolor:"#D3ECF9", borderRadius:"1em", m:"1em auto", fontSize:"20px", alignContent:"center", boxShadow: "5"}}>
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
          sx={{width:"40em"}}
          inputProps={{style: {fontSize: 20}}}
          {...register("inputContent", {
            onChange: (e) => debounce(()=>setValue("inputContent", e.target.value)),
            required:"내용을 입력해주세요" 
          })}/>
      </Box>
      <Tooltip title={<div style={{fontSize:"15px"}}>글 수정</div>}>
        <IconButton type="submit" size="medium" disabled={isSubmitting} sx={{position:"absolute", top:"7em", right:"0.5em", color: "white", bgcolor:"#0F7B6C", 
        "&:hover":{
          color: "#0F7B6C", bgcolor:"white",
          transform: "scale(1.1)",
          cursor : "pointer",
        }}} onClick={(e)=>{preventEvent(e); throttle(checkSave);}}>
          <SaveIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      
      <Tooltip title={<div style={{fontSize:"15px"}}>글 삭제</div>}>
        <IconButton size="medium" sx={{position:"absolute", top:"10em", right:"0.5em", color: "white", bgcolor:"#E03E3E", 
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

