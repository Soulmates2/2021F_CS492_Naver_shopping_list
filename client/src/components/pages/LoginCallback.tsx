// import React, { useEffect, useState } from 'react';
import { useEffect } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';

interface Window {
  [key: string]: any; // Add index signature
}
const naver = (window as Window)['naver'];

function NaverIdLoginCallback() {
  useEffect(naverLoginCallback, []);

  function naverLoginCallback() {
    const naverLogin = new naver.LoginWithNaverId({
      //SETTING FOR REQUEST LOGIN
      clientId: 'ngA3r6hcze4XQpin7Qrr',
      callbackUrl: 'http://localhost:3000/loginSuccess/',
      callbackHandle: true,
      loginButton: {
        color: 'green',
        type: 3,
        height: 60,
      },
    });
    naverLogin.init();

    // GET ID/NAME/EMAIL IF LOGIN SUCCESS
    naverLogin.getLoginStatus((status: any) => {
      if (status) {
        const { id, name, email } = naverLogin.user; // PROFILE
        if (name === undefined || email === undefined) {
          alert('이름, 이메일 정보는 필수 동의입니다. 정보제공을 동의해주세요');
          naverLogin.reprompt();
        } else {
          // LOGIN SUCCESS
          sessionStorage.setItem('name', name);
          sessionStorage.setItem('email', email);
        }
      }
    });
  }

  if (sessionStorage.getItem('name') !== undefined) {
    // REDIRECT TO HOMEPAGE
    return (
      <div>
        <Redirect to={{ pathname: `/home` }} />
        <div id="naverIdLogin" onClick={NaverIdLoginCallback}>
          네이버 로그인
        </div>
      </div>
    );
  }

  return (
    // REDIRECT TO LOGINPAGE
    <div>
      <Redirect to={{ pathname: `/` }} />
      <div id="naverIdLogin" onClick={NaverIdLoginCallback}>
        네이버 로그인
      </div>
    </div>
  );
}
export default NaverIdLoginCallback;
