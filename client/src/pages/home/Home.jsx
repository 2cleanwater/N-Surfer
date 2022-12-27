import React from 'react'
import styles from './Home.module.css';
import useStore from '../../store/useStore';
import { observer } from 'mobx-react';

const Home = () => {
  const {value} = useStore();
  return (
    <div>
      Home
    </div>
  )
}
export default observer(Home);
