import React, { useState, useEffect } from "react";
import { useAuthentication } from "@/src/components/AuthenticationProvider";
import {
  Stack,
  Typography,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Box,
  Button,
  Popover,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const SidebarFooterAccountPopover: React.FC = () => {
  const { session, signIn, signOut } = useAuthentication();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!session) {
      handleClose();
    }
  }, [session]);

  const handleSignIn = () => {
    handleClose();
    signIn();
  };

  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
          paddingLeft: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt={session?.user?.name || "Guest"}
            src={session?.user?.image || ""}
          >
            {!session?.user?.image && session?.user?.name?.[0]}
          </Avatar>
          <Stack direction="column" sx={{ marginLeft: 2 }}>
            <Typography variant="body2">
              {session?.user?.name || "Guest"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {session?.user?.email || "No account signed in"}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={handleClick}>
          <MoreVertIcon />
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              {session?.user ? (
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={session.user.image}
                  alt={session.user.name}
                >
                  {session.user.name[0]}
                </Avatar>
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>?</Avatar>
              )}
            </ListItemIcon>
            <ListItemText
              primary={session?.user?.name || "Guest"}
              secondary={session?.user?.email || "No account signed in"}
              primaryTypographyProps={{ variant: "body2" }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </MenuItem>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: 1,
            }}
          >
            {session ? (
              <Button variant="contained" color="primary" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            )}
          </Box>
        </MenuList>
      </Popover>
    </Stack>
  );
};
