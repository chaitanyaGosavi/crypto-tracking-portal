import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import CoinsPage from './Components/CoinsPage';
import { makeStyles } from '@material-ui/core';

function App() {

  const useStyles = makeStyles(() =>({
    App:{
      backgroundColor :'#03131A',
      color : '#f5f5f5',
      minHeight : '100vh'

    }
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header />
      <Routes>
      <Route path='/' Component={HomePage} exact/> 
      <Route path='/coins/:id' Component={CoinsPage}/> 
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
