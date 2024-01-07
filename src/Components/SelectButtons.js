import { makeStyles } from '@material-ui/core';
import React from 'react'

const SelectButtons = ({ children, selected, onClick }) => {
    const useStyles = makeStyles({
        selectbutton: {
          border: "1px solid #3BBADD",
          borderRadius: 5,
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          fontFamily: "Nunito sans",
          cursor: "pointer",
          backgroundColor: selected ? "#3BBADD" : "",
          color: selected ? "black" : "",
          fontWeight: selected ? 700 : 500,
          "&:hover": {
            backgroundColor: "#3BBADD",
            color: "black",
          },
          width: "22%",
          //   margin: 5,
        },
      });
    const classes = useStyles();
  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  )
}

export default SelectButtons
