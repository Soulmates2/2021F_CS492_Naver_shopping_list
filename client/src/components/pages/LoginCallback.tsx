// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { loginOrSignup, getAllDibs } from '../../lib/api/member'

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
        if (!name || !email) {
          alert('이름, 이메일 정보는 필수 동의입니다. 정보제공을 동의해주세요');
          naverLogin.reprompt();
        } else {
          // LOGIN SUCCESS
          sessionStorage.setItem('id', id);
          sessionStorage.setItem('name', name);
          sessionStorage.setItem('email', email);

          const login = (async () => {
            loginOrSignup(id);
          });
          login();
        }
      }
    });
  }

  return (
    // REDIRECT TO LOGINPAGE
    <div>
      {/* <Redirect to={{ pathname: `/home` }} /> */}
      <div id="naverIdLogin" onClick={NaverIdLoginCallback}>
        네이버 로그인
      </div>
    </div>
  );
}
export default NaverIdLoginCallback;

// function SideNav () {
//   // const { naver } = window;
//   const naver = (window as Window)['naver'];
  
//   const Login = () => {
//    Naver();
//    UserProfile();
//   }
  
//   useEffect(Login, []);
  
//   const Naver = () => {
//     const naverLogin = new naver.LoginWithNaverId({
//     //  clientId: 발급받은 clientId,
//     //  callbackUrl: "http://localhost:3000/",
//     //  isPopup: false,
//     //  loginButton: {color: "green", type: 1, height: 30} ,
//     //  callbackHandle: true
//     clientId: 'ngA3r6hcze4XQpin7Qrr',
//     callbackUrl: 'http://localhost:3000/loginSuccess/',
//     callbackHandle: true,
//     loginButton: {
//       color: 'green',
//       type: 3,
//       height: 60,
//     },
//     });
//     naverLogin.init();
//   }
 
//    const UserProfile = () => {
//      window.location.href.includes('access_token') && GetUser();
//      function GetUser() {
//        const location = window.location.href.split('=')[1];
//        const token = location.split('&')[0];
//        console.log("token: ", token);
//        fetch(`${API}/account/sign-in` , {
//          method: "GET",
//          headers : {
//            "Content-type" : "application/json",
//            "Authorization": token
//          },
//        })
//        .then(res => res.json())
//        .then(res => {
//          localStorage.setItem("access_token", res.token);
//          setUserData({
//            nickname : res.nickname,
//            image : res.image
//          })
//        })
//        .catch(err => console.log("err : ", err));
//      }
//    };
   
//    return (
//      <SideLogin className="login">
//        <UserInfo>
//          <SideText>로그인</SideText>  
//        </UserInfo>
//        <LoginLink onClick={Login} id="naverIdLogin" /> 
//      </SideLogin>
//    )
//  };
