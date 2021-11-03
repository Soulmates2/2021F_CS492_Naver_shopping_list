import React, { useEffect } from "react";
declare global {
  interface Window {
    naver: any;
  }
}
const { naver } = window;

function NaverIdLogin() {
  const Login = () => {
    NaverLogin();
  };
  useEffect(Login, []);

  function NaverLogin() {
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
    }); // REQUEST
    naverLogin.init();
    getUserProfile();

    function getUserProfile() {
      // IF LOGGED-IN, GET EMAIL&ID
      naverLogin.getLoginStatus((status: any) => {
        if (status) {
          const { id, name, email } = naverLogin.user;
          if (name == undefined || email == undefined) {
            alert(
              "이름, 이메일 정보는 필수 동의입니다. 정보제공을 동의해주세요"
            );
            naverLogin.reprompt();
          } else {
            // LOGIN SUCCESS
            const location = window.location.href.split("=")[1];
            const token = location.split("&")[0];
            console.log("NAVER LOGIN SUCCESS", naverLogin.user);
            console.log("TOKEN", token);
          }
        } else {
          console.log("NOT LOGIN YET");
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
