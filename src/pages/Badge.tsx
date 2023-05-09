import { BadgeDataForm } from '@store/UserStore'
import { useRootStore } from '@provider/rootContext'


import { Box } from '@mui/material'
import React, { useEffect } from 'react'


const Badge = () => {
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
            "isAcquired": true
          },          
          {
            "badgeId": "2",
            "name": "열 번째 걸음",
            "description": "파도 갯수 10회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true
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
            "isAcquired": true
          },          
          {
            "badgeId": "2",
            "name": "열 번째 걸음",
            "description": "파도 갯수 10회 달성",
            "presentValue": 0,
            "goalValue": 1,
            "isAcquired": true
          }
        ]
      },
    ]
  }

  useEffect(()=>{

  },[]);
  return (
    <Box sx={{position: "relative", width:"92%", margin:"auto", border:"1px black ", display:"flex", flexDirection:"column",justifyContent: "center", alignItems: "center"}}>
      Badge
    </Box>
  )
}

export default Badge