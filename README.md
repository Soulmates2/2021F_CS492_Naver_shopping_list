# 2021 CS492 FE Naver Shopping List

### 스펙

backend : nest.js/typescript  
frontend : React/typescript/네이버 로그인 API  
API:axios를 통한 연동/restful API
UI Library : Antd
Chart Library : billboard.js  
DB:MongoDB

### 서버실행방법

```bash
$ cd server
$ npm install
$ npm run start
```

### 클라이언트 실행방법

```bash
$ npm install
$ yarn start
```

Server의 product를 다루는 코드와 Client의 productlist.tsx 코드를 수정하여 한번에 8개씩 product를 받아오는 infiniteScroll을 구현하였다.
