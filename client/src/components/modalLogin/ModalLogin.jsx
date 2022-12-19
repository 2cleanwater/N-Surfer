import React from 'react'
import styles from './ModalLogin.module.css';
import { googleLogin, githubLogin,naverLogin } from '../../api/firebase';

function ModalLogin({setModalOpen}) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <section className={styles.modal}>
        <button className={styles.close} onClick={closeModal}>X</button>
        <div className={styles.loginSection}>
          <button className={`${styles.google} ${styles.loginButtons}`} onClick={()=>{closeModal(); googleLogin(); }}>Google</button>
          <button className={`${styles.github} ${styles.loginButtons}`} onClick={()=>{closeModal(); githubLogin(); }}>Github</button>
          <button className={`${styles.naver} ${styles.loginButtons}`} onClick={()=>{closeModal(); naverLogin(); }}>Naver</button>
        </div>    
      </section>
    </div>
    
  );
}

export default ModalLogin