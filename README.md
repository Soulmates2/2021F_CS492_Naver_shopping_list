# Product Card

### Server

channel이 바뀌면 해당 channelId에 해당하는 product들을 return한다.

### Client

ProductList.tsx, .css와 Product.tsx, .css 네 개의 파일을 사용.
css파일들로 전체적인 productcard와 list 부분들의 디자인을 변경하였다.
ProductList.tsx파일에서 channel이 바뀔때마다 channelID에 해당하는 product들을 서버에서 불러와 Product.tsx로 넘겨주었다.
이렇게 받은 데이터를 사용해 Product.tsx에서 Product Card를 만들어주었다. 

Link를 사용해 ProductCard를 누르면 해당 productId를 가진 페이지로 이동하게 만들었다. 

