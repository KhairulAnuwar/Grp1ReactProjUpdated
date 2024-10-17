import React from "react";

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
           <Link href="/HdbList" underline="none">
            HDB List
          </Link>
          <Link href="/Favorite" underline="none">
            Favorite
          </Link>
          <Link href="/Salesperson" underline="none">
            Sales Person
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
