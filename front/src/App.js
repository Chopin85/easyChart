import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";
import axios from "axios";
import moment from "moment";
import "./App.css";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const App = () => {
  const myChartRef = useRef();

  const [data, setData] = useState(null);
  const [prix, setprix] = useState(null);

  const [departDate, setdepartDate] = useState(new Date());

  const [returnDate, setreturnDate] = useState(departDate);

  const [hours, sethours] = useState(1);

  const [departFrom, setDepartFrom] = useState("Parigi Orly (ORY)");

  const [retrunTo, setRetrunTo] = useState("Milano Linate (LIN)");

  const marks = [
    {
      value: 1,
      label: "1h"
    },
    {
      value: 6,
      label: "6h"
    },
    {
      value: 12,
      label: "12h"
    },
    {
      value: 18,
      label: "18h"
    },
    {
      value: 24,
      label: "24h"
    },
    {
      value: 60,
      label: "60h"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3001/api/price/getAll");
      if (result.data.data) {
        const date = Object.keys(result.data.data).map(function(key) {
          return key;
        });
        setData(date.map(e => moment(e).format("LLL")));
        setprix(date.map(key => result.data.data[key]));
      }
    };

    const fetchData2 = async () => {
      const result = await axios("http://localhost:3001/api/data/getData");

      if (result.data.data) {
        const {
          origin,
          destination,
          departureDate,
          returnDate,
          sec
        } = result.data.data;

        setDepartFrom(origin);
        setRetrunTo(destination);
        setdepartDate(moment(departureDate).toDate());
        setreturnDate(moment(returnDate).toDate());
        sethours(parseInt(sec));
      }
    };

    fetchData();
    fetchData2();
  }, []);

  useEffect(() => {
    if (data && prix) {
      new Chart(myChartRef.current, {
        type: "line",
        data: {
          labels: data,
          datasets: [
            {
              data: prix.map(e =>
                parseFloat(e.departurePrix.replace(/,/g, "."))
              ),
              label: "Andata",
              borderColor: "#3e95cd",
              fill: false
            },
            {
              data: prix.map(e => parseFloat(e.returnPrix.replace(/,/g, "."))),
              label: "Ritorno",
              borderColor: "#8e5ea2",
              fill: false
            }
          ]
        },

        options: {
          animation: false,
          title: {
            display: true,
            text: "EasyJet price"
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItems, data) {
                return (
                  data.datasets[tooltipItems.datasetIndex].label +
                  ": " +
                  tooltipItems.yLabel +
                  " €"
                );
              }
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(label, index, labels) {
                    return label + " €";
                  }
                }
              }
            ]
          }
        }
      });
    }
  }, [data, prix]);

  const startServer = async () => {
    const data = await axios(
      `http://localhost:3001/api/cron/start?origin=${departFrom}&destination=${retrunTo}&departureDate=${moment(
        departDate
      ).format("YYYY-MM-DD")}&returnDate=${moment(returnDate).format(
        "YYYY-MM-DD"
      )}&sec=${hours}`
    );
    console.log(data.data);
  };
  const stopServer = async () => {
    const data = await axios("http://localhost:3001/api/cron/stop");
    console.log(data.data);
  };

  const deleteData = async () => {
    const data = await axios.delete("http://localhost:3001/api/price/clear");
    console.log(data.data);
  };

  return (
    <div className="App">
      <div>
        <TextField
          style={{ margin: "0 20px 0 20px" }}
          required
          label="Da"
          onChange={value => setDepartFrom(value.target.value)}
          value={departFrom}
        />
        <TextField
          style={{ margin: "0 20px 0 20px" }}
          required
          label="A"
          onChange={value => setRetrunTo(value.target.value)}
          value={retrunTo}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            minDate={new Date()}
            style={{ margin: "0 20px 0 20px" }}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            label="Data Partenza"
            value={departDate}
            onChange={date => {
              setdepartDate(date);
              console.log(date);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <KeyboardDatePicker
            autoOk
            minDate={departDate}
            style={{ margin: "0 20px 0 20px" }}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            label="Data Ritorno"
            value={returnDate}
            onChange={date => setreturnDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div style={{ margin: "20px 0 20px 0" }}>
        <Typography id="discrete-slider-always" gutterBottom>
          Every hours
        </Typography>
        <Slider
          style={{ width: "400px" }}
          value={hours}
          onChange={(event, value) => sethours(value)}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={24}
        />
      </div>
      <div style={{ margin: "20px 0 20px 0" }}>
        <Button
          style={{ width: "100px", margin: "0 20px 0 20px" }}
          variant="contained"
          color="primary"
          onClick={startServer}
        >
          START
        </Button>
        <Button
          style={{ width: "100px", margin: "0 20px 0 20px" }}
          variant="contained"
          color="primary"
          onClick={stopServer}
        >
          STOP
        </Button>
        <Button
          style={{ width: "100px", margin: "0 20px 0 20px" }}
          variant="contained"
          color="secondary"
          onClick={deleteData}
        >
          CLEAR
        </Button>
      </div>
      {data && (
        <div style={{ margin: "0 300px 0 300px" }}>
          <canvas ref={myChartRef}></canvas>
        </div>
      )}
    </div>
  );
};

export default App;
