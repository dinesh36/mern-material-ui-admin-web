import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/module/redux/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
} from "@mui/material";
import { User } from "@/models/auth.type";
import { getUserDetails } from "@/module/services/auth-services";

const UserTable: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userDetails, setUserDetails] = React.useState<User[]>([]);

  const fetchUserDetails = async () => {
    try {
      const fetchedUsers = await getUserDetails();
      setUserDetails(fetchedUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  React.useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!user) return null;

  return (
      <TableContainer>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Profile Image</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDetails.map((userDetail) => (
                <TableRow key={userDetail.id}>
                  <TableCell>
                    <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={userDetail.profileImage || "default_image_path.jpg"}
                        alt={userDetail.name || "User Avatar"}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{userDetail.name}</Typography>
                  </TableCell>
                  <TableCell>{userDetail.email}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default UserTable;
