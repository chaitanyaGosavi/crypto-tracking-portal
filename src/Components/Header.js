import { AppBar, Container, InputLabel, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
    Title: {
        flex: 1,
        color: '#3BBADD',
        fontFamily: 'Nunito Sans',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: 5,

    }
}));
const Header = () => {



    const history = useNavigate();
    const classes = useStyles();
    const {currency, setCurrency} = CryptoState();

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
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography
                        variant='h5'
                            onClick={() => history.push('/')}
                            className={classes.Title}>
                            Crypto Portal</Typography>

                            <InputLabel htmlFor="outlined-age-native-simple">Currency</InputLabel>
                        <Select
                            variant='outlined'
                            style={{
                                width: 100,
                                height: 40,
                                marginLeft: 10
                            }}
                            value = {currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header
