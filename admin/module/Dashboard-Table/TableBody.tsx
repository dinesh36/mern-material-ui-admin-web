import React from "react";
import {
  TableRow,
  TableCell,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface TableBodyComponentProps {
  userDetails: Array<any>;
  columnVisibility: {
    profileImage: boolean;
    name: boolean;
    email: boolean;
  };
  handleEditClick: (userDetail: any) => void;
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = ({
  userDetails,
  columnVisibility,
  handleEditClick,
}) => (
  <>
    {userDetails.map((userDetail) => (
      <TableRow key={userDetail._id}>
        {columnVisibility.profileImage && (
          <TableCell>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={userDetail.profileImage || "default_image_path.jpg"}
              alt={userDetail.name || "User Avatar"}
            />
          </TableCell>
        )}
        {columnVisibility.name && (
          <TableCell>
            <Typography variant="body2">{userDetail.name}</Typography>
          </TableCell>
        )}
        {columnVisibility.email && <TableCell>{userDetail.email}</TableCell>}
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
  </>
);

export default TableBodyComponent;
