import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Product, {ProductInfoProps} from '../shopping/Product';
import OptionList from '../chart/OptionList';
import WrongAccess from './WrongAccess';
import bb, {area, bar, line, zoom} from "billboard.js";
import { Radio } from 'antd';
import "billboard.js/dist/billboard.css";
import 'antd/dist/antd.css';


interface ProductProps {
  channelID: string;
}


function isNumeric(data : string) : boolean {
  return !isNaN(Number(data));
}

function ViewDatatoMonth(data: Object) {
  var month : any = {};
  var monthArray = ["x1"];
  var valueArray = ["조회수"];
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    if (isNumeric(key[0])) {
      const tempYear = key.slice(0, 4);
      const tempMonth = key.slice(5, 7);
      const tempDate = tempYear + "-" + tempMonth;
      
      if (!Object.keys(month).includes(tempDate)) {
        month[tempDate] = data[key];
      }
      else {
        month[tempDate] += data[key];
      }
    }
  }
  for (const key of Object.keys(month) as (keyof typeof data)[]) {
    monthArray.push(key);
    valueArray.push(month[key]);
  }
  return [monthArray, valueArray]
}

function ViewDatatoDay(data: Object) {
  var day : any = {};
  var dayArray = ["x1"];
  var valueArray = ["조회수"];
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    if (isNumeric(key[0])) {
      const tempYear = key.slice(0, 4);
      const tempMonth = key.slice(5, 7);
      const tempDay = key.slice(8,10);
      const tempDate = tempYear + "-" + tempMonth + "-" + tempDay;
      
      if (!Object.keys(day).includes(tempDate)) {
        day[tempDate] = data[key];
      }
      else {
        day[tempDate] += data[key];
      }
    }
  }
  
  for (const key of Object.keys(day) as (keyof typeof data)[]) {
    dayArray.push(key);
    valueArray.push(day[key]);
  }
  return [dayArray, valueArray]
}

function ViewDatatoTime(data: Object) {
  var time : any = {};
  var timeArray = ["x1"];
  var valueArray = ["조회수"];
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    if (isNumeric(key[0])) {
      time[key] = data[key];
    }
  }

  for (const key of Object.keys(time) as (keyof typeof data)[]) {
    timeArray.push(key);
    valueArray.push(time[key]);
  }
  return [timeArray, valueArray]
}

function DibsDatatoMonth(data: Object) {
  var month : any = {};
  var monthArray = ["x2"];
  var valueArray = ["찜 횟수"];
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    if (isNumeric(key[0])) {
      const tempYear = key.slice(0, 4);
      const tempMonth = key.slice(5, 7);
      const tempDate = tempYear + "-" + tempMonth;
      
      if (!Object.keys(month).includes(tempDate)) {
        month[tempDate] = data[key];
      }
      else {
        month[tempDate] += data[key];
      }
    }
  }
  for (const key of Object.keys(month) as (keyof typeof data)[]) {
    monthArray.push(key);
    valueArray.push(month[key]);
  }
  if (monthArray.length == 1) {
    monthArray.push("2021-12");
    valueArray.push("0");
  }
  return [monthArray, valueArray]
}

function DibsDatatoDay(data: Object) {
  var day : any = {};
  var dayArray = ["x2"];
  var valueArray = ["찜 횟수"];
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    if (isNumeric(key[0])) {
      const tempYear = key.slice(0, 4);
      const tempMonth = key.slice(5, 7);
      const tempDay = key.slice(8,10);
      const tempDate = tempYear + "-" + tempMonth + "-" + tempDay;
      
      if (!Object.keys(day).includes(tempDate)) {
        day[tempDate] = data[key];
      }
      else {
        day[tempDate] += data[key];
      }
    }
  }
  
  for (const key of Object.keys(day) as (keyof typeof data)[]) {
    dayArray.push(key);
    valueArray.push(day[key]);
  }
  if (dayArray.length == 1) {
    dayArray.push("2021-12-01");
    valueArray.push("0");
  }
  return [dayArray, valueArray]
}

function DibsDatatoTime(data: Object) {
  var time : any = {};
  var timeArray = ["x2"];
  var valueArray = ["찜 횟수"];
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    if (isNumeric(key[0])) {
      time[key] = data[key];
    }
  }

  for (const key of Object.keys(time) as (keyof typeof data)[]) {
    timeArray.push(key);
    valueArray.push(time[key]);
  }
  if (timeArray.length == 1) {
    timeArray.push("2021-12-01 00:00");
    valueArray.push("0");
  }
  return [timeArray, valueArray]
}

