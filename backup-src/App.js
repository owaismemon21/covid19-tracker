import React, { useEffect, useState } from "react"
import { Container, makeStyles } from '@material-ui/core';

import Header from "./components/header";
import infoPanels from "./components/infoPanel";
import CountryList from "./components/countryList";
import Graph from "./components/graph";

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'rgb(214, 224, 234,.6)',
  },
}));

function App() {
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [chartCountries, setChartCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 24.8539615, lng: 66.9868871 });
  const [mapZoom, setMapZoom] = useState(3);
  const [listData, setListData] = useState([]);

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

  useEffect(() => {
    async function getAllData() {
        const response = await fetch("https://disease.sh/v3/covid-19/all");
        let allData = await response.json();
        setCountryInfo(allData);
    }
    getAllData();
  }, [])
  
  useEffect(() => {
    async function getAllCountries() {
        const response = await fetch("https://disease.sh/v3/covid-19/countries");
        let allCountries = await response.json();
        let countries = allCountries.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        let sortedData = sortData(allCountries);
        setCountries(countries);
        setMapCountries(allCountries);
        setListData(sortedData);
    }
    getAllCountries();
  }, [])
  
  useEffect(() => {
    async function getDailyData() {
        const response = await fetch("https://covid19.mathdro.id/api/daily");
        let data = await response.json();
        const modifiedData = data.map((dailyData) => ({
          confirmed: dailyData.confirmed.total,
          deaths: dailyData.deaths.total,
          reportDate: dailyData.reportDate
        }));
        setChartCountries(modifiedData);
    }
    getDailyData();
  }, [])
  
  const classes = useStyles();
  return (
    <>
    <Header />
    <Container className={classes.root}>
      <infoPanels changeCase={setCasesType} total={countryInfo.cases} active={countryInfo.active} recovered={countryInfo.recovered} deaths={countryInfo.deaths} />
      <CountryList listData={listData} mapCountries={mapCountries} casesType={casesType} mapCenter={mapCenter} mapZoom={mapZoom} />
      <Graph data={chartCountries} />
    </Container> 
    </>
  );
}

export default App;
