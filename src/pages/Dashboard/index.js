import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chart from "./Chart";
import { getAPICall } from "utils/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  gridContainer: {
    [theme.breakpoints.down("sm")]: {
      flexWrap: "unset",
      overflowX: "auto",
      overflowY: "hidden",
    },
  },
  fixedHeight: {
    height: 350,
  },
  tileItem: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      minWidth: "148px",
      padding: "0 8px !important",
    },
  },
  tileItemPaper: {
    padding: "10px 22px",
    borderLeft: "8px solid #005aa8",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 10px",
      borderLeft: "4px solid #005aa8",
    },
  },
  chartHeading: {
    marginTop: "25px",
    marginBottom: "17px",
  },
  tileValue: {
    fontWeight: 600,
    color: "#313131de",
  },
  dashboard: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 70,
    }
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [summaryData, setSummaryData] = useState({});

  const fetchSummaryData = async () => {
    try {
      const { data } = await getAPICall("/summary");

      const filteredStatusCounters = data?.statusCounters?.filter(
        (item) => item.status !== "Running"
      );
      setSummaryData({
        statusCounts: filteredStatusCounters,
        deptCounters: data?.deptCounters,
      });

      // if we want to show Running counters as well
      setSummaryData({statusCounts: data?.statusCounters, deptCounters: data?.deptCounters});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const statusCounts = summaryData?.statusCounts || [];
  const deptCounters = summaryData?.deptCounters || [];

  return (
    <div className={classes.dashboard}>
      <Paper sx={{ overflowX: "auto" }} elevation={0}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="flex-start"
          spacing={2}
        >
          {statusCounts?.map((item) => (
            <Grid key={item.status} item className={classes.tileItem}>
              <Paper elevation={3} className={classes.tileItemPaper}>
                <Typography variant="subtitle1" gutterBottom>
                  {item.status}
                </Typography>
                <Typography
                  className={classes.tileValue}
                  variant="h4"
                  sx={{ mt: 1 }}
                >
                  {item.count}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Typography variant="h6" className={classes.chartHeading}>
        Department Wise - Total Vs Closed
      </Typography>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <Chart data={deptCounters} />
        </Paper>
      </Grid>
    </div>
  );
}
