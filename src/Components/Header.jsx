import React from 'react';
import styles from '../Styles/header.module.css';
import logo from '../assets/firebase_logo.png'

const Header = () => {
  return (
    <div className={styles.headerContainer}>
        <img src={logo} alt='firebase_logo' />
        <span className={styles.heading}>Firebase Contact App</span>
    </div>
  )
}

export default Header