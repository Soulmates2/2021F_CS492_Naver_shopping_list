# 찜 관련 기능

### Server

서버는 크게 user 부분과 product 부분을 다루었다.

User:
찜 버튼이 눌렸을 때 user의 dibsList에 해당 프로덕트를 추가하거나 삭제함
이때 이미 dibsList에 있거나/없지 않은지 확인

Product:
찜 버튼이 눌렸을 때 product의 찜 횟수 upgrade
product의 찜 횟수 추가를 반영하기 위해 product의 찜 횟수만 가져오는 function도 추가함

### Client

Product를 가져올때 가장 첫번쨰로 현재 user의 dibsList를 가져와 해당 product가 현재 유저의 찜 리스트에 있는지 확인한 후 찜 리스트가 있으면 isWishTrue를 true로 없으면 isWishTrue를 false로 세팅했다.

isWishTrue가 false였을 때 버튼을 누르면:
찜 버튼이 핑크색으로 변하고
product의 찜 횟수가 추가되며
이 부분이 바로 반영되어 likes: 옆의 숫자가 변경된다.
user의 dibsList에 해당 프로덕트가 추가되고

isWishTrue가 true일때 버튼을 누르면:
user의 dibsList에서 해당 프로덕트가 삭제된다.

원래는 ProductCard를 누르면 해당 product의 조회수가 올라가는 코드만 있었다.
이 코드를 응용하여 찜 되어있지 않은 물건의 찜 버튼을 눌렀을때는 해당 product의 찜 횟수 역시 올라가게 해주었다.
또한 찜 버튼을 눌렀을때 product의 조회수는 올라가지 않도록 찜 버튼과 프로덕트 카드의 클릭이벤트를 구분해주었다.
