import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import SpeedOutlinedIcon from "@material-ui/icons/SpeedOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import { useLoginContext } from "contexts/LoginContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  activeListItem: {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export const MainListItems = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div>
      <ListItem
        button
        component={Link}
        to="/project"
        className={
          location.pathname === "/project" ? classes.activeListItem : ""
        }
      >
        <ListItemIcon>
          <SpeedOutlinedIcon style={{ color: `${location.pathname === "/project" ? "#044e92" : ''}` }} />
        </ListItemIcon >
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/project/list"
        className={
          location.pathname === "/project/list" ? classes.activeListItem : ""
        }
      >
        <ListItemIcon>
          <StorageOutlinedIcon style={{ color: `${location.pathname === "/project/list" ? "#044e92" : ''}` }} />
        </ListItemIcon>
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div>
      <ListItem
        button
        component={Link}
        to="/project/create"
        className={
          location.pathname === "/project/create" ? classes.activeListItem : ""
        }
      >
        <ListItemIcon>
          <AddOutlinedIcon style={{ color: `${location.pathname === "/project/create" ? "#044e92" : ''}` }} />
        </ListItemIcon>
      </ListItem>
    </div>
  );
};


export const LogoutListItem = () => {
  const { handleLogout } = useLoginContext();
  const history = useHistory();
  const onLogoutClick = () => {
    handleLogout();
    history.push('/login');
  };
  return (
    <div>
      <ListItem
        button
        onClick={onLogoutClick}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
      </ListItem>
    </div>
  );
};
