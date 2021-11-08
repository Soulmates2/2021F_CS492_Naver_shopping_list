// import React, { useEffect, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Window {
  [key: string]: any; // Add index signature
}
const naver = (window as Window)['naver'];

function NaverIdLoginCallback() {
  useEffect(naverLoginCallback, []);

  function naverLoginCallback() {
    console.log('ENTER CALLBACK');

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
    console.log('SESSION EXIST');
    // REDIRECT TO ./HOMEPAGE
  }

  return (
    <div>
      <div id="naverIdLogin" onClick={NaverIdLoginCallback}>
        네이버 로그인
      </div>
      {/* REDIRECT TO ./ */}
    </div>
  );
}
export default NaverIdLoginCallback;
