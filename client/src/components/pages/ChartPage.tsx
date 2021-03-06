import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Product, {ProductInfoProps} from '../shopping/Product';
import WrongAccess from './WrongAccess';
import bb, {area, bar, line, zoom} from "billboard.js";
import { Radio } from 'antd';
import "billboard.js/dist/billboard.css";
import 'antd/dist/antd.css';

// 문자열이 숫자인지 체크합니다.
function isNumeric(data : string) : boolean {
  return !isNaN(Number(data));
}

// 문자열의 빈자리 수만큼 0을 채웁니다.
function fillZero(width: number, str: string) {
  return str.length >= width ? str : new Array(width-str.length+1).join('0') + str;
}

// 오늘 일자를 format에 맞게 반환합니다.
function checkToday() {
  const date_ob = new Date();
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = fillZero(2, date_ob.getHours().toString());
  const minutes = fillZero(2, date_ob.getMinutes().toString());
  const todayMonth = year + "-" + month;
  const todayDate = year + "-" + month + "-" + date;
  const todayTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
  return [todayMonth, todayDate, todayTime]
}

// 조회수 데이터를 월간 형식에 맞게 변형합니다.
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

// 조회수 데이터를 주간 형식에 맞게 변형합니다.
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

// 조회수 데이터를 일간 형식에 맞게 변형합니다.
function ViewDatatoTime(data: Object) {
  var time : any = {};
  var timeArray = ["x1"];
  var valueArray = ["조회수"];
  const today = checkToday();
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    if (isNumeric(key[0]) && key.includes(today[1])) {
      time[key] = data[key];
    }
  }

  for (const key of Object.keys(time) as (keyof typeof data)[]) {
    timeArray.push(key);
    valueArray.push(time[key]);
  }
  return [timeArray, valueArray]
}

// 찜 횟수 데이터를 월간 형식에 맞게 변형합니다.
function DibsDatatoMonth(data: Object, view: string[]) {
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

  // 찜 횟수가 0이라면 조회수의 x축을 사용합니다.
  if (monthArray.length === 1) {
    for (const key of view) {
      if (isNumeric(key[0])) {
        monthArray.push(key);
        valueArray.push("0");
      }
    }
  }
  
  return [monthArray, valueArray]
}

// 찜 횟수 데이터를 주간 형식에 맞게 변형합니다.
function DibsDatatoDay(data: Object, view: string[]) {
  var day : any = {};
  var dayArray = ["x2"];
  var valueArray = ["찜 횟수"];
  const today = checkToday();
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

  // 찜 횟수가 0이라면 조회수의 x축을 사용합니다.
  if (dayArray.length === 1) {
    for (const key of view) {
      if (isNumeric(key[0])) {
        dayArray.push(key);
        valueArray.push("0");
      }
    }
  }

  return [dayArray, valueArray]
}

// 찜 횟수 데이터를 일간 형식에 맞게 변형합니다.
function DibsDatatoTime(data: Object, view: string[]) {
  var time : any = {};
  var timeArray = ["x2"];
  var valueArray = ["찜 횟수"];
  const today = checkToday();
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    if (isNumeric(key[0]) && key.includes(today[1])) {
      time[key] = data[key];
    }
  }

  for (const key of Object.keys(time) as (keyof typeof data)[]) {
    timeArray.push(key);
    valueArray.push(time[key]);
  }

  // 찜 횟수가 0이라면 조회수의 x축을 사용합니다.
  if (timeArray.length === 1) {
    for (const key of view) {
      if (isNumeric(key[0])) {
        timeArray.push(key);
        valueArray.push("0");
      }
    }
  }

  return [timeArray, valueArray]
}

const ChartPage = (props: RouteComponentProps<{}, {}, ProductInfoProps>) => {
  const { state } = props.location;
  const view = state.view;
  const dibs = state.dibs;
  const timeViewData = ViewDatatoTime(view);
  const dayViewData = ViewDatatoDay(view);
  const monthViewData = ViewDatatoMonth(view);
  const timeDibsData = DibsDatatoTime(dibs, timeViewData[0]);
  const dayDibsData = DibsDatatoDay(dibs, dayViewData[0]);
  const monthDibsData = DibsDatatoMonth(dibs, monthViewData[0]);
  const [option, setOption] = useState("1");

  // Radiobutton의 값이 바뀔 때마다 차트의 데이터를 업데이트해줍니다.
  useEffect(() => {
    if (option === "1") {
      var chart = bb.generate({
        "data": {
          "type": line(),
          "xs": {
            "조회수": "x1",
            "찜 횟수": "x2",
          },
          "xFormat":"%Y-%m-%d %H:%M",
          "columns": [
            timeViewData[0], timeViewData[1], timeDibsData[0], timeDibsData[1]
          ]
        },
        "axis": {
          "x": {
            "type": "timeseries",
            "tick": {
              "format": "%Y-%m-%d %H:%M",
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
          "enabled": zoom()
        }
      });
    }
    if (option === "2") {
      var chart = bb.generate({
        "data": {
          "type": line(),
          "xs": {
            "조회수": "x1",
            "찜 횟수": "x2",
          },
          "xFormat":"%Y-%m-%d",
          "columns": [
            dayViewData[0], dayViewData[1], dayDibsData[0], dayDibsData[1]
          ]
        },
        "axis": {
          "x": {
            "type": "timeseries",
            "tick": {
              "format": "%Y-%m-%d",
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
          "enabled": zoom()
        }
      });
    }
    if (option === "3") {
      var chart = bb.generate({
        "data": {
          "type": line(),
          "xs": {
            "조회수": "x1",
            "찜 횟수": "x2",
          },
          "xFormat":"%Y-%m",
          "columns": [
            monthViewData[0], monthViewData[1], monthDibsData[0], monthDibsData[1]
          ]
        },
        "axis": {
          "x": {
            "type": "timeseries",
            "tick": {
              "format": "%Y-%m",
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
          "enabled": zoom()
        }
      });
    }
    
    
  }, [option]);

  const handleInputChange = (value: string) => {
    setOption(value);
  }
  

  return (
    <div className="ChartPage">
      {state ? (
        <div>
          <div style={{paddingLeft:100, paddingRight:100}}>
            <h1>{state.name} 상품의 trend chart</h1>
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
