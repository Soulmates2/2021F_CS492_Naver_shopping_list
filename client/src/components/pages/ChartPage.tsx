import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import OptionList from '../chart/OptionList';
import WrongAccess from './WrongAccess';
import bb, { area, bar, line, zoom } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
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

var chart = bb.generate({
  data: {
    type: line(),
    x: 'x',
    xFormat: '%Y-%m-%d %H:%M',
    columns: [
      // ["x", "2021-11-10", "2021-11-12", "2021-11-13", "2021-11-14", "2021-11-22"],
      [
        'x',
        '2021-11-10 20:25',
        '2021-11-11 18:10',
        '2021-11-11 20:23',
        '2021-11-12 17:11',
        '2021-11-22 12:00',
      ],
      // ["x", "2021-11-10 20:25:00", "2021-11-11 18:10:00", "2021-11-11 20:23:00", "2021-11-12 17:11:00", "2021-11-22 12:00:00"],
      ['조회수', 12, 22, 7, 8, 4],
      ['찜 횟수', 2, 2, 2, 2, 1],
    ],
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        // "format": "%Y-%m-%d",
        format: '%Y-%m-%d %H:%M',
        // "format": "%Y-%m-%d %H:%M:%S",
        // "format": function(x: any) {
        //   return x.getMonth();
        // },
        multiline: true,
      },
    },
  },
  bindto: '#chart',
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

  // "color": {
  //   "pattern": [
  //     "red",
  //     "blue",
  //     "cyan"
  //   ]
  // }
});

const ChartPage = (props: RouteComponentProps<{}, {}, ProductInfoProps>) => {
  const { state } = props.location;
  return (
    <div className="ChartPage">
      {state ? (
        <div>
          <h1>{state.name} 상품의 trend chart</h1>
          <OptionList optionID={'1'}></OptionList>
          <div id="chart">
            <script type="text/javascript">chart.load(...)</script>
          </div>
        </div>
      ) : (
        <WrongAccess />
      )}
    </div>
  );
};

export default ChartPage;
