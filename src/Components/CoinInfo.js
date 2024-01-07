import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { CircularProgress, ThemeProvider, createTheme, makeStyles } from '@material-ui/core';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import SelectButtons from './SelectButtons';

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag,setFlag] = useState(false);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true)
    setHistoricData(data.prices)
  };

  useEffect(() => {
    fetchHistoricData()
  }, [currency, days]);

  const useStyles = makeStyles((theme) => ({
    container: {
      backdropFilter: 'blur(10px) saturate(100%)',
      backgroundColor: 'rgba(255, 255, 255, 0.2);',
      borderRadius: '12px',
      width: "65%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));
  const classes = useStyles()

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#ffffff'
      },
      type: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ||!flag ? (
          <CircularProgress
            style={{ color: "#3BBADD" }}
            size={150}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#3BBADD",
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "#ffffff",
                      font: {
                        size: 18
                      }
                    }
                  }
                },
                elements: {
                  point: {
                    radius: 2,
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      color: "#ffffff",

                    }
                  },
                  x: {
                    ticks: {
                      color: "#ffffff",

                    }
                  }
                }
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day)=>(
                <SelectButtons
                key={day.value}
                onClick={() => {setDays(day.value);
                  setFlag(false);
                }}
                selected={day.value === days}
                >
                  {day.label}
                </SelectButtons>
              ))
              }
            </div>
          </>
        )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo
