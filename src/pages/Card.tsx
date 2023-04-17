import CardDetail from '@components/CardDetail'
import CardDetailEditable from '@components/CardDetailEditable';
import { useRootStore } from '@provider/rootContext';
import { OceanData } from '@store/OceanStore';
import CardDetailNull from '@components/CardDetailNull';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { Box,  IconButton, Tooltip } from '@mui/material';
import { notionToHtml } from '@service/notionToHtml';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';

function Card() {
  const value = useRootStore()!;
  //카드 파라미터
  const cardId:string = window.location.pathname.split("/").splice(-1)[0];

  const [oceanData,setOceanData]= useState<OceanData>({} as OceanData);
  const [isEditing, setIsEditing]= useState<boolean>(false);
  
  // server data
  useEffect(()=>{
    value.modalStore.openModal();
    value?.oceanStore.getOcean(cardId, setOceanData);
  },[isEditing]);

  useEffect(()=>{
    !value?.oceanStore.isOceanLoading&&value?.modalStore.closeModal();
    return () => {
      value.modalStore.closeModal();
    };
  },[value?.oceanStore.isOceanLoading,oceanData]);

  const handleClickShare = () => {
    const htmlValue:string = notionToHtml(oceanData)
    const element = document.createElement('a');
    const file = new Blob([htmlValue], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${oceanData.title}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return (
    <Box sx={{alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center", textAlign:"center", display:"flex", position:"relative"}}>
      {value.modalStore._IsModalOpen&&
      <>
      {oceanData.title? 
      <div>
        {oceanData.nickname==value?.profileStore.userData.nickname&&
        <Tooltip title={<div style={{fontSize:"15px"}}>설정</div>}>
          <IconButton type="submit" size="medium" sx={{position:"absolute", top:"1em", right:"4.5em", color: "white", bgcolor:"#9B9A97", zIndex:"10",
            "&:hover":{
              "@keyframes rotate": {
                "100%": {
                  transform: "scale(1.1) rotate(180deg)"
                },
              },
              bgcolor:"#9B9A97",
              animation: "rotate 1s infinite",
              cursor : "pointer"
            },
            animation: isEditing?"rotate 1s infinite":"",
            }} onClick={(e)=>{setIsEditing(!isEditing);}}>
            <SettingsIcon fontSize="medium" />
          </IconButton>
        </Tooltip>}

        <Tooltip title={<div style={{fontSize:"15px", wordWrap: "normal", width:"14em" }}>저장된 HTML파일을 노션에서 "가져오기"해서 추가해보세요!</div>}>
          <IconButton type="submit" size="medium" sx={{position:"absolute", top:"4em", right:"4.5em", color: "white", bgcolor:"#0B6E99", zIndex:"11",
          "&:hover":{
              transform: "scale(1.1)",
              color: "#0B6E99", 
              bgcolor:"white"
            },
            cursor : "pointer",
          }} onClick={handleClickShare}>
          <ShareIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

      {isEditing?
        (<CardDetailEditable oceanData={oceanData} setIsEditing={setIsEditing}/>):
        (<CardDetail oceanData={oceanData}/>)}

      </div>:
        <CardDetailNull/>
      }
      </>}
    </Box>
  )
}

export default Card;