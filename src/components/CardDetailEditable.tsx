import { useRootStore } from '@/provider/rootContext';
import { label, labelColor, OceanData, wholeLabelList } from '@/store/OceanStore';
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField} from '@mui/material'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';


const CardDetailEditable = ({oceanData}:{oceanData:OceanData}) => {
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

  const [labelList, setLabelList] = useState<Array<string>>(labelResetData());
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
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset, clearErrors, getValues, unregister } = methods;
  
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
    formData.append("postCard",blob);
    for(let i=0;i<data.inputImg.length;i++){
      data.inputImg[i]&&formData.append("imgFiles", data.inputImg[i]);
    }
    value?.oceanStore.postOcean(formData, navigate);
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
    if (window.confirm('글 작성을 취소하시겠습니까? 글 내용이 사라집니다.')){
      if(window.confirm('확인을 누르면 취소됩니다.')){
        value?.oceanStore.deleteOcean(oceanData.cardId);} 
    }else return}

      
  // 저장 체크 ===================================================
  const checkSave = ()=>{
    if (window.confirm('저장하시겠습니까?')){
      handleSubmit(onSubmit);
    }else return}
  
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{bgcolor:"waveBackground", width:"900px", alignItems:"center",borderRadius:"2em", p:"10px", mb:"50px",position:"relative", boxShadow: "5"}}>
      <Box sx={{bgcolor:"#2158A8", borderRadius:"1em",width:"750px", p:"25px",pt:"55px", pb:"55px",wordBreak:"break-all",m: "30px auto", mb:"15px", position:"relative", fontWeight:"bolder", fontSize:"30px", color: "white", display:"flex", flexDirection:"column" ,justifyContent:"center", alignItems:"center", boxShadow: "5"}}>
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
          sx={{width:"700px"}}
          {...register("inputTitle", {
            onChange: (e) => setValue("inputTitle", e.target.value),
            required:"제목을 입력해주세요"        
          })}/>
        <Box sx={{pr:"50px", color:"lightblue",fontWeight:"bold",fontSize:"20px" ,textAlign:"right", position:"absolute", bottom:"20px", right:"0px"}}>by. {value?.profileStore.userData.nickname} </Box>
      </Box>

      <Box sx={{width:"800px", height:"80px", bgcolor:"#2E88C7", borderRadius:"1em",display:"flex", m: "0px auto", mb:"40px", justifyContent: "space-between", alignItems:"center", boxShadow: "5" }}>
        <Box sx={{display:"flex"}}>
          {wholeLabels.map((element, index)=>(
            <Box component="label" key={index} htmlFor='' sx={{bgcolor:watch(`inputLabel.${index}`)?labelColor(element.color)?.backgroundColor:"white", display:"flex", ml:"20px", borderRadius:"0.8em", pl:"10px", boxShadow:watch(`inputLabel.${index}`)?5:"inset 1px 1px 3px #444"}}>
              <FormControlLabel control={<Checkbox value={JSON.stringify(element)} checked={labelList[index]===JSON.stringify(element)?true:false} {...register(`inputLabel.${index}`,{onChange:(e) => {setLabelList(watch("inputLabel"))}})} sx={{display:"none"}}/>} 
              sx={{m:"10px auto", mr:"10px", color: watch(`inputLabel.${index}`)?labelColor(element.color)?.textColor:"gray" }}
              label={element.name} />
            </Box>
            ))}
        </Box>
        <Box sx={{width:"110px",fontSize:"20px", textAlign:"center", fontWeight:"400", mr:"30px"}}>
          {today}
        </Box>
      </Box>

      <Box sx={{ width:"800px",wordWrap: "break-word", borderRadius:"1em", m:"0px auto", pt:"10px", fontSize:"30px", fontWeight:"bolder",color:"white",alignContent:"center", display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
        {[...Array(3)].map((_, index)=>(
          <Box key={index} sx={{width:"220px",height:"270px", m:"10px", borderRadius:"20px", border: userImgSrc[index]?"lightblue 5px solid":"lightblue 5px dashed", position: "relative", boxShadow: "5"}}>
            {errors.inputImg&&<Box sx={{fontSize:"15px", position:"absolute", top:"105%",left:"8%"}}>{errors.inputImg[index]?.message}</Box>}
            <Box sx={{ display: userImgSrc[index]?'none':"", position:"absolute",top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
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
            </Box>
            {userImgSrc[index]&&
            <Box sx={{}}>
              <Box component="img" key={index} src={userImgSrc[index]} alt='UserImage' 
                sx={{width:"220px",height:"270px", borderRadius:"15px", objectFit: "cover", objectPosition:"center", overflow: "hidden"}} />
            </Box>}
            <IconButton size="small" sx={{ position: "absolute", right: "10px", top: "10px", bgcolor:"gray", color:"white", 
              "&:hover":{
                bgcolor:"white",color:"gray",
                transform: "scale(1.1)",
                cursor : "pointer"
              }}} onClick={() => {handleImgClear(index);}}>
                <CloseIcon fontSize="small"/>
              </IconButton>
              <IconButton size="small" sx={{ position: "absolute", right: "50px", top: "10px", bgcolor:"#0B6E99", color:"white", 
              "&:hover":{
                bgcolor:"white",color:"#0B6E99",
                transform: "scale(1.1)",
                cursor : "pointer"
              }}} onClick={() => {handleImgReset(index);}}>
                <ReplayIcon fontSize="small"/>
              </IconButton>
          </Box>
        ))}
      </Box>

      <Box sx={{ width:"720px", p:"40px", wordWrap: "break-word", bgcolor:"#D3ECF9", borderRadius:"1em", m:"40px auto", fontSize:"20px", alignContent:"center", boxShadow: "5"}}>
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
          sx={{width:"700px"}}
          inputProps={{style: {fontSize: 20}}}
          {...register("inputContent", {
            onChange: (e) => setValue("inputContent", e.target.value),
            required:"내용을 입력해주세요" 
          })}/>
      </Box>

      <IconButton type="submit" size="medium" sx={{position:"absolute", top:"7%", right:"10px", color: "white", bgcolor:"#0F7B6C", 
      "&:hover":{
        color: "#0F7B6C", bgcolor:"white",
        transform: "scale(1.1)",
        cursor : "pointer"
      }}} onClick={(e)=>{checkSave();}}>
        <SaveIcon fontSize="medium" />
      </IconButton>

      <IconButton size="medium" sx={{position:"absolute", top:"13%", right:"10px", color: "white", bgcolor:"#E03E3E", 
      "&:hover":{
        color: "#E03E3E", bgcolor:"white",
        transform: "scale(1.1)",
        cursor : "pointer"
      }}} onClick={(e)=>{preventEvent(e); checkDelete(); }} >
        <DeleteForeverIcon fontSize="medium" />
      </IconButton>
    </Box>
  )
}

export default CardDetailEditable

