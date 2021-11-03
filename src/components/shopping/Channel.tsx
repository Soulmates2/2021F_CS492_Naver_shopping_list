import React from 'react';
import { Link } from 'react-router-dom';

interface ChannelProp {
  id: string;
  content: string;
}

//채널의 id와 content를 받아서 표시합니다.
const Channel = (props: ChannelProp) => {
  return (
    <div id={props.id}>
      <Link className="channel" to={props.id}>
        {props.content}
      </Link>
    </div>
  );
};

export default Channel;
