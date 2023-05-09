import { useRootStore } from '@provider/rootContext';
import { BadgeDataForm } from '@store/UserStore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import UserBadge from './UserBadge';

const UserBadgeMini = () => {
  const value= useRootStore();
  const dummyBadgeData:BadgeDataForm= {
    "categories": [
      {
        "categoryId": "1",
        "categoryName": "잔디",
        "badges": [
          {
            "badgeId": "1",
            "name": "첫 번째 걸음",
            "description": "파도 갯수 1회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true,
            "badgeImageUrl":"https://res.cloudinary.com/nsurfer/image/upload/v1683618081/chopchop.png"
          },          
          {
            "badgeId": "2",
            "name": "열 번째 걸음",
            "description": "파도 갯수 10회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true,
            "badgeImageUrl":"https://res.cloudinary.com/nsurfer/image/upload/v1683618081/chopchop.png"
          },
          {
            "badgeId": "2",
            "name": "열 번째 걸음",
            "description": "파도 갯수 10회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true,
            "badgeImageUrl":"https://res.cloudinary.com/nsurfer/image/upload/v1683618081/chopchop.png"
          },
          {
            "badgeId": "2",
            "name": "열 번째 걸음",
            "description": "파도 갯수 10회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true,
            "badgeImageUrl":"https://res.cloudinary.com/nsurfer/image/upload/v1683618081/chopchop.png"
          },
          {
            "badgeId": "2",
            "name": "열 번째 걸음",
            "description": "파도 갯수 10회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true,
            "badgeImageUrl":"https://res.cloudinary.com/nsurfer/image/upload/v1683618081/chopchop.png"
          },
          {
            "badgeId": "2",
            "name": "열 번째 걸음",
            "description": "파도 갯수 10회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true,
            "badgeImageUrl":"https://res.cloudinary.com/nsurfer/image/upload/v1683618081/chopchop.png"
          },
          {
            "badgeId": "2",
            "name": "열 번째 걸음",
            "description": "파도 갯수 10회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true,
            "badgeImageUrl":"https://res.cloudinary.com/nsurfer/image/upload/v1683618081/chopchop.png"
          }
        ]
      },
      {
        "categoryId": "2",
        "categoryName": "출석",
        "badges": [
          {
            "badgeId": "1",
            "name": "첫 번째 걸음",
            "description": "파도 갯수 1회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true,
            "badgeImageUrl":"https://res.cloudinary.com/nsurfer/image/upload/v1683618077/scream.png"
          },          
          {
            "badgeId": "2",
            "name": "열 번째 걸음",
            "description": "파도 갯수 10회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true,
            "badgeImageUrl":"https://res.cloudinary.com/nsurfer/image/upload/v1683618077/scream.png"
          }
        ]
      },
    ]
  }

  return (
    <Box sx={{width:"90%", bgcolor:"red", borderRadius:"1em"}}>
      <Accordion sx={{borderRadius:"100em"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{margin:"1em", fontSize:"1.5em", fontWeight:"bold"}}>뱃지</Box>
        </AccordionSummary>
        <AccordionDetails>
          {dummyBadgeData.categories.map((category, index)=>(
            <Box key={index} sx={{margin:"1em"}}>
              <Divider/>
              <Box sx={{margin:"1em", fontSize:"1.5em", fontWeight:"bold"}}>{category.categoryName}</Box>
              <Box sx={{display:"grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
                {category.badges.map((badges, badgeIndex)=>(
                  <Box key={badgeIndex} sx={{width:"16%", margin:"1em",alignItems:"center"}} >
                    <Box component="img" src={badges.badgeImageUrl} alt='UserImage' 
                    sx={{ objectFit: "cover", objectPosition:"center" ,borderRadius:"50%", width:"8em", height:"8em", overflow: "hidden"}}  />
                    <Box>{badges.name}</Box>
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

export default UserBadgeMini