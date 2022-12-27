import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./CandleSticks.module.css";
import axios from "axios";
import Papa from "papaparse";
import { DatePicker, Col, Form } from "antd";

const CandleStickChart = () => {
  const [options, setOPtions] = useState({
    // title: {
    //   text: "BTC-USDT",
    //   align: "left",
    // },
    xaxis: {
      type: "datetime",
    },
    // yaxis: {
    //   labels: {
    //     formatter: function (y) {
    //       return "$" + y.toLocaleString("en");
    //     },
    //     tooltip: {
    //       enabled: true,
    //       y: {
    //         formatter: function (y) {
    //           return "$" + y.toLocaleString("en");
    //         },
    //       },
    //     },
    //   },
    // },
    errorMsg: "",
  });
  const [series, setSeries] = useState([{ data: "" }]);
  const [myDate, setDate] = useState({ period1: "", period2: "" });

  const handleData = (res) => {
    Papa.parse(res.data, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        let coinData = results.data;

        coinData.forEach(function (d) {
          d.Open = Math.round(d.Open * 10000) / 10000;
          d.High = Math.round(d.High * 10000) / 10000;
          d.Low = Math.round(d.Low * 10000) / 10000;
          d.Close = Math.round(d.Close * 10000) / 10000;
          d.Volume = Math.round(d.Volume * 1000) / 1000;
        });
        console.log("Coin data => ", coinData);

        let candlestickFormat = coinData.map((d) => {
          return {
            x: new Date(d.Date),
            y: [d.Open, d.High, d.Low, d.Close, d.Volume],
          };
        });
        setOPtions({
          isLoaded: true,
        });
        setSeries([{ data: candlestickFormat }]);
      },
    });
  };
  const handleSelectDateStart = (e) => {
    console.log("name", e.$d);
    const date = new Date(e.$d);

    const timestamp = Date.now(date);
    setDate({ ...myDate, period1: timestamp });
  };

  const handleSelectDateEnd = (e) => {
    console.log("name", e.$d);
    const date = new Date(e.$d);

    const timestamp = Date.now(date);
    console.log(timestamp); // 👉️ 1650931200000
    setDate({ ...myDate, period2: timestamp });
  };
  console.log("first=>", myDate.period1, "end=>", myDate.period2);

  useEffect(() => {
    setOPtions({ errorMsg: "Loading..." });
    if (myDate.period1 === "" || myDate.period2 === "") {
      console.log("empty");
      axios
        .get(
          "https://query1.finance.yahoo.com/v7/finance/download/SPUS?period1=1633381200&period2=1664917199&interval=1d&events=history&crumb=5YTX%2FgVGBmg"
        )
        .then((res) => {
          handleData(res);
        });
    } else {
      console.log("Notempty");

      axios
        .get(
          `https://query1.finance.yahoo.com/v7/finance/download/SPUS?period1=${myDate.firstDate}&period2=${myDate.endDate}&interval=1d&events=history&crumb=5YTX%2FgVGBmg`
        )
        .then((res) => {
          handleData(res);
        });
    }
  }, [myDate]);
  return (
    <div>
      <div>
        <i className={styles.Loading}>{options.errorMsg}</i>
      </div>
      <div className={styles.DATE}>
        <Col sm={24} md={22}>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="Start Date"
            label="Start Date"
            // rules={rules.price}
            required
          >
            <div>
              <DatePicker
                className="w-100"
                placeholder="Select Time"
                onChange={(e) => handleSelectDateStart(e)}
                //   onOk={(e) =>
                //     handleSelect_3(index, e)

                //   }
              />
            </div>
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="end_date"
            label="End Date"
            required

            // rules={rules.comparePrice}
          >
            <div>
              <DatePicker
                placeholder="Select Time"
                name="mohab"
                className="w-100"
                onChange={(e) => handleSelectDateEnd(e)}
              />
            </div>
          </Form.Item>
        </Col>
      </div>

      <div id="chart" className={styles.CandleStick}>
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height="500"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CandleStickChart;
