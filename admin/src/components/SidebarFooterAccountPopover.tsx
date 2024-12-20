import React, { useState } from "react";
import { useAuthentication } from "@/src/components/AuthenticationProvider";
import { Stack, Typography, Box, Avatar, Button, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";

export const SidebarFooterAccountPopover: React.FC = () => {
  const { session, logIn, signOut } = useAuthentication();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    handleClose();
    signOut({ redirect: true });
    await router.push("/signin");
  };

  const handleSignIn = () => {
    handleClose();
    logIn(); // Log in
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
        {session && session.user ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt={session.user.name}
              src={session.user.image || ""}
            />
            <Stack direction="column" sx={{ marginLeft: 2 }}>
              <Typography variant="body2">{session.user.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {session.user.email}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSignIn}>
            Sign In
          </Button>
        )}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 1,
          }}
        >
          {session ? (
            <Button variant="contained" color="primary" onClick={handleSignOut}>
              Log Out
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSignIn}>
              Log In
            </Button>
          )}
        </Box>
      </Popover>
    </Stack>
  );
};

export default SidebarFooterAccountPopover;
