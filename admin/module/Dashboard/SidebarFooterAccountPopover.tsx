import React, { useState } from "react";
import { useSelector } from "react-redux";
import RootState from "@/module/redux/store";
import {
  Avatar,
  Divider,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  IconButton,
  Menu,
} from "@mui/material";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {User} from "@/models/auth.type";

interface RootState {
  auth: {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      color?: string;
    };
    isAuthenticated: boolean;
  };
}

function SidebarFooterAccountPopover() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { profileImage } = useSelector<RootState>(
        (state: RootState) => state.auth.user
    ) as User;
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.clear();
    router.push("/signin");
    handleClose();
  };

  if (!user) return null;

  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Account
      </Typography>
      <MenuList>
        <MenuItem
          key={user.id}
          component="button"
          sx={{
            justifyContent: "flex-start",
            width: "100%",
            columnGap: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: "0.95rem",
              bgcolor: user.color || "primary.main",
            }}
            src={profileImage || "default_image_path.jpg"}
            alt={user.name || "User Avatar"}
          >
            {user.name?.[0]}
          </Avatar>
          <Stack sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ marginRight: "auto" }}>
              {user.name}
            </Typography>
            <Typography variant="caption">{user.email}</Typography>
          </Stack>
          <IconButton onClick={handleClick} sx={{ marginLeft: "auto" }}>
            <MoreVertIcon />
          </IconButton>
        </MenuItem>
      </MenuList>
      <Divider />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 200,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Log out</MenuItem>
      </Menu>
    </Stack>
  );
}

export default SidebarFooterAccountPopover;
