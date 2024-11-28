import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Home() {
  return (
      <Stack spacing={2} direction="row">
        <Button variant="outlined" color="secondary">
         Client Home page
        </Button>
      </Stack>
  );
}
