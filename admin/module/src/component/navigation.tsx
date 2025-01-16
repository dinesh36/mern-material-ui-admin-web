import { ReactNode } from "react";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export interface NavigationItem {
    kind?: "page" | "header";
    title: string;
    segment?: string;
    icon?: ReactNode;
    children?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
    {
        kind: "header",
        title: "Dashboard",
    },
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <DashboardIcon />,
    },
    {
        segment: "users",
        title: "Users",
        icon: <PersonOutlineOutlinedIcon />,
    },
];
