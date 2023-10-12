import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import { postAPICall } from 'utils/api';
import logo from 'assets/images/Logo.svg';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url('/login-bg-1.svg')`,
    height: "100vh",
    width: "100vw",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
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
    margin: theme.spacing(3, 0, 2),
    width: "60%",
    borderRadius: "20px",
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
  },
  submitWrap: {
    display: "flex",
    justifyContent: "center",
  }

}));

export default function SignUp() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = (currFormData) => {
    const newErrors = {};

    if (!currFormData.emailId.trim()) {
      newErrors.emailId = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currFormData.emailId)) {
      newErrors.emailId = "Invalid emailId address";
    }
    if (!currFormData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm(formData)) {
      setIsLoading(true);
      try {
        await postAPICall('/user', formData)
        setIsLoading(false);
        console.log("Signup successful:", formData);
        history.push('/login');
      } catch (error) {
        console.error("Signup error:", error);

      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs" style={{ paddingTop: "50px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo} alt="Logo"
          />
          <Typography style={{ color: 'white', marginTop: '10px' }} component="h6" variant="h6">
            Sign up
          </Typography>
          <Paper className={classes.formContainer}>
            <Typography style={{ textAlign: 'center' }} component="h6" variant="h6">
              Create account
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="emailId"
                    label="Email Address"
                    onChange={handleChange}
                    name="emailId"
                    autoComplete="emailId"
                    error={!!errors.emailId}
                    helperText={errors.emailId}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    autoComplete="current-password"
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
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
                </Grid>
              </Grid>

              <div className={classes.submitWrap}>
                <Button
                  type="submit"
                  fullWidth
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
                    "Sign Up"
                  )}
                </Button>
              </div>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </form>
          </Paper>

       
    </div>
      </Container >
    </div >
  );
}
