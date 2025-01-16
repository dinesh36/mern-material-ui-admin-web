import React from "react";
import {Typography, Box} from "@mui/material";
import {homeContentTitle} from "@/module/home/HomePage.style";

const Dashboard: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3.75}
            mb={3.75}
        >
            <Typography variant="h4" sx={homeContentTitle}>
                Welcome to the Dashboard Page
            </Typography>
        </Box>
    );
};

export default Dashboard;
