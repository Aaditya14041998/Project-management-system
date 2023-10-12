import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import { MainListItems, SecondaryListItems, LogoutListItem } from "./listItems";
import { Switch, Route } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ExitToApp as ExitToAppIcon } from "@material-ui/icons";
import { useLocation, useHistory } from "react-router-dom";
import { useLoginContext } from "contexts/LoginContext";
import Dashboard from "pages/Dashboard";
import ProjectList from "pages/ProjectList";
import CreateProject from "pages/CreateProject";

import logo from "assets/images/Logo.svg";
import BottomNav from "./bottomNav";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  logout: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundImage: `url('/Header-bg.svg')`,
    backgroundRepeat: "no-repeat",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  container: {
    paddingTop: theme.spacing(4),
  },
  logoImage: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  
  fixedHeight: {
    height: 240,
  },
}));

export default function AppLayout() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const location = useLocation();

  const renderHeaderText = () => {
    switch (location.pathname) {
      case "/project/list":
        return "Project Listing";
      case "/project":
        return "Dashboard";
      case "/project/create":
        return "Create Project";
    }
  };

  const { handleLogout } = useLoginContext();
  const history = useHistory();
  const onLogoutClick = () => {
    handleLogout();
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <List>
          <MainListItems />
        </List>
        <Divider />
        <List>
          <SecondaryListItems />
        </List>
        <List>
          <LogoutListItem />
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.appBarSpacer}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ArrowBackIosIcon style={{ color: "white" }} />
              <div style={{ color: "white" }}>
                <Box style={{ fontSize: "20px" }} m={1}>
                  {/* // Dashboard Or List Or Create */}
                  {renderHeaderText()}
                </Box>
              </div>
            </div>
            <div style={{ marginLeft: "420px" }} className={classes.logoImage}>
              <img src={logo} alt="Logo" />
            </div>
            <div className={classes.logout}>
              <ExitToAppIcon
                onClick={onLogoutClick}
                style={{ color: "#fff" }}
              />
            </div>
          </div>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path="/project">
              <Dashboard />
            </Route>
            <Route path="/project/list">
              <ProjectList />
            </Route>
            <Route path="/project/create">
              <CreateProject />
            </Route>
          </Switch>
        </Container>
      </main>
      <BottomNav />
    </div>
  );
}
