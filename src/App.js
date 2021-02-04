import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Grid } from "@material-ui/core";
import { Header, InfoPanels, CountryPicker, CountryList, Graph, Footer } from "./components";
import styles from "./App.module.css";
import cx from "classnames";
import { getAPIURL } from "./api";

function App() {
  const [infoData, setInfoData] = useState({});
  const [country, setCountry] = useState('')
  //const [countries, setCountries] = useState('')
//const [mapCenter, setMapCenter] = useState({ lat: 24.8539615, lng: 66.9868871 });
//const [mapZoom, setMapZoom] = useState(3);
//const [countryInfo, setCountryInfo] = useState({});
  

  useEffect(() => {
    async function getData() {
        const response = await fetch(`${getAPIURL}`);
        const data = await response.json();
        setInfoData(data);
    }
    getData();
  }, [])

  

  const handleCountryChange = async (country) => {
      setCountry(country);
      const url = (country === "" || country === "Global") ? `${getAPIURL}` : `${getAPIURL}/countries/${country}`;
      const response = await fetch(url);
      const data = await response.json();
      setInfoData(data);
  }
  
  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.headerWrapper}>
          <Header />
          <CountryPicker country={country} handleCountryChange={handleCountryChange} />
        </div>
        <InfoPanels data={infoData} />
        <Grid container spacing={3} justify="center">
            <Grid item component={Card} xs={4} md={4} className={cx(styles.card, styles.infected)}>
                <CardContent>
                    <Typography className={styles.cardTitle} variant="h5" gutterBottom>
                    Country
                    </Typography>
                    <CountryList />
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={8} md={8} className={cx(styles.card, styles.recovered)}>
                <CardContent>
                  <Grid container spacing={1}className={styles.graphTitle}>
                    <Grid container item xs={8} spacing={3}>
                      <Typography className={styles.cardTitle} variant="h5" gutterBottom>
                      Chart
                      </Typography>
                    </Grid>
                    <Grid container item style={{ display: "flex", justifyContent: "flex-end" }} xs={4} spacing={3}>
                      
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid container item xs={12}>
                      <Graph data={infoData} country={country} />
                    </Grid>
                  </Grid>  
                </CardContent>
            </Grid>
            
        </Grid>
        <Footer />
        
      </Container>
    </div>
  );
}

export default App;
