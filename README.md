# 2021 CS492 FE Naver Shopping List

### 스펙

backend : nest.js/typescript  
frontend : React/typescript/네이버 로그인 API  
API:axios를 통한 연동/restful API. 
UI Library : Antd. 
Chart Library : billboard.js    
DB:MongoDB

### Setting

```bash
$ gh repo clone Soulmates2/2021F_CS492_Naver_shopping_list
$ cd 2021F_CS492_Naver_shopping_list
```

## 서버실행방법

```bash
$ cd server
$ npm install
$ npm run start
```

## 클라이언트 실행방법

```bash
$ npm install
$ yarn start
```

### Website에 관하여

이 웹사이트는 channel별 menu별로 product를 구분하여 원하는 상품을 쉽게 찾을 수 있게 도와준다.
네이버 로그인과 찜 기능을 추가하여 일반적인 쇼핑몰처럼 찜한 상품들을 쉽게 볼 수 있도록 도와준다.
상품을 클릭 시 상세페이지가 아닌 찜과 조회수를 chart로 표현한 페이지로 연동하여 상품의 인기도를 쉽게 볼 수 있게 도와준다.
