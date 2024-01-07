import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';
import { Pagination } from '@material-ui/lab';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setsearch] = useState("");
    const [page, setPage] = useState(1)

    const { currency, symbol } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data)
        setLoading(false);

    };

    useEffect(() => {
        fetchCoins()
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#ffffff'
            },
            type: 'dark',
        },
    });

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    };
    const useStyles = makeStyles({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#ABABAB55",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: '#3BBADD',
            },
        },
    });

    const classes = useStyles();
    const history = useNavigate();


    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography
                    variant='h5'
                    style={{
                        fontWeight: 'bold',
                        marginBottom: 15,
                        marginTop: 10,
                        fontFamily: 'Nunito Sans',
                        //color: '#3BBADD',
                        textTransform: 'capitalize',
                    }}
                >
                    Currencies according to market cap
                </Typography>
                <TextField variant='outlined' label='search for currency' style={{ marginBottom: 20, width: '100%' }} onChange={(e) => { setsearch(e.target.value) }} />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: '#3BBADD' }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: '#3BBADD' }}>
                                    <TableRow>
                                        {['Coin', 'Price', '24hr Change', 'Market Cap'].map((head) => (
                                            <TableCell style={{ fontFamily: 'Nunito Sans', color: '#ffffff', fontWeight: 600 }} key={head} align={head === 'Coin' ? '' : 'right'}>
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                            const profit = row.price_change_percentage_24h >= 0;
                                            return (
                                                <TableRow
                                                    onClick={() => history(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}
                                                    > 
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div
                                                            style={{ display: "flex", flexDirection: "column" }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "#ABABAB" }}>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0, -6)
                                                        )}
                                                        M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        )}
                </TableContainer>
                <Pagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable
