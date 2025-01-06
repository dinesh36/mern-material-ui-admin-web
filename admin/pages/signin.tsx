import SignInForm from "../module/auth/SignInForm/SignInForm";
import React from "react";
import Header from "../module/layout/Header/Header";
import { Box } from "@mui/material";

const Signin = () => {
  return (
    <Box sx={{ margin: "-8px" }}>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <SignInForm />
      </Box>
    </Box>
  );
};

export default Signin;
