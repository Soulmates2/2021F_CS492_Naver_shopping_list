import React, { useState, useEffect } from 'react';
import { getProducts } from '../../lib/api/shopping';
import { useRecoilState } from 'recoil';
import { channelState } from './states/channel.state';
import Product from './Product';

interface ProductProps {
  channelID: string;
}
const ProductList = (props: ProductProps) => {
  const [ProductList, setProductList] = useState([]);
  const [channelList] = useRecoilState(channelState);

  const channel = channelList.find((data) => {
    if (data._id === props.channelID) {
      return true;
    }
    return false;
  }) || { _id: '0', name: '0' };

  useEffect(() => {
    (async () => {
      const { data } = await getProducts(channel['_id'], channel['name']);
      setProductList(data);
    })();
  }, [props]);

  return (
    <div className="productList">
      <h1>Product List</h1>
      <ul>
        {ProductList.map((product) => {
          return (
            <li key={product['_id']}>
              <Product info={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
