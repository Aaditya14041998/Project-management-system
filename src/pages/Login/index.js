import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useLoginContext } from "contexts/LoginContext";
import { getAPICall, postAPICall } from 'utils/api';
import logo from 'assets/images/Logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url('/login-bg-1.svg')`, 
    height: "100vh",
    width: "100vw",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down('sm')]: {
      backgroundSize: "auto",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
    width: "60%",
    borderRadius: "20px",
    [theme.breakpoints.down('sm')]: {
     width: "100%",
    },
  },
  submitWrap: {
    display: "flex",
    justifyContent: "center",
  },
  loading: {
    marginLeft: theme.spacing(2),
    color: "white",
  },
  formContainer: {
    background: "white",
    padding: "25px",
    marginTop: "15px",
    borderRadius: "7px",
    [theme.breakpoints.down('sm')]: {
      marginTop: "17%",
    },
  }
}));

export default function Login() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const { handleLogin } = useLoginContext();

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");


  const [emailId, setEmailId] = useState("");
  const handleEmailIdChange = (event) => {
    const value = event.target.value;
    setEmailId(value);
  }; 

  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  }; 


  const doesFormContainError = () => {
    const newErrors = {};
    let isErrorFound = false;
    if (emailId.trim() === "") {
      newErrors.emailId = "Email is required";
      isErrorFound=true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) {
      newErrors.emailId = "Invalid emailId address";
      isErrorFound=true;
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required";
      isErrorFound=true;
    }
    setErrors(newErrors);
    return isErrorFound;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (doesFormContainError() === false) {
      setServerError("");
      setIsLoading(true);
      try {
        await postAPICall("/login", {
          emailId,
          password,
        });
        // if login is successful
        setIsLoading(false);
        // handleLogin sets IsLogin Context Variable to true  
        handleLogin();
        // go to AppLayout that is Dashboard
        history.push("/project");
        
      } catch (error) {
        if (error.response && error.response.data) {
          
          setServerError(error.response.data.error);
        } else {
         
          setServerError("An error occurred. Please try again later.");
        }
        setErrors({});
      }
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs" style={{ paddingTop: "50px" }}>
        <div className={classes.paper}>
          <img src={logo} alt="Logo"
          />
          <Typography style={{ color: 'white', marginTop: '10px' }} component="h6" variant="h6">
            Online Project Management
          </Typography>
          {/* // Form outer box edge */}
          <Paper className={classes.formContainer}>
            <Typography style={{ textAlign: 'center' }} component="h6" variant="h6">
              Login to get started
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="emailId"
                label="Email Address"
                name="emailId"
                autoComplete="emailId"
                onChange={handleEmailIdChange}
                error={!!errors?.emailId}
                helperText={errors?.emailId}
                autoFocus
              />
              <TextField
                required
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                autoComplete="current-password"
                onChange={handlePasswordChange}
                error={!!errors?.password}
                helperText={errors?.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signup">{"Create Account"}</Link>
                </Grid>
              </Grid>
              <div className={classes.submitWrap}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {isLoading ? (
                    <>
                      Loading...
                      <CircularProgress size={20} className={classes.loading} />
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
          </Paper>
          {serverError && (
            <Typography color="error" variant="body2" style={{ textAlign: 'center', marginTop: '15px' }}>
              {serverError}
            </Typography>
          )}
        </div>
      </Container>
    </div>
  );
}

