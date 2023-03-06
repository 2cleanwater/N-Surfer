import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = responsiveFontSizes(createTheme({
  palette:{
    google: '#4285F4',
    googleHover: '#2366D1',
    github: '#292727',
    githubHover: '#171515',
    naver: '#2DB400',
    naverHover: '#1F7C00',
    kakao: '#f9e000',
    kakaoHover: '#CCB200',
    waveLv0: '#f0f5f7',
    waveLv1: '#D3ECF9',
    waveLv2: '#9CCCE8',
    waveLv3: '#2E88C7',
    waveLV4: '#2158A8',
    waveLv5: '#232A5C'
  },
}));

