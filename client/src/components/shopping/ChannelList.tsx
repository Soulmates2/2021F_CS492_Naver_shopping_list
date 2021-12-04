import React, { useState, useEffect } from 'react';
import { getAllChannels } from '../../lib/api/shopping';
import Channel from './Channel';
import { Tabs } from 'antd';
import { Link, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

interface ChannelType {
  _id: string;
  name: string;
}
const ChannelList = () => {
  const { channelID } = useParams<{ channelID: string }>();
  const [channelList, setChannelList] = useState<ChannelType[]>([]);
  //API를 불러와 channelList에 DB channel collection을 세팅합니다.

  useEffect(() => {
    (async () => {
      const { data } = await getAllChannels();
      setChannelList(data);
    })();
  }, [setChannelList]);

  //채널리스트들로 채널컴포넌트들의 리스트를 만듭니다.
  //antdesign으로 channel들의 tab 메뉴를 만들었습니다.
  return (
    <div className="channelList">
      <Tabs
        activeKey={channelID}
        tabPosition={'top'}
        style={{ height: 80, marginLeft: 20 }}
      >
        <TabPane
          key="home"
          tab={
            <Link className="channel " to={'/'}>
              홈
            </Link>
          }
        />
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
