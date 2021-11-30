import React, { useState, useRef, useCallback, useEffect } from 'react';
import { getProducts } from '../../lib/api/shopping';
import Product, {ProductInfoProps} from './Product';
import './ProductList.css';
import { addUserDibs, deleteUserDibs, getAllDibs } from '../../lib/api/member';


interface ProductProps {
  channelID: string;
}

interface dibProducts{
  _id: string;
}

const ProductList = (props: ProductProps) => {
  const [page, setPage] = useState<number>(0);
  const [ProductList, setProductList] = useState<ProductInfoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, sethasMore] = useState<boolean>(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const [dibsList, setDibsList] = useState<dibProducts[]>([]);


//getProductList
//if there is more product to get set hasMore to true
  // const sendQuery = useCallback(async()=>{
  //   setLoading(true);
  //   const res = await getProducts(props.channelID, page);
  //   setProductList((prev) => [...prev, ...res.data]);
  //   if(res.data.length > 0){
  //       sethasMore(true);
  //   } else{
  //       sethasMore(false);
  //   }
  //   setLoading(false);
  // },[props.channelID, page]);

  //channel이 바뀔때 productlist와 page를 initialize함
  // useEffect(()=>{
  //     setProductList([]);
  //     setPage(0);
  // }, [props.channelID]);

  //channel이 바뀌면 위에서 initialize한 후 productlist를 불러옴
  //page가 바뀌면 initialize하지 않고 sendquery를 불러옴
  // useEffect(()=>{
  //     sendQuery();
  // }, [props.channelID, page]);


  useEffect(()=>{
    async function sendQuery(){
      console.log("first");
      setLoading(true);
      setPage(0);
      setProductList([]);
      // sethasMore(true);
      const res = await getProducts(props.channelID, 1);
      setProductList(res.data);
      if(res.data.length < 8){
        console.log("no more");
        sethasMore(false);
        // sethasMore(true);
      } else{
        console.log("get more");
        sethasMore(true);
      }
      setLoading(false);
    }
    sendQuery();
  }, [props.channelID]);

  useEffect(()=>{
    async function sendQuery2(){
      if(hasMore  && page>1){
        console.log("second page: %d", page);
        setLoading(true);
        const res = await getProducts(props.channelID, page);
        setProductList((prev) => [...prev, ...res.data]);
        if(res.data.length < 8){
          console.log("bye");
          sethasMore(false);
        } else{
          console.log("hi");
          sethasMore(true);
        }
        setLoading(false);
      }
    }
    sendQuery2();
  },[page]);


  //loader와 intersect하면 page를 increase함
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
        // console.log("page: %d", page);
        setPage((prev) => prev + 1);
    }
  }, []);


  useEffect(()=>{
    const option ={
      root: null,
      rootMargin: "10px",
      threshold: 1
    };
    // if(hasMore){
      const observer = new IntersectionObserver(handleObserver, option);
      if(loader.current) observer.observe(loader.current);
    // }
  }, [handleObserver]);


  //프로덕트리스트로 프로덕트 컴포넌트의 리스트를 만듭니다.
  return (
    <div className="productList">
      <h1>Product List</h1>
        <div className="products">
          {ProductList.map((product) => {
            return (
              <Product info={product} key={product['_id']}/>
            );
          })}
        </div>
        <div className="atEnd">
          <div ref={loader} />
            {loading && <p>Loading...</p>}
            {!hasMore && <h4>End of List</h4>}
        </div>
    </div>
  );
};

export default ProductList;
