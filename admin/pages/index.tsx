import React from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mern-material-ui-admin-web/common";
import { Box } from "@mui/system";

export default function Home() {
  return (
    <Stack spacing={2} direction="row">
      <Box sx={{ color: "black", textAlign: "center" }}>
        <h1>Welcome to the page!</h1>
          <Button />
      </Box>
    </Stack>
  );
}
