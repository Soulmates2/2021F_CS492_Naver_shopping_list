import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}
const { naver } = window;

function NaverIdLogin() {
  const [token, setToken] = useState("");

  const Login = () => {
    NaverLogin();
  };
  useEffect(Login, []);

  function NaverLogin() {
    console.log("NAVER-LOGIN()");
    const naverLogin = new naver.LoginWithNaverId({
      //SETTING FOR REQUEST LOGIN
      clientId: "ngA3r6hcze4XQpin7Qrr",
      callbackUrl: "http://localhost:3000/",
      callbackHandle: true,
      loginButton: {
        color: "green",
        type: 3,
        height: 60,
      },
    });
    naverLogin.init();
    getUserProfile();

    // GET ID/NAME/EMAIL IF LOGIN SUCCESS
    function getUserProfile() {
      function getTokenByURL() {
        const location = window.location.href.split("=")[1];
        const tokenChk = location.split("&")[0];
        setToken(tokenChk);
      }
      function getTokenByLocalStorage() {
        const tokenChk = localStorage.getItem("com.naver.nid.access_token");
        if (tokenChk) setToken(tokenChk.split("bearer.")[1]);
      }

      // IF LOGGED-IN, GET NAME&EMAIL
      naverLogin.getLoginStatus((status: any) => {
        if (status) {
          const { id, name, email } = naverLogin.user; // PROFILE
          if (name === undefined || email === undefined) {
            alert(
              "이름, 이메일 정보는 필수 동의입니다. 정보제공을 동의해주세요"
            );
            naverLogin.reprompt();
          } else {
            if (window.location.href.includes("access_token")) getTokenByURL();
            else getTokenByLocalStorage();
            console.log("NAVER LOGIN SUCCESS", naverLogin.user);
          }
        } else {
          console.log("NOT LOGGED IN YET");
        }
      });
    }
  }

  return (
    <div>
      <h1> LOGIN PAGE </h1>
      <div id="naverIdLogin" onClick={Login}>
        네이버 로그인
      </div>
    </div>
  );
}
export default NaverIdLogin;
