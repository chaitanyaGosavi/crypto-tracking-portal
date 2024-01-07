import { Container, Typography, makeStyles } from '@material-ui/core';
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
    Banner: {
        backgroundImage: 'url(./BannerBG3.jpg)'
    },
    BannerContainer: {
        height:400,
        display:'flex',
        flexDirection:'column',
        paddingTop: 25,
        justifyContent: 'space-around',
    },
    TagLine: {
        display: 'flex',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },
}));

const Banner = () => {
    const classes = useStyles(); 
  return (
    <div className={classes.Banner}>
      <Container className={classes.BannerContainer}>
        <div className={classes.TagLine}>
            <Typography
            variant='h2'
            style={{
                fontWeight:'bold',
                marginBottom: 15,
                fontFamily: 'Nunito Sans'
                }}
            >
                Crypto Tracking Portal
            </Typography>
            <Typography
            variant='subtitle1'
            style={{
                color: '#ABABAB',
                textTransform:'capitalize',
                fontFamily: 'Nunito Sans'
                }}
            >
                All your crypto Information in one place
            </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  )
}

export default Banner
