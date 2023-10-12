import React from "react";
import { InputBase, withStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  compactSearchInput: {
    padding: "4px 12px", 
    fontSize: "0.875rem", 
    alignItems: "center",
    width: 150, 
    backgroundColor: "#f5f5f5", 
    borderRadius: 10, 
    borderBottom: '2px solid #ccc',
  },
  searchIcon: {
    marginRight: 8, 
    color: "#888", 
  },
};

const CompactSearchInput = ({ classes, placeholder, value, onChange }) => {
  return (
    <div className={classes.compactSearchInput}>
      <SearchIcon className={classes.searchIcon} />
      <InputBase
        placeholder={placeholder}
        fullWidth
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default withStyles(styles)(CompactSearchInput);
