import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";
import axios from "axios";
import moment from "moment";
import "./App.css";

const App = () => {
  const myChartRef = useRef();

  const [data, setData] = useState(null);
  const [prix, setprix] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3001/api/price/getAll");
      const date = Object.keys(result.data.data).map(function(key) {
        return key;
      });
      setData(date.map(e => moment(e).format("LLL")));
      setprix(date.map(key => result.data.data[key]));
    };

    fetchData();
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

  return (
    <div className="App">
      <canvas ref={myChartRef}></canvas>
    </div>
  );
};

export default App;
