import React, { useState, useRef, useCallback, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { viewPatchProduct, dibsPatchProduct } from '../../lib/api/shopping';
import { addUserDibs, deleteUserDibs, getAllDibs } from '../../lib/api/member';
import './Product.css';


//product info의 내용과 타입들입니다.
//이 내용들로 상품카드를 만들면 됩니다.
export interface ProductInfoProps {
  channel: object;
  menus: Array<string>;
  modDate: Date;
  name: string;
  productImages: Array<imageInfo>;
  salePrice: number;
  soldout: boolean;
  _id: string;
  view: viewDibsType;
  dibs: viewDibsType;
}

interface imageInfo {
  imageType: string;
  order: number;
  url: string;
  width: number;
  height: number;
}

interface viewDibsType {
  total: number;
}

interface dibProducts{
  _id: string;
}

export interface info {
  info: ProductInfoProps;
}

const Product = (props: info) => {
  // const [dibsList, setDibsList] = useState<dibProducts[]>([]);
  const [dibsList, setDibsList] = useState<String[]>([]);
  const [isWishAdd, setIsWishAdd] = useState(false);
  const [isInUserDib, setisInUserDib] = useState(false);
  const { info } = props;
  const viewUpdate = () => {
    viewPatchProduct(info._id);
  };
  const n1 = info.salePrice;
  const cn1 = n1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  const wishAddHandler = (e:any) => {
    setIsWishAdd(!isWishAdd);
    e.preventDefault();
  }

  //product의 isWishAdd가 바뀔 때 즉 버튼이 눌러졌을때 불린다.
  useEffect(()=>{
    async function changeServerOfDibs(){
      //찜 되었을때 user의 dibs에 찜한 아이템을 추가하고 
      //product의 dibs에도 시간과함께 찜 정보를 추가한다. (Chart를 만들기 위함)
      const userId = sessionStorage.getItem("id");
      console.log("userId: " + userId);
      if(isWishAdd){
        console.log("addToDib");
        userId !==null ? addUserDibs(userId, info._id) : console.log("no user");
        dibsPatchProduct(info._id);
      } 
      //찜이 취소될때는 user dib에서 지우기만한다
      else{
        userId !==null ? deleteUserDibs(userId, info._id) : console.log("no user");
      } 
    }
    changeServerOfDibs();
  },[isWishAdd]);

  useCallback(()=>{
    async function checkProductDib(){
      const userId = sessionStorage.getItem("id");
      const res = userId !==null ? await getAllDibs(userId) : -1;
      res!==-1 ? setDibsList(res.data): console.log("no user");
      if(dibsList.includes(info._id)){
        setisInUserDib(true);
      }
    }
    checkProductDib();
  },[isWishAdd]);

  return (
    
      <div className="product" >
        <Link to={{ pathname: `/products/${info._id}`, state: info }}>
        <div className="item_card" onClick={viewUpdate}>
          <div className="pic">
            <img src={info.productImages[0].url} className="img" alt="img of product"  />
          </div>
          <p className="i_price">{cn1}원</p>
          <p className="i_name">{info.name}</p>
          <span className="i_view">Views: {info.view.total}  | </span>
          <span className="i_like">Likes: {info.dibs.total}  </span>
          <button className="button_like" onClick={wishAddHandler}>
             {/* {isInUserDib ? <span className="y">찜하기</span>: <span className="n">찜하기</span>} */}
             <span>찜하기</span>
          </button>
        </div>
        </Link>
      </div>
  );
};

export default Product;