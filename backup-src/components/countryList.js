import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

function CountryList (props) {
    const classes = useStyles();

    const [globalData, setGlobalData] = useState([{}]);
    useEffect(() => {
        async function getCountryList() {
            const resData = await fetch("https://corona-api.com/countries");
            let data = await resData.json();
            console.log(data.data);
            setGlobalData(data.data);
        }
        getCountryList();
    }, [])
    
  return (
    <div>
        <FormControl className="app__dropdown">
            <Select
                variant="outlined"
                value={props.country}
                onChange={props.onChange}
            >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {props.countries && props.countries.map((country, ind) => (
                <MenuItem key={ind} value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
        {/* {globalData.map((key, ind) => {
            return (
                <ListItem button key={ind}>
                    <ListItemText primary={globalData[ind].name} />
                    <ListItemText align="right" secondary={globalData[ind].population} />
                </ListItem>
            )
        })} */}
    </div>
  );
}

export default CountryList