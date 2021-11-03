import React from 'react';
import { Link } from 'react-router-dom';

interface ChannelProp {
  id: string;
  content: string;
}

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