const ChartPage = (props: RouteComponentProps<{}, {}, ProductInfoProps>) => {
  const { state } = props.location;
  const [option, setOption] = useState("1");
  const [format, setFormat] = useState("%Y-%m-%d %H:%M");
  const [x1, setX1] = useState(["x1", "2021-11-10 20:25", "2021-11-11 18:10", "2021-11-11 20:23", "2021-11-12 17:11", "2021-11-22 12:00"]);
  const [x2, setX2] = useState(["x2", "2021-11-11 18:10", "2021-11-11 20:23", "2021-11-12 17:11", "2021-11-22 12:00"]);
  const [viewData, setViewData] = useState(["조회수", 12, 22 ,7, 8, 4]);
  const [dibsData, setDibsData] = useState(["찜 횟수", 2, 2, 2, 1]);
  const view = state.view;
  const dibs = state.dibs;
  const timeViewData = ViewDatatoTime(view);
  const dayViewData = ViewDatatoDay(view);
  const monthViewData = ViewDatatoMonth(view);
  const timeDibsData = DibsDatatoTime(dibs);
  const dayDibsData = DibsDatatoDay(dibs);
  const monthDibsData = DibsDatatoMonth(dibs);


  const handleInputChange = (value: string) => {
    setOption(value);
    setX1([]);
    setX2([]);
    setViewData([]);
    setDibsData([]);
    if (value == "1") {
      setFormat("%Y-%m-%d %H:%M");
      for (const ele of timeViewData[0]) {
        setX1(x1.concat(ele));
      }
      for (const ele of timeViewData[1]) {
        setX2(x2.concat(ele));
      }
      for (const ele of timeDibsData[0]) {
        setViewData(viewData.concat(ele));
      }
      for (const ele of timeDibsData[1]) {
        setDibsData(dibsData.concat(ele));
      }
    }
    if (value == "2") {
      setFormat("%Y-%m-%d");
      for (const ele of dayViewData[0]) {
        setX1(x1.concat(ele));
      }
      for (const ele of dayViewData[1]) {
        setX2(x2.concat(ele));
      }
      for (const ele of dayDibsData[0]) {
        setViewData(viewData.concat(ele));
      }
      for (const ele of dayDibsData[1]) {
        setDibsData(dibsData.concat(ele));
      }
    }
    if (value == "3") {
      setFormat("%Y-%m");
      for (const ele of monthViewData[0]) {
        setX1(x1.concat(ele));
      }
      for (const ele of monthViewData[1]) {
        setX2(x2.concat(ele));
      }
      for (const ele of monthDibsData[0]) {
        setViewData(viewData.concat(ele));
      }
      for (const ele of monthDibsData[1]) {
        setDibsData(dibsData.concat(ele));
      }
    }
  };

  var chart = bb.generate({
    "data": {
      "type": line(),
      "xs": {
        "조회수": "x1",
        "찜 횟수": "x2",
      },
      "xFormat":format,
      "columns": [
        // ["x1", "2021-11-10 20:25", "2021-11-11 18:10", "2021-11-11 20:23", "2021-11-12 17:11", "2021-11-22 12:00"],
        // ["x2", "2021-11-11 18:10", "2021-11-11 20:23", "2021-11-12 17:11", "2021-11-22 12:00"],
        // ["조회수", 12, 22 ,7, 8, 4],
        // ["찜 횟수", 2, 2, 2, 1]
        x1, x2, viewData, dibsData
      ]
    },
    "axis": {
      "x": {
        "type": "timeseries",
        "tick": {
          "format": format,
          "multiline": true
        }
      }
    },
    "bindto": "#chart",
    "padding": {
      "top": 20,
      "bottom": 20,
      "left": 100,
      "right": 100
    },
    "zoom": {
      // for ESM import usage, import 'zoom' module and execute it as
      "enabled": zoom()
    },

    // "color": {
    //   "pattern": [
    //     "red",
    //     "blue",
    //     "cyan"
    //   ]
    // }
    
  });

  
  return (
    <div className="ChartPage">
      {state ? (
        <div>
          <div style={{paddingLeft:100, paddingRight:100}}>
          <h1>{state.name} 상품의 trend chart</h1>
            {/* <OptionList optionID={"1"} onClick={handleInputChange}></OptionList> */}
            <Radio.Group>
              <Radio value={1} name="range" onChange={e => handleInputChange("1")} checked={true}>일간</Radio>
              <Radio value={2} name="range" onChange={e => handleInputChange("2")}>주간</Radio>
              <Radio value={3} name="range" onChange={e => handleInputChange("3")}>월간</Radio>
            </Radio.Group>
          </div>
          <div id="chart">
            <script type="text/javascript">
              chart.load({})
            </script>
          </div>
        </div>
      ) : (
        <WrongAccess />
      )}
      
    </div>
    
  );
};

export default ChartPage;
