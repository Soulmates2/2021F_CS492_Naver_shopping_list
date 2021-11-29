import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import OptionList from '../chart/OptionList';
import WrongAccess from './WrongAccess';
import bb, { area, bar, line, zoom } from 'billboard.js';
import 'antd/dist/antd.css';

interface ProductInfoProps {
  channel: object;
  menus: Array<string>;
  modDate: Date;
  name: string;
  productImages: Array<object>;
  salePrice: number;
  soldout: boolean;
  _id: string;
  view: object;
}

const ChartPage = (props: RouteComponentProps<{}, {}, ProductInfoProps>) => {
  const { state } = props.location;
  var chart = bb.generate({
    bindto: '#linechart',
    data: {
      // for ESM import usage, import 'line' module and execute it as
      type: line(),
      // type: "line",
      json: [
        { date: '11/10/2021, 20:25', 조회수: 12, '찜 횟수': 2 },
        { date: '11/11/2021, 20:23', 조회수: 22, '찜 횟수': 2 },
        { date: '11/11/2021, 18:10', 조회수: 7, '찜 횟수': 2 },
        { date: '11/12/2021, 17:11', 조회수: 8, '찜 횟수': 2 },
        { date: '11/22/2021, 12:00', 조회수: 4, '찜 횟수': 2 },
      ],
      keys: {
        // x: "date", // it's possible to specify 'x' when category axis
        value: ['조회수', '찜 횟수'],
      },
    },
    padding: {
      top: 20,
      bottom: 20,
      left: 100,
      right: 100,
    },

    zoom: {
      // for ESM import usage, import 'zoom' module and execute it as
      enabled: zoom(),
      // enabled: true
    },
  });
  return (
    <div className="chartPage">
      {state ? <h1>{state.name} 상품의 trend chart</h1> : <WrongAccess />}
      <OptionList optionID={'1'}></OptionList>
      <div id="chart">
        <script type="text/javascript">chart.load(...)</script>
      </div>
    </div>
  );
};

export default ChartPage;
