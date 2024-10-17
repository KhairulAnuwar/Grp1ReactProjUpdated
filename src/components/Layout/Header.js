import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "../../images/logoFTBtrans.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import "../../styles/HeaderStyles.css";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null); // Track user login state
  const auth = getAuth();
  const navigate = useNavigate();

  // Firebase auth listener to detect sign-in state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state when authentication state changes
    });
    return () => unsubscribe();
  }, [auth]);

  // handle menu click
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state after sign out
      navigate("/signin"); // Redirect to SignIn page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // menu drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      >
        <img src={Logo} alt="logo" height={"70"} width="250" />
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/FCalculator" className={({ isActive }) => (isActive ? "active" : "")}>
            Calculator
          </NavLink>
        </li>
        <li>
          <NavLink to="/hdblist" className={({ isActive }) => (isActive ? "active" : "")}>
            HDB List
          </NavLink>
        </li>
        <li>
          <NavLink to="/testing" className={({ isActive }) => (isActive ? "active" : "")}>
            Testing
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
        </li>
        {user ? (
          <li>
            <NavLink to="/" onClick={handleLogout}>
              Log Out
            </NavLink>
          </li>
        ) : (
          <>
            {/* <li>
              <NavLink to="/signin" className={({ isActive }) => (isActive ? "active" : "")}>
                SignIn
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"goldenrod"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={Logo} alt="logo" height={"70"} width="250" />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/FCalculator" className={({ isActive }) => (isActive ? "active" : "")}>
                    Calculator
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hdblist" className={({ isActive }) => (isActive ? "active" : "")}>
                    HDB List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/testing" className={({ isActive }) => (isActive ? "active" : "")}>
                    Testing
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                    Contact
                  </NavLink>
                </li>
                {user ? (
                  <li>
                    <NavLink to="/" onClick={handleLogout}>
                      Log Out
                    </NavLink>
                  </li>
                ) : (
                  <>
                    {/* <li>
                      <NavLink to="/signin" className={({ isActive }) => (isActive ? "active" : "")}>
                        SignIn
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
}

export default Header;