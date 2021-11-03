import React, { useState, useEffect } from 'react';
import { getProducts } from '../../lib/api/shopping';
import { useRecoilState } from 'recoil';
import { channelState } from './states/channel.state';

interface ProductProps {
  channelID: string;
}
const ProductList = (props: ProductProps) => {
  const [ProductList, setProductList] = useState([]);
  const [channelList, setChannelList] = useRecoilState(channelState);

  const channel = channelList.find((data) => {
    if (data._id === props.channelID) {
      return true;
    }
  }) || { _id: '0', name: '0' };

  useEffect(() => {
    (async () => {
      const { data } = await getProducts(channel['_id'], channel['name']);
      console.log(data);
      setProductList(data);
    })();
  }, [props]);

  return <div>{props.channelID}프로덕트 리스트</div>;
};

export default ProductList;
