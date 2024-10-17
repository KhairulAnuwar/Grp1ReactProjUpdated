import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Link } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "#1A1A19",
          color: "white",
          p: 3,
        }}
      >
      

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            "& a": {
              color: "white",
              textDecoration: "none",
              mx: 2,
              fontSize: "1.2rem",
              transition: "color 400ms",
            },
            "& a:hover": {
              color: "goldenrod",
            },
          }}
        >
          <Link href="/FCalculator" underline="none">
            Calculator
          </Link>
           <Link href="/Favorite" underline="none">
            Favorite
          </Link>
          <Link href="/Favorite" underline="none">
            Favorite
          </Link>
        </Box>

  {/* Social Media Icons */}
  <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
            "& svg": {
              fontSize: "60px",
              cursor: "pointer",
              mr: 2,
            },
            "& svg:hover": {
              color: "goldenrod",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
        >
        </Box>

        
      </Box>
    </>
  );
};

export default Footer;
