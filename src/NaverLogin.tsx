import React, { useEffect, useState } from "react";
declare global {
  interface Window {
    naver: any;
  }
}
const { naver } = window;

function NaverIdLogin() {
  const Login = () => {
    Naver();
    GetProfile();
  };
  useEffect(Login, []);

  function Naver() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "ngA3r6hcze4XQpin7Qrr",
      callbackUrl: "http://localhost:3000/home",
      callbackHandle: true,
      loginButton: {
        color: "green",
        type: 3,
        height: 60,
      },
    });

    naverLogin.init();
    console.log("REQUEST NAVER LOGIN");
  }

  function GetProfile() {
    window.location.href.includes("access_token") && getUser();

    function getUser() {
      const location = window.location.href.split("=")[1];
      const token = location.split("&")[0];
      const header = {
        Authorizatin: token,
      };

      //   fetch();
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
