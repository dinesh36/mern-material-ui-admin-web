import React, { useEffect, useMemo, useState } from "react";
import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { useRouter } from "next/router";
import { User } from "@/models/auth.type";
import { getUserDetails } from "@/module/services/auth-services";
import { useTheme } from "@mui/system";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
  headerCheckbox: false,
};

const UserGrid = () => {
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();

  // Fetch user details from the API
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getUserDetails();
      setUserDetails(fetchedUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const columnDefs: ColDef[] = [
    {
      field: "profileImage",
      filter: false,
      headerName: "Profile Image",
      cellRenderer: (props: any) => (
        <Avatar
          style={{
            height: 32,
            width: 32,
            marginTop: "5px",
          }}
          src={props.data.profileImage || "default_image_path.jpg"}
          alt="User Avatar"
        />
      ),
    },
    {
      field: "name",
      headerName: "Username",
      flex: 1,
      cellEditor: "agSelectCellEditor",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "edit",
      filter: false,
      headerName: "Actions",
      cellRenderer: (props: any) => {
        return (
          <IconButton onClick={() => handleEditClick(props.data)}>
            <ModeTwoToneIcon />
          </IconButton>
        );
      },
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
    }),
    [],
  );

  const gridTheme = useMemo(
    () =>
      theme.palette.mode === "dark"
        ? "ag-theme-alpine-dark"
        : "ag-theme-alpine",
    [theme.palette.mode],
  );

  const handleEditClick = (userDetail: User) => {
    sessionStorage.setItem("editUser", JSON.stringify(userDetail));
    router.push("/edit-profile");
  };

  useEffect(() => {
    const agGridElement = document.querySelector(`.${gridTheme}`) as HTMLElement;
    if (agGridElement) {
      if (theme.palette.mode === "dark") {
        agGridElement.style.setProperty('--ag-background-color', '#121212');
        agGridElement.style.setProperty('--ag-header-background-color', '#121212');
        agGridElement.style.setProperty('--ag-odd-row-background-color', 'transparent');
      } else {
        agGridElement.style.setProperty('--ag-background-color', '#ffffff');
        agGridElement.style.setProperty('--ag-header-background-color', '#ffffff');
        agGridElement.style.setProperty('--ag-odd-row-background-color', 'transparent');
      }
    }
  }, [theme.palette.mode, gridTheme]);


  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 700,
          marginTop: "26px",
          fontSize: "24px",
        }}
      >
        User Details
      </Typography>
      <Box
        className={gridTheme}
        style={{
          height: 600,
          width: "100%",
          padding: "50px",
          paddingTop: "26px",
        }}
      >
        <AgGridReact
          rowData={userDetails}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </Box>
    </Box>
  );
};

export default UserGrid;
