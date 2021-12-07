# Shopping Page Structure/Backend Setting/DB

## Shopping Page Structure
- CRA with typescript를 통한 boiler plate로 시작.
- React-router-dom library를 통해 SPA 구현.
- header에 위치한 채널리스트를 통해 채널 변경 가능.
- 채널리스트 -> 소속한 전체 프로덕트 -> menu tab에 따라 product filtering의 사용 구조
- 메뉴탭을 눌렀을 때, 하위메뉴가 존재할시, 하위 메뉴를 render (최대 3단계 까지 존재, 존재하지 않을시 render하지 않음.)
- channel/channelID/category?query1&query2&query3 와 같이 위의 구조애 따라 url 변화

- product 클릭시 해당 product의 chart page로 이동하며 product의 찜,조회수 정보를 포함한 데이터 전송.
- channel list의 홈 혹은 헤더의 로고를 누르면 /home으로 이동.
- 잘못된 url을 입력하면 잘못된 접근입니다를 render
- Antd library, css 를 통해 Header, menu tab design
- 현재 보고 있는 채널, 선택한 menu들에게 색 변경, underline, bold 등의 변화을 주어 사용자 친화적인 UI 디자인


## API
- axios를 통한 rest API연동

Get
- 처음 로딩될 때 header에서 channel list를 받아옴.
- 채널이 변동 될 때 마다 channel id를 통해 전체 product list를 받아옴.
- 메뉴가 변동 될 때 마다 해당 메뉴의 child menu list를 받아옴.
- menu tab이 변동 될 때마다 channel id와 menu id를 통해 필터링 된 product list를 받아옴.
- product list에 있는 id로 각 product의 정보를 받아와서 product card에 전송.

Patch
- 프로덕트를 클릭하면, 해당 시간을 기록해서 해당 product에 전송.

## Backend
- nest.js library를 사용한 typescript기반 nodejs 서버
- module - controller - service 의 구조를 가짐
- module은 해당 기능을 사용하는데 필요한 의존성 주입, 연동과 응집역할
- controller 는 request가 왔을 때 request url과 method에 따라 service 매칭
- service는 business logic을 담고있는 코드

- channel,product의 get method는 find를 이용해 조건을 입력하여 해당 조건에 맞는 product의 list를 return함.
- menu의 get method는 channelmenu -> menu의 두단계를 거쳐서 menu의 list를 return 한다.
- menu를 눌러 해당 menuid를 가진 get method가 들어오면, 하위 메뉴의 list를 return 한다.
- product의 patch mehtod는 view를 읽고, total+1과 현재 시간이 존재하면 현재시간에 +1, 아니면 새로운 시간을 생성 후 +1을 하는 구조이다.

## DB
- mongoose를 통한 nestjs server와의 연동.
- product의 view,dibs 구조 설계 및 9만개 가량의 전체 product 데이터에 삽입
- 무의미한 channel 삭제



