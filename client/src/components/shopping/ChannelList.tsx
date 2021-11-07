import React, { useEffect } from 'react';
import { getAllChannels } from '../../lib/api/shopping';
import Channel from './Channel';
import { useRecoilState } from 'recoil';
import { channelState } from './states/channel.state';

const ChannelList = () => {
  const [channelList, setChannelList] = useRecoilState(channelState);

  //API를 불러와 channelList에 DB channel collection을 세팅합니다.
  useEffect(() => {
    (async () => {
      const { data } = await getAllChannels();
      setChannelList(data);
    })();
  }, [setChannelList]);

  //채널리스트들로 채널컴포넌트들의 리스트를 만듭니다.
  return (
    <div className="channelList">
      <ul>
        {channelList.map((channel) => {
          return (
            <li key={channel['_id']}>
              <Channel id={channel['_id']} content={channel['name']} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChannelList;
