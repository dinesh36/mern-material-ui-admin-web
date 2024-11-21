import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Home() {
  return (
      <Stack spacing={2} direction="row">
          <h1 color="primary">
              Hello Admin
          </h1>

          <Button variant="outlined" color="secondary">
              Hello Admin
          </Button>
      </Stack>
  );
}
