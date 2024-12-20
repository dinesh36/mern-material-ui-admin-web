import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthentication } from "@/src/components/AuthenticationProvider";
import Header from "../src/components/Header/Header";

const LionPage = () => {
  const { session, logIn } = useAuthentication();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSignIn = () => {
    logIn();
    router.push("/dashboard");
  };

  return (
    <>
      <Header />
      <Box sx={{ textAlign: "center", mt: "330px" }}>
        <Typography variant="h4">Welcome to the LogIn page!</Typography>
        <Box sx={{ mt: "15px" }}>
          <Button
            sx={{
              backgroundColor: "dodgerblue",
            }}
            variant="contained"
            color="primary"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LionPage;
