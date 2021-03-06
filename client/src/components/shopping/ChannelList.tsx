import React, { useState, useEffect } from 'react';
import { getAllChannels } from '../../lib/api/shopping';
import { Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import 'antd/dist/antd.css';

interface ChannelType {
  _id: string;
  name: string;
}

const ChannelList = () => {
  const { TabPane } = Tabs;
  const state = useLocation<{ channelID: string }>().state;
  const channelID = state ? state.channelID : '/home';
  const [channelList, setChannelList] = useState<ChannelType[]>([]);
  const history = useHistory();

  //API를 불러와 channelList에 DB channel collection을 세팅합니다.
  useEffect(() => {
    (async () => {
      const { data } = await getAllChannels();
      setChannelList(data);
    })();
  }, [setChannelList]);

  const handleClick = (e: string) => {
    if (e === '/home') {
      history.push(e, { channelID: e });
    } else {
      history.push('/channels/' + e, { channelID: e });
    }
  };

  //채널리스트들로 채널컴포넌트들의 리스트를 만듭니다.
  //antdesign으로 channel들의 tab 메뉴를 만들었습니다.
  return (
    <div className="channelList">
      <Tabs
        activeKey={channelID}
        tabPosition={'top'}
        style={{
          marginLeft: 20,
        }}
        onTabClick={(e) => {
          handleClick(e);
        }}
      >
        <TabPane
          key="/home"
          tab={
            <div
              style={{ width: '40px', textAlign: 'center' }}
              className="channel"
            >
              홈
            </div>
          }
        />
        {channelList.map((channel) => {
          return (
            <TabPane
              tab={<div className="channel">{channel.name}</div>}
              key={channel._id}
            />
          );
        })}
      </Tabs>
    </div>
  );
};

export default ChannelList;
