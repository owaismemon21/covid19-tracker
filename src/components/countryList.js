import React, { useEffect, useState} from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

import styles from './countryList.module.css';
import { getListAPIURL } from "../api";

const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a.cases > b.cases) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
};

function CountryList (props) {
    const [countriesList, setCountriesList] = useState([]);
    useEffect(() => {
    async function getCountriesList() {
        const response = await fetch(`${getListAPIURL}/countries`);
        const data = await response.json();
        //const list = data.countries;
        console.log(data)
        let sortedData = sortData(data);
        setCountriesList(sortedData);
        //console.log(list)
    }
    getCountriesList();
    }, [setCountriesList])

    return (
        <div className={styles.listBox}>
            <List className={styles.root}>
                {countriesList.map((country, i) => 
                <ListItem className={styles.list} key={i}>
                    <ListItemText primary={country.country} secondary={
                        <span className={styles.listSecondaryText}>
                            <span><b>Infected:</b> {country.cases}</span>
                            <span><b>Deaths:</b> {country.deaths}</span>
                        </span>    
                    }>
                    </ListItemText>
                </ListItem>
                )}
            </List>
            {/* {countriesList.map((country, i) => 
                <ListItem button className={styles.list} key={i}>
                    <ListItemText primary={country.name} />
                    <ListItemText secondary={country.name} />
                </ListItem>
            )} */}
        </div>
    );
}

export default CountryList