import React from 'react'
import './Login.css'
import background from '../../assets/images/background.jpg'
import logo from '../../assets/images/logo.png'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from '../../Firebase/firebase';
import firebase from '../../Firebase/firebase'

const Login = () => {
  return (
    <div className='login' style={{backgroundImage: `url(${background})`}}>
        <div className='login-form'>
            <img src = {logo} className = "login-logo"/>
            <strong className="login-heading">Đăng nhập</strong>
            <p className="login-text">Hãy đăng nhập vào trang web để có những trải nghiệm tốt nhất.
            Chúc các bạn có những giờ phút xem phim vui vẻ!</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>   
            
        </div>
    </div>
  )
}

export default Login