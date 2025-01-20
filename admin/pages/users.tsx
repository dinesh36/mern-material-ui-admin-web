import React, { useEffect, useMemo, useState } from "react";
import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { useRouter } from "next/router";
import { User } from "@/models/auth.type";
import { getUserDetails } from "@/module/services/auth-services";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
  headerCheckbox: false,
};

const UserGrid = () => {
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Use Next.js useRouter

  // Fetch user details from the API
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getUserDetails();
      console.log(fetchedUsers);
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
      cellRenderer: (props: any) => {
        return (
          <Avatar
            style={{
              height: 32,
              width: 32,
              marginTop: "5px",
            }}
            src={props.data.profileImage || "default_image_path.jpg"}
            alt="User Avatar"
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Username",
      flex: 1,
      editable: true,
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

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  const handleEditClick = (userDetail: User) => {
    console.log("Editing user details:", userDetail);
    router.push({
      pathname: "/edit-profile",
      query: {
        userId: userDetail._id,
        name: userDetail.name,
        email: userDetail.email,
        profileImage: userDetail.profileImage,
      },
    });
  };

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
