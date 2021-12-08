# 차트 페이지
- billboard.js 라이브러리를 이용하여 시간별 조회수 및 찜 횟수를 확인할 수 있도록 했다. 
- radiobutton을 클릭하면 차트가 설정한 값에 따라 바뀌는 모습을 볼 수 있다. 
- 마우스 휠 스크롤을 통해 특정 영역을 zoom in/out 할 수 있다. 
- 차트 아래의 label을 클릭하면 해당 label의 차트만 볼 수 있다.
- 찜 횟수가 0일 경우 조회수의 x축을 함께 사용하며, 값은 모두 0으로 표현된다.

### 데이터 설명
product 객체 안에 조회수를 나타내는 객체 view와 찜 횟수를 나타내는 객체 dibs가 존재한다. 

view와 dibs 다음과 같은 형식을 가진다.

    view: {total: 1, "2021-12-07 11:14": 1}
    dibs: {total: 1, "2021-12-07 11:14": 1}

### 차트 설명
데이터를 차트에 나타내기 위해서는 다음과 같은 데이터(columns) format이 필요하다.

    ["x1", "2021-12-07 11:14"]
    ["x2", "2021-12-07 11:14"]
    ["조회수", 3]
    ["찜 횟수", 3]

x1은 조회수에 대한 x축 정의역들을 구성하고 조회수 값은 순서대로 x1에 대응한다. 

x2는 찜 횟수에 대한 x축 정의역들을 구성하고 찜 횟수 값은 순서대로 x2에 대응한다. 

또한, Date format을 데이터 값에 맞게 알맞게 설정해주어야한다. (ex. "%Y-%m-%d %H:%M")

데이터를 format에 맞게 변경해주기 위해 다양한 함수를 구현하였다.
