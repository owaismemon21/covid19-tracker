import React from 'react';
import { makeStyles, Typography, Paper, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    totalPaper: {
      padding: theme.spacing(2),
      background: '#DCE9FF',
      borderRadius: 10
    },
    totalPaperText:{
      fontWeight:"bold",
      color: '#527BB2',
    },
    totalTotalPaperText:{
      fontWeight:"bold",
      color: '#527BB2',
      fontSize: 12
    },
    activePaper: {
      padding: theme.spacing(2),
      background: '#FBDA31',
      borderRadius: 10
    },
    activePaperText:{
      fontWeight:"bold",
      color: '#B99202',
    },
    activeTotalPaperText:{
      fontWeight:"bold",
      color: '#B99202',
      fontSize: 12
    },
    recoveredPaper: {
      padding: theme.spacing(2),
      background: '#A2F8BB',
      borderRadius: 10
    },
    recoveredPaperText:{
      fontWeight:"bold",
      color: '#1C9739',
    },
    recoveredTotalPaperText:{
      fontWeight:"bold",
      color: '#1C9739',
      fontSize: 12
    },
    deathsPaper: {
      padding: theme.spacing(2),
      background: '#FFCCD4',
      borderRadius: 10
    },
    deathsPaperText:{
      fontWeight:"bold",
      color: '#D74574',
    },
    deathsTotalPaperText:{
      fontWeight:"bold",
      color: '#D74574',
      fontSize: 12
    }
  }));

function InfoPanel (props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
            <Paper className={classes.paper}>
                <Typography variant="h1" component="h2">Total Cases</Typography>
                <Typography variant="h1" component="h2"><CountUp
                      start={0}
                      end={props.total}
                      duration={2.4}
                      separator=","
                    /></Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default InfoPanel