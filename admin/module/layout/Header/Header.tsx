import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { AppIcon } from "@mern/ui-shared";
import { containerStyles, MainStyles } from "./Header.style";

const Header: React.FC = () => {
  return (
    <Box sx={MainStyles}>
      <Link sx={containerStyles} href="/">
        <AppIcon />
        <Typography fontWeight="bold">MERN App</Typography>
      </Link>
    </Box>
  );
};

export default Header;
