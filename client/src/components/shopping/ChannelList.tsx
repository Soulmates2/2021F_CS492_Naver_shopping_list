import React, { useState, useEffect, useMemo } from 'react';
import { getAllChannels } from '../../lib/api/shopping';
import Channel from './Channel';
import { Tabs, Radio } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

interface ChannelType {
  _id: string;
  name: string;
}
const ChannelList = () => {
  const cID = useLocation().pathname.split('/channels/')[1];
  const [channelList, setChannelList] = useState<ChannelType[]>([]);
  //API를 불러와 channelList에 DB channel collection을 세팅합니다.
  useMemo(async () => {
    const { data } = await getAllChannels();
    setChannelList(data);
  }, [setChannelList]);

  //채널리스트들로 채널컴포넌트들의 리스트를 만듭니다.
  return (
    <div className="channelList">
      <Tabs activeKey={cID} tabPosition={'top'} style={{ height: 80 }}>
        {channelList.map((channel) => {
          return (
            <TabPane
              tab={<Channel id={channel._id} content={channel.name} />}
              key={channel._id}
            />
          );
        })}
      </Tabs>
    </div>
  );
};

export default ChannelList;
