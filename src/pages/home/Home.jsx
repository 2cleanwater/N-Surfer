import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import useStore from '../../store/useStore';
import { observer } from 'mobx-react';
import CardMini from '../../components/card/CardMini';
import Wave from '../../components/wave/Wave';
import { Box } from '@mui/material';

const Home = () => {
  const {value} = useStore();
  return (
    <div>
      <div>
        <Box component="img" src='../../../images/MainImg.jpg' alt='HomeIMG'
        sx={{height:500, my: 2, p: 2}}/>
        <div>당신의 기록 어쩌구 저쩌구</div>
      </div>
      {value.authStore.user&&
        (<div>
          <Wave></Wave>
          <Link to='/card'><button>파도 추가하기</button></Link>
        </div>)
      }
      <Box sx={{display:'flex'}}>
        <CardMini/>
        <CardMini/>
        <CardMini/>
      </Box>
    </div>
  )
}
export default observer(Home);