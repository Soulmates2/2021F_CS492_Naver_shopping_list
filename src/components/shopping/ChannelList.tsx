import React, { useEffect } from 'react';
import { getAllChannels } from '../../lib/api/shopping';
import Channel from './Channel';
import { useRecoilState } from 'recoil';
import { channelState } from './states/channel.state';

const ChannelList = () => {
  const [channelList, setChannelList] = useRecoilState(channelState);
  useEffect(() => {
    (async () => {
      const { data } = await getAllChannels();
      setChannelList(data);
    })();
  }, []);

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
