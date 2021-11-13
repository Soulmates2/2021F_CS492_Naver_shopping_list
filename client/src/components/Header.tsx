import React from 'react';
import ChannelList from './shopping/ChannelList';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';

const Header = () => {
  return (
    <header>
      <div className="header-title">
        <Link to={'/'} style={{ color: 'white' }}>
          NAVER SHOPPING
        </Link>
      </div>
      <ChannelList />
    </header>
  );
};

export default Header;
