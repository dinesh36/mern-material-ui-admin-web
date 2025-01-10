import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/module/redux/store";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Box,
  TextField,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { getUserDetails } from "@/module/services/auth-services";
import { useRouter } from "next/router";
import ColumnFilterDialog from "@/module/Dashboard-Table/ColumnFilterDialog";
import TableHeader from "@/module/Dashboard-Table/TableHeader";
import TableBodyComponent from "@/module/Dashboard-Table/TableBody";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

const UserTable: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [sortField, setSortField] = useState<"name" | "email">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    email: true,
    profileImage: true,
  });
  const [columnFilterOpen, setColumnFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<"name" | "email">("name");
  const [filterValue, setFilterValue] = useState("");
  const router = useRouter();

  const fetchUserDetails = async () => {
    try {
      const fetchedUsers = await getUserDetails();
      setUserDetails(fetchedUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditClick = (userDetail: User) => {
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

  const handleSort = (field: "name" | "email") => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortField(field);
    setSortDirection(isAsc ? "desc" : "asc");
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const filteredAndSortedUsers = userDetails
    .filter((user) => {
      if (!filterValue) return true;
      return user[filterType].toLowerCase().includes(filterValue.toLowerCase());
    })
    .sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortField === "email") {
        return sortDirection === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      }
      return 0;
    });

  if (!user) return null;

  return (
    <Box
      sx={{
        padding: "20px",
        paddingLeft: "100px",
        paddingRight: "100px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 700,
          marginBottom: "16px",
          fontSize: "24px",
        }}
      >
        User Details
      </Typography>
      <Box
        sx={{
          border: "0.5px groove lightgray",
          padding: "20px",
          paddingBottom: "0",
        }}
      >
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          marginBottom="16px"
          width="100%"
        >
          <TextField
            select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "name" | "email")}
            size="small"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </TextField>
          <TextField
            label="Search"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <IconButton onClick={() => setColumnFilterOpen(true)}>
            <SettingsOutlinedIcon />
          </IconButton>
        </Box>

        <ColumnFilterDialog
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          columnFilterOpen={columnFilterOpen}
          setColumnFilterOpen={setColumnFilterOpen}
        />

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table aria-label="user table">
            <TableHead>
              <TableHeader
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
                setColumnFilterOpen={setColumnFilterOpen}
              />
            </TableHead>
            <TableBody>
              <TableBodyComponent
                userDetails={filteredAndSortedUsers}
                columnVisibility={columnVisibility}
                handleEditClick={handleEditClick}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UserTable;
