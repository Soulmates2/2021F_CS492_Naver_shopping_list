import React, { useState, useRef, useCallback, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { viewPatchProduct, dibsPatchProduct, getDibsofProduct } from '../../lib/api/shopping';
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
interface dibs{
  data: dibProducts;
}

class Products {
  _id: string;
  constructor(id:any){
      this._id = id;
  }
}

export interface info {
  info: ProductInfoProps;
}

const Product = (props: info) => {
  const [dibsList, setDibsList] = useState<Products[]>([]);
  // const [dibsList, setDibsList] = useState<String[]>([]);
  const [isWishAdd, setIsWishAdd] = useState(false);
  // const [isInUserDib, setisInUserDib] = useState(false);
  const { info } = props;
  const viewUpdate = () => {
    viewPatchProduct(info._id);
  };
  const n1 = info.salePrice;
  const cn1 = n1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const firstUpdate = useRef(true);

  useEffect(()=>{
    async function checkProductDib(){
      // if(firstUpdate.current){
        
        const userId = sessionStorage.getItem("id");
        console.log(userId);
        const res = userId !==null ? await getAllDibs(userId) : -1;
        res!==-1 ? setDibsList(res.data): console.log("no user");
        res!==-1 ? console.log(res.data): console.log("no user");
        console.log('dibsList: '+dibsList);
        // console.log(res.data);
        // if(dibsList.find(i => i.data._id === info._id)){
        // // if(dibsList.some(i => i._id.includes(info._id))){
        //   console.log("true: %s", info.name);
        //   setIsWishAdd(true);
        // }
      // }
    }
    checkProductDib();
  },[]);
  

  const wishAddHandler = (e:any) => {
    setIsWishAdd(!isWishAdd);
    //찜 버튼이 눌렸을땐 product page로 넘어가지 않고 view 횟수를 더하지도 않는다.
    e.preventDefault();
    e.stopPropagation();
  }

  
  //product의 isWishAdd가 바뀔 때 즉 버튼이 눌러졌을때 불린다.
  useEffect(()=>{
    async function changeServerOfDibs(){
      if(firstUpdate.current){
        console.log("not yet");
        firstUpdate.current = false;
      } else{
        console.log("update dibs")
        //찜 되었을때 user의 dibs에 찜한 아이템을 추가하고 
        //product의 dibs에도 시간과함께 찜 정보를 추가한다. (Chart를 만들기 위함)
        //또한 product의 dibs정보를 update해 likes:옆에 오는 숫자를 변경한다.
        const userId = sessionStorage.getItem("id");
        if(isWishAdd){
          console.log("addToDib");
          userId !==null ? addUserDibs(userId, info._id) : console.log("no user");
          console.log("added successfully");
          dibsPatchProduct(info._id);
          // const res = await getDibsofProduct(info._id);
          // console.log("new dibs: %d", res.data);
          // info.dibs.total = res.data+1;
        } 
        //찜이 취소될때는 user dib에서 지우기만한다
        else{
          userId !==null ? deleteUserDibs(userId, info._id) : console.log("no user");
        } 
      }
      
    }
    changeServerOfDibs();
  },[isWishAdd]);

  //   useCallback(()=>{
  //   async function checkProductDib(){
  //     const userId = sessionStorage.getItem("id");
  //     const res = userId !==null ? await getAllDibs(userId) : -1;
  //     res!==-1 ? setDibsList(res.data): console.log("no user");

  //     if(dibsList.some(i => i._id.includes(info._id))){
  //     // if(dibsList.includes(info._id)){
  //       // setisInUserDib(true);
  //     }
  //   }
  //   checkProductDib();
  // },[isWishAdd]);


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
             {isWishAdd ? <span className="y">찜하기</span>: <span className="n">찜하기</span>}
             {/* <span>찜하기</span> */}
          </button>
        </div>
        </Link>
      </div>
  );
};

export default Product;