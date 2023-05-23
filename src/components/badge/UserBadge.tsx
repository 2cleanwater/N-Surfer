import { useRootStore } from '@provider/rootContext';
import { BadgeDataForm, Badges } from '@store/UserStore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Tooltip, Typography } from '@mui/material'
import { LinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react'
import StarsIcon from '@mui/icons-material/Stars';

const UserBadge = ({nickname}:{nickname:string}) => {
  const value= useRootStore();
  const [badgeData, setBadgeData]= useState<BadgeDataForm>({categories:[]});
  useEffect(()=>{
    value?.userStore.getBadgeData(nickname, setBadgeData);
  },[])

  const bestBadge= (badgeData:BadgeDataForm)=>{
    let bestBadge:Array<Badges>=[];
    if(badgeData.categories.length>0){
      for(let i=0;i< badgeData.categories.length;i++){
        for(let j=badgeData.categories[i].badges.length-1;j>0;j--){
          if(bestBadge.length>=3) break;
          if(badgeData.categories[i].badges[j].isAcquired){
            bestBadge.push(badgeData.categories[i].badges[j]);
            break;
          } 
        }
      }
    }
    return bestBadge
  }
  return (
    <Box sx={{width:"92%", alignItems:"center" }}>
      <Accordion square={true} sx={{ borderRadius: '2em'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{width:"100%", my:"1em"}}>
            <Box sx={{ display:"flex", mx:"0.5em", fontSize:"1.5em", fontWeight:"bold", alignItems:"center", justifyItems:"center"}}><StarsIcon sx={{color:"gold", mr:"0.3em"}}/>도전과제 전시대</Box>
            <Box sx={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "1fr"}}>
              {bestBadge(badgeData).length>0?bestBadge(badgeData).map((badges, badgeIndex)=>(
                <Box key={badgeIndex} sx={{mx:"1em", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center"}} >
                  <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>{badges.description}</div>}>
                    <Box component="img" src={badges.imgUrl} alt='UserImage' 
                    sx={{ objectFit: "cover", objectPosition:"center" ,borderRadius:"50%", width:"8em", height:"8em", overflow: "hidden", m:"1em",
                    filter: "grayscale(0%)",
                    }}  />
                  </Tooltip>
                  <Box sx={{height:"10%", fontWeight:"bold", fontSize:"1.1em"}}>{badges.name}</Box>
                </Box>
              )):<Box  sx={{mx:"1em", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center"}}/>}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {badgeData.categories.map((category, index)=>(
            <Box key={index} sx={{margin:"1em"}}>
              <Divider/>
              <Box sx={{mt:"0.5em",mx:"0.5em", fontSize:"2em", fontWeight:"bold"}}>{category.categoryName}</Box>
              <Box sx={{display:"grid", gridTemplateColumns: "repeat(5, 1fr)", gridAutoRows: "1fr"}}>
                {category.badges.map((badges, badgeIndex)=>(
                  <Box key={badgeIndex} sx={{mx:"1em", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center"}} >
                    <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>{badges.description}</div>}>
                      <Box component="img" src={badges.imgUrl} alt='UserImage' 
                      sx={{ objectFit: "cover", objectPosition:"center" ,borderRadius:"50%", width:"8em", height:"8em", overflow: "hidden", m:"1em",
                      filter: badges.isAcquired?badgeIndex===category.badges.length-1?"grayscale(0%) drop-shadow(0 0 1rem rgb(255, 217, 0))":"grayscale(0%)":"grayscale(100%)",
                      }}  />
                    </Tooltip>
                    <Box sx={{width:"100%",bgcolor:"lightgray", height:"1em", borderRadius:"1em", position:"relative" }}>
                      <Box position="absolute" sx={{fontSize:"0.5em", color:"black", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>{badges.presentValue} / {badges.goalValue}</Box>
                      <Box sx={{width:`${badges.presentValue/badges.goalValue*100}%`, bgcolor:"#2E88C7", height:"1em", borderRadius:"1em" }}></Box>
                    </Box>
                    <Box sx={{height:"10%", fontWeight:"bold", fontSize:"1.1em"}}>{badges.name}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default UserBadge