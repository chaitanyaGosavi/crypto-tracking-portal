import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import { LinearProgress, Typography, makeStyles } from '@material-ui/core';
import CoinInfo from './CoinInfo';
import HtmlParser from 'react-html-parser';
import { numberWithCommas } from './Carousel';

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data)
  };

  useEffect(() => {
    fetchCoin()
  }, []);

  const useStyles = makeStyles((theme) => ({
    Container: {
      display: "flex",
      justifyContent: 'space-around',
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      
    },
    Sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      backdropFilter: 'blur(10px) saturate(100%)',
      backgroundColor: 'rgba(255, 255, 255, 0.2);',
      borderRadius: '12px',
    },
    Heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Nunito Sans",
      color:'#3BBADD'
    },
    description: {
      width: "100%",
      fontFamily: "Nunito Sans",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },

  }));

  const classes = useStyles();
  if (!coin) return <LinearProgress style={{ backgroundColor: "#3BBADD" }} />;
  return (
    <div className={classes.Container}>
      <div className={classes.Sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height='200'
          style={{ marginBottom: 20, marginTop: 10 }}
        />
        <Typography className={classes.Heading} variant='h3'>
          {coin?.name}
        </Typography>
        <Typography className={classes.description} variant='subtitle1'>
          {HtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.Heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Nunito Sans",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.Heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Nunito Sans",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.Heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Nunito Sans",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      {/* chart component */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinsPage
