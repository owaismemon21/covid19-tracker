import React, { useEffect, useState} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './countryPicker.module.css';
import { getAPIURL } from "../api";

function CountryPicker (props) {
    const [countriesList, setCountriesList] = useState([]);
    useEffect(() => {
    async function getCountriesList() {
        const response = await fetch(`${getAPIURL}/countries`);
        const data = await response.json();
        const list = data.countries;
        setCountriesList(list);
    }
    getCountriesList();
    }, [setCountriesList])

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect className={styles.formSelect} defaultValue="" onChange={(e) => props.handleCountryChange(e.target.value)}>
                <option value="Global">Global</option>
                {//countriesList.data.length ? (
                    countriesList.map((country, i) => <option key={i} value={country.name}>{country.name}</option>)
                //) : null
            }
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker