# Infinite Scroll

### Server

product에 findByPage function을 만들어 page를 파라미터로 받는다.
(현재 page -1 ) \* 8 만큼은 이미 불러온 product이기에 skip하고 limit을 8로 두어 8개의 product만 불러오게 한다.

### Client

가장 처음 channel을 누르면 해당 channel에 해당하는 product 8개가 한 줄에 4개씩 뜸
Intersection Observer를 통해 8개의 product의 끝에 닿으면 Loading을 시작
8개의 product가 불려진다.
더이상 불러올 product가 없을시 "End of List" 메세지가 뜬다.
