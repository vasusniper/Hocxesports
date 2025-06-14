import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const navItems = [
  { text: "Home", path: "/" },
  { text: "Tournaments", path: "/tournaments" },
  { text: "Contact", path: "/contact" },
  { text: "About", path: "/about" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [drawerAnchor, setDrawerAnchor] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);
  useEffect(() => {
    if (user) {
      setShowSnackbar(true);
    }
  }, [user]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const handleDrawerProfileClick = (e) => setDrawerAnchor(e.currentTarget);
  const handleDrawerProfileClose = () => setDrawerAnchor(null);

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
    setLogoutDialogOpen(false);
    handleMenuClose();
    handleDrawerProfileClose();
  };

  const drawer = (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Box sx={{ mb: 2 }}>
        {!user ? (
          <Button
            href="http://localhost:5000/auth/google"
            variant="outlined"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            Login
          </Button>
        ) : (
          <>
            <IconButton onClick={handleDrawerProfileClick}>
              <Avatar
                src={user.user.image}
                alt="profile"
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>
            <Menu
              anchorEl={drawerAnchor}
              open={Boolean(drawerAnchor)}
              onClose={handleDrawerProfileClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MenuItem disabled>{user.user.username}</MenuItem>
              <MenuItem disabled>{user.user.email}</MenuItem>
              <MenuItem onClick={() => setLogoutDialogOpen(true)}>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
   <Snackbar
  open={showSnackbar}
  autoHideDuration={2000}
  onClose={() => setShowSnackbar(false)}
  message={`Welcome ${user?.user.username}  Login Successful`}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
   ContentProps={{
    sx: {
      mt: "10rem",          
      textAlign: "center", 
      fontSize: "0.875rem",
      backgroundColor: "transparent",
      color: "green",
      fontWeight: 500,
    },
  }}
/>

      <AppBar
        component="nav"
        sx={{
          px: { xs: 2, sm: 6, md: 12 },
          backgroundColor: "#133E87",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, sm: 80, md: 50 },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              letterSpacing: "4px",
              fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.2rem" },
              cursor: "pointer",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            HocxGaming
          </Typography>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
                  fontWeight: "600",
                  px: { xs: 1, sm: 2, md: 3 },
                  textTransform: "uppercase",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
            {user ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar
                    src={user.user.image}
                    alt="profile"
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleMenuClose}
                >
                  <MenuItem disabled>{user.user.username}</MenuItem>
                  <MenuItem disabled>{user.user.email}</MenuItem>
                  <MenuItem onClick={() => setLogoutDialogOpen(true)}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                href="http://localhost:5000/auth/google"
                sx={{
                  color: "#fff",
                  fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
                  fontWeight: "600",
                  px: { xs: 1, sm: 2, md: 3 },
                  textTransform: "uppercase",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>

          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              color: "#FFF",
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
