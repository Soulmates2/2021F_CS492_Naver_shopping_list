import React, { useState, useRef, useCallback, useEffect }  from 'react';
import { Link } from 'react-router-dom';
// import useState from 'react-usestateref'
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
  // dibsList: Products[];
}

const Product = (props: info) => {
  const info = props.info;
  const [dibsList, setDibsList] = useState<String[]>([]);
  const [isWishAdd, setIsWishAdd] = useState(false);
  const [NumDibs, setNumDibs] = useState(info.dibs.total);
  
  // const dibsList = props.dibsList;
  const viewUpdate = () => {
    viewPatchProduct(info._id);
  };
  const n1 = info.salePrice;
  const cn1 = n1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const firstUpdate = useRef(true);

  // const dibsList = useRef<dibProducts[]>([]);
  useEffect(()=>{
    async function CheckProductDib(){
      console.log("CheckProductDib called");
      // if(firstUpdate.current){
        
        const userId = sessionStorage.getItem("id");
        console.log(userId);
        const res = userId !==null ? await getAllDibs(userId) : -1;
        const result:dibProducts[] = res!==-1 ? res.data: [];
        // setDibsList(result);
        // const [dibsList, setDibsList] = useState<dibProducts[]>(result);
        // console.log(dibsRef.current);
        // const dibsList = 
        // console.log(dibsList);
        // res!==-1 ? setDibsList(res.data) : console.log("no user");
        // console.log(dibsList.current);
        // console.log(result);

        if(result.find(i => i._id === info._id)){
        // if(dibsList.some(i => i._id.includes(info._id))){
          console.log("true: %s", info.name);
          setIsWishAdd(true);
        }
        
      // }
    }
    CheckProductDib();
    // console.log(dibsList);
    // if(dibsList.find(i => i._id === info._id)){
    //     // if(dibsList.some(i => i._id.includes(info._id))){
    //       console.log("true: %s", info.name);
    //       setIsWishAdd(true);
    //     }
  },[dibsList]);
  // console.log(dibsList);

  
  // useEffect(()=>{
  //   console.log(dibsList);
  //   if(dibsList.find(i => i._id === info._id)){
  //   // if(dibsList.some(i => i._id.includes(info._id))){
  //     console.log("true: %s", info.name);
  //     setIsWishAdd(true);
  //   }
  // },[]);
  
  

  const wishAddHandler = (e:any) => {
    setIsWishAdd(!isWishAdd);
    console.log(isWishAdd + " of product "+info.name);
    //찜 버튼이 눌렸을땐 product page로 넘어가지 않고 view 횟수를 더하지도 않는다.
    e.preventDefault();
    e.stopPropagation();
  }

  
  //product의 isWishAdd가 바뀔 때 즉 버튼이 눌러졌을때 불린다.
  useEffect(()=>{
    async function changeServerOfDibs(){
      if(firstUpdate.current){
        // console.log("not yet");
        // console.log(dibsList);
        firstUpdate.current = false;
      } else{
        // console.log("update dibs")
        //찜 되었을때 user의 dibs에 찜한 아이템을 추가하고 
        //product의 dibs에도 시간과함께 찜 정보를 추가한다. (Chart를 만들기 위함)
        //또한 product의 dibs정보를 update해 likes:옆에 오는 숫자를 변경한다.
        const userId = sessionStorage.getItem("id");
        if(isWishAdd){
          console.log("addToDib");
          userId !==null ? addUserDibs(userId, info._id) : console.log("no user");
          console.log("added successfully");
          dibsPatchProduct(info._id);
          const res = await getDibsofProduct(info._id);
          setNumDibs(res.data+1);
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
          {/* dibs를 state로 설정해놓기 */}
          <span className="i_like">Likes: {NumDibs}  </span>
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