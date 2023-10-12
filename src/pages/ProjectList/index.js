import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CompactSearchInput from "./CompactSearchInput";
import { getAPICall, putAPICall } from "utils/api";
import { format } from "date-fns";


//const styles = {};

const useStyles = makeStyles((theme) => ({
  buttonChip: {
    padding: "6px 12px",
    borderRadius: "20px",
    textTransform: "none",
    margin: "0 5px",
    minWidth: "40px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "90px",
    },
   
  },
  cardActionContainer: {
    justifyContent: "space-around",
  },
  projectList: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "75px",
      boxShadow: "none",
    },
  },
  tableContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  fieldContainer: {
    display: "flex",
    alignItems: "baseline",
  },
  bullet: {
    margin: "0 10px",
    color: "#0000008a",
    fontSize: "21px",
  },
  fieldLabel: {
    marginRight: "5px",
  },
  tablePagination: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  cardPagination: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },

  cardContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",

    },
  },
  cardItemContainer: {
    margin: "15px 0",
  },
  cardHeading: {
    display: "flex",
    justifyContent: "space-between",
  },
  tableCell: {
    padding: "8px", 
    textAlign: "center",
  },
  projectTheme: {
    padding: "8px", 
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
  compactTextField: {
    "& .MuiInputBase-root": {
      padding: "8px 12px", 
      fontSize: "0.875rem", 
    },
  },
}));

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const classes = useStyles();

  const fetchProjects = async () => {
    const pro = await getAPICall("/projects");
    setProjects(pro?.data || []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting state
  const [sortBy, setSortBy] = useState("priority");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sorting change
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
  };

  const handleAction = async (status, project) => {
    const newData = {
      ...project,
      status,
    };
    await putAPICall(`/project/${project.projectId}`, newData);
    fetchProjects();
  };

  const [tableData, setTableData] = useState(projects);
  const [paginatedData, setPaginatedData] = useState(projects);

  const handleSearchSortingPagination = () => {
    const filteredPro = projects
      .filter((project) => {
        const lowerCasedQuery = searchQuery.trim().toLowerCase();
        return (
          project.projectTheme.toLowerCase().includes(lowerCasedQuery) ||
          project.reason.toLowerCase().includes(lowerCasedQuery) ||
          project.type.toLowerCase().includes(lowerCasedQuery) ||
          project.division.toLowerCase().includes(lowerCasedQuery) ||
          project.category.toLowerCase() == lowerCasedQuery ||
          project.priority.toLowerCase().includes(lowerCasedQuery) ||
          project.department.toLowerCase().includes(lowerCasedQuery) ||
          project.location.toLowerCase().includes(lowerCasedQuery) ||
          project.status.toLowerCase().includes(lowerCasedQuery)
        );
      })
      .sort((a, b) => {
        const compareResult = a[sortBy].localeCompare(b[sortBy]);
        return compareResult;
      });
    setPaginatedData(filteredPro);
    const newPro = filteredPro.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setTableData(newPro);
  };

  useEffect(() => {
    handleSearchSortingPagination();
  }, [searchQuery, projects, sortBy, page, rowsPerPage]);

  const getFormatedDate = (date) => {
    const originalDate = new Date(date);
    return format(originalDate, "MMMM-dd, yyyy");
  };

  const displayTable = () => {
    return (
      <TableContainer className={classes.tableContainer}>
        <Table style={{ padding: "8px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Division</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Dept.</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((projectDate) => {
              const {
                projectId,
                startDate,
                endDate,
                projectTheme,
                ...project
              } = projectDate;
              return (
                <TableRow key={projectId}>
                  <TableCell key={projectId} className={classes.projectTheme}>
                    <b>{projectTheme}</b>
                    {getFormatedDate(startDate)} to {getFormatedDate(endDate)}
                  </TableCell>
                  {Object.values(project).map((value, index) => (
                    <TableCell key={index} className={classes.tableCell}>
                      {value}
                    </TableCell>
                  ))}
                  <TableCell className={classes.tableCell}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttonChip}
                      onClick={() => handleAction("Running", projectDate)}
                    >
                      Start
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.buttonChip}
                      onClick={() => handleAction("Closed", projectDate)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.buttonChip}
                      onClick={() => handleAction("Cancelled", projectDate)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const displayCards = () => {
    
    return (
      <div className={classes.cardContainer}>
        {tableData.map((project) => {
          return (
            <Paper className={classes.cardItemContainer}>
              <Card className={classes.cardItem}>
                <CardContent>
                  <div className={classes.cardHeading}>
                    <Typography variant="h5" component="h2">
                      {project?.projectTheme}
                    </Typography>
                    <Typography style={{ color: "#2c366e" }}>
                      <b>{project?.status}</b>
                    </Typography>
                  </div>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {getFormatedDate(project?.startDate)} to{" "}
                    {getFormatedDate(project?.endDate)}
                  </Typography>

                  <div className={classes.fieldContainer}>
                    <Typography
                      className={classes.fieldLabel}
                      component="p"
                      color="textSecondary"
                    >
                      Reason:
                    </Typography>
                    <Typography variant="body2" component="p">
                      {project?.reason}
                    </Typography>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={classes.fieldContainer}>
                      <Typography
                        className={classes.fieldLabel}
                        component="p"
                        color="textSecondary"
                      >
                        Type:
                      </Typography>
                      <Typography variant="body2" component="p">
                        {project?.type}
                      </Typography>
                    </div>
                    <span className={classes.bullet}>•</span>
                    <div className={classes.fieldContainer}>
                      <Typography
                        className={classes.fieldLabel}
                        component="p"
                        color="textSecondary"
                      >
                        Category:
                      </Typography>
                      <Typography variant="body2" component="p">
                        {project?.category}
                      </Typography>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={classes.fieldContainer}>
                      <Typography
                        className={classes.fieldLabel}
                        component="p"
                        color="textSecondary"
                      >
                        Div:
                      </Typography>
                      <Typography variant="body2" component="p">
                        {project?.division}
                      </Typography>
                    </div>
                    <span className={classes.bullet}>•</span>
                    <div className={classes.fieldContainer}>
                      <Typography
                        className={classes.fieldLabel}
                        component="p"
                        color="textSecondary"
                      >
                        Dept:
                      </Typography>
                      <Typography variant="body2" component="p">
                        {project?.department}
                      </Typography>
                    </div>
                  </div>

                  <div className={classes.fieldContainer}>
                    <Typography
                      className={classes.fieldLabel}
                      component="p"
                      color="textSecondary"
                    >
                      Location:
                    </Typography>
                    <Typography variant="body2" component="p">
                      {project?.location}
                    </Typography>
                  </div>
                  <div className={classes.fieldContainer}>
                    <Typography
                      className={classes.fieldLabel}
                      component="p"
                      color="textSecondary"
                    >
                      Priority:
                    </Typography>
                    <Typography variant="body2" component="p">
                      {project?.priority}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions className={classes.cardActionContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonChip}
                    onClick={() => handleAction("Running", project)}
                  >
                    Start
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.buttonChip}
                    onClick={() => handleAction("Closed", project)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.buttonChip}
                    onClick={() => handleAction("Cancelled", project)}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          );
        })}
      </div>
    );
  };

  return (
    <Paper className={classes.projectList}>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <CompactSearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Sort by dropdown */}
        <FormControl variant="outlined">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleSortChange} label="Sort By">
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="category">Category</MenuItem>
            <MenuItem value="reason">Reason</MenuItem>
            <MenuItem value="division">Division</MenuItem>
            <MenuItem value="department">Department</MenuItem>
            <MenuItem value="location">Location</MenuItem>
          </Select>
        </FormControl>
      </div>
      {displayTable()}
      {displayCards()}
      {tableData.length === 0 && (
        <Typography
          variant="body2"
          style={{ margin: "20px 0" }}
          color="textSecondary"
          align="center"
        >
          No matching projects found.
        </Typography>
      )}
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={paginatedData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.tablePagination}
      />
       <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={paginatedData?.length}
        page={page}
        rowsPerPage={5}
        onPageChange={handleChangePage}
        className={classes.cardPagination}
      
      />
    </Paper>
  );
};

export default ProjectList;
