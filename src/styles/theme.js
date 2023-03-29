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
    waveBackground: '#E7BD73'
  },
}));

