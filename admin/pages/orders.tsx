import React from "react";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

const OrderPage = () => {
  const orders = [
    { id: 1, name: "Order 1" },
    { id: 2, name: "Order 2" },
    { id: 3, name: "Order 3" },
  ];

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
        {orders.map((order) => (
          <Button key={order.id} sx={{ padding: "10px 20px" }}>
            {order.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default OrderPage;
