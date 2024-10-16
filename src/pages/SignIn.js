import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { FacebookIcon } from "./CustomIcons";
import AppTheme from "../../shared-theme/AppTheme";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import newLogo from "../../images/images.png";
import singpass from "../../images/singpass-icon.png";
import { GoogleLogin } from "@react-oauth/google";

// Import Firebase functions
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {firebaseConfig } from "../../index";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = () => {
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    let isValid = true;

    if (!emailField.value || !/\S+@\S+\.\S+/.test(emailField.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!passwordField.value || passwordField.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const validateCredentials = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    // Check if email and password match "admin@admin.com" and "123456"
    if (email === "admin@admin.com" && password === "123456") {
      navigate("/home"); // Redirect to dashboard on successful login
    } else {
      setGeneralErrorMessage("Invalid email or password");
      setEmailError(true);
      setPasswordError(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateCredentials(event);
  };

  const handleSingPassLogin = () => {
    // Simulate SingPass login success
    // Here you can call the SingPass API to verify and then redirect to the dashboard
    navigate("/home"); // Redirect to dashboard on success
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google login successful:", response);
    // You can use the response to authenticate with your backend
    // e.g., send the token to your server for validation

    // Redirect to /home after successful login
    navigate("/home");
  };

  const handleGoogleError = (error) => {
    console.error("Google login error:", error);
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log("Facebook login successful:", user);
      navigate("/home"); // Redirect to home/dashboard after successful login
    } catch (error) {
      console.error("Facebook login error:", error);
      alert("Failed to sign in with Facebook.");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <img src={newLogo} alt="New Logo" style={{ width: "100px" }} />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage || generalErrorMessage}
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                sx={{ ariaLabel: "email" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage || generalErrorMessage}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSingPassLogin}
              startIcon={
                <img
                  src={singpass}
                  alt="SingPass"
                  style={{ width: "200px", height: "35px" }}
                />
              }
            ></Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <RouterLink to="/signup">
                  <Link
                    variant="body2"
                    sx={{ alignSelf: "center", cursor: "pointer" }}
                  >
                    Sign up
                  </Link>
                </RouterLink>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                onClick={loginWithFacebook}
                startIcon={<FacebookIcon />}
              >
                Sign in with Facebook
              </Button>
            </Box>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
