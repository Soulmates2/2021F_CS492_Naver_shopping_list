import React, { useState, useEffect } from 'react';
import { getAllChannels } from '../../lib/api/shopping';

const ChannelList = () => {
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await getAllChannels();
      setChannelList(data);
    })();
  }, []);

  console.log(channelList);
  return (
    <div className="channelList">
      <ul>
        {channelList.map((channel) => {
          return <li key={channel['id']}>{channel['name']}</li>;
        })}
      </ul>
    </div>
  );
};

export default ChannelList;
