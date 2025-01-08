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
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { getUserDetails } from "@/module/services/auth-services";
import { useRouter } from "next/router";

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

const UserTable: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userDetails, setUserDetails] = React.useState<User[]>([]);
  const router = useRouter();

  const fetchUserDetails = async () => {
    try {
      const fetchedUsers = await getUserDetails();
      console.log(fetchedUsers);
      setUserDetails(fetchedUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDetails.map((userDetail) => (
            <TableRow key={userDetail._id}>
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
              <TableCell>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditClick(userDetail)}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
