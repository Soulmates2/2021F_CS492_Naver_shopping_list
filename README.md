# Login With Naver-Login API

## Overview
별도의 회원가입/로그인 절차를 진행하지 않고 네이버 아이디로 로그인을 함으로서 쇼핑 서비스를 사용할 수 있도록 함 <br/>
네이버아이디로 로그인(네아로) API를 사용하여 진행  <br/>
__미리 등록한 유저에 대해서만 네이버아이디로 로그인이 가능함 (배포전 서비스에 대한 네이버의 API 정책)__


## Process
1. 네이버 Sdk에 정의되어 있는 네이버로그인 버튼을 통해 네이버 아이디로 로그인을 initiate
2. loginWithNaverId 함수를 통해 API request하면 네이버의 로그인 창으로 넘어감
3. 로그인이 성공적으로 완료되면 <br/>
  a. User ID, name, email정보를 받아 Session Storage에 저장<br/>
  b. User DB에 해당 User ID를 가진 회원이 없으면 해당 회원에 대한 element create
4. 쇼핑 서비스의 Homepage로 이동 

## Files
client/src/components/pages/LoginPage.tsx -> 로그인 버튼 및 로그인 시작하는 페이지 <br/>
client/src/components/pages/LoginCallback.tsx -> 로그인 callback 처리 (DB에 새로운 user 추가, seesion storage 관리)
