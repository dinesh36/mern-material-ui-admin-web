import React from "react";
import Stack from "@mui/material/Stack";
import { Button } from '@mern/ui-shared';

export default function Home() {
  return (
      <Stack spacing={2} direction="row">
          <h1>This is admin page</h1>
          <Button />
      </Stack>
  );
}
