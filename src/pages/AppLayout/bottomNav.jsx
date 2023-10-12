import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import SpeedOutlinedIcon from "@material-ui/icons/SpeedOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

const useStyles = makeStyles((theme) => ({
  bottomNav: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    display: "none", // Hide the navigation by default


    [theme.breakpoints.down("sm")]: {
      display: "block", // Show the navigation for mobile views
      zIndex: 2,

    },
  },
  activeListItem: {
    borderBottom: `2px solid #044e92`,
  },
}));

const BottomNav = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <Paper elevation={3} className={classes.bottomNav}>
      <BottomNavigation>
        <BottomNavigationAction
          label="project"
          icon={
            <SpeedOutlinedIcon
              style={{
                color: `${location.pathname === "/project" ? "#044e92" : ""}`,
              }}
            />
          }
          component={Link}
          to="/project"
          className={
            location.pathname === "/project" ? classes.activeListItem : ""
          }
        />
        <BottomNavigationAction
          label="create"
          icon={
            <AddOutlinedIcon
              style={{
                color: `${location.pathname === "/project/create" ? "#044e92" : ""
                  }`,
              }}
            />
          }
          component={Link}
          to="/project/create"
          className={
            location.pathname === "/project/create"
              ? classes.activeListItem
              : ""
          }
        />
        <BottomNavigationAction
          label="list"
          icon={
            <StorageOutlinedIcon
              style={{
                color: `${location.pathname === "/project/list" ? "#044e92" : ""
                  }`,
              }}
            />
          }
          component={Link}
          to="/project/list"
          className={
            location.pathname === "/project/list" ? classes.activeListItem : ""
          }
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
