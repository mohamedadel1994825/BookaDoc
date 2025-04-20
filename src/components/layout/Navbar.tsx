"use client";

import { RootState } from "@/store";
import { loadUserAppointments } from "@/store/slices/appointmentsSlice";
import { logout } from "@/store/slices/authSlice";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const navItems = [
  { label: "Home", href: "/", icon: <HomeIcon /> },
  { label: "About", href: "/about", icon: <InfoIcon /> },
  { label: "Contact", href: "/contact", icon: <MailIcon /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Check if user information is available
  const hasUser = isAuthenticated && user;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(loadUserAppointments());
    handleCloseUserMenu();
  };

  // Close drawer when navigating to a new page
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Load user data from localStorage if possible
  useEffect(() => {
    // If authenticated but no user data, try to reload from localStorage
    if (isAuthenticated && !user) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          // If we can get user data from localStorage, we could
          // dispatch loginSuccess here, but that might cause a loop
          // Instead, we'll just force a refresh of the page
          window.location.reload();
        } catch (e) {
          console.error("Error loading user data:", e);
        }
      }
    }
  }, [isAuthenticated, user]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        InVitro Capital Doctors
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                textAlign: "center",
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/appointments"
                selected={pathname === "/appointments"}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.light",
                    color: "white",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="My Appointments" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/login"
              selected={pathname === "/login"}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            InVitro Capital Doctors
          </Typography>

          {/* Mobile logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            InVitro Capital
          </Typography>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                sx={{
                  my: 2,
                  mx: 1,
                  color: "text.primary",
                  display: "block",
                  ...(pathname === item.href && {
                    color: "primary.main",
                    fontWeight: "bold",
                  }),
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* User menu (desktop) */}
          <Box sx={{ flexGrow: 0 }}>
            {hasUser ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.name || "User"}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    component={Link}
                    href="/appointments"
                    onClick={handleCloseUserMenu}
                  >
                    <ListItemIcon>
                      <CalendarMonthIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">My Appointments</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                href="/login"
                startIcon={<LoginIcon />}
                variant="outlined"
                sx={{
                  ...(pathname === "/login" && {
                    borderColor: "primary.main",
                    color: "primary.main",
                  }),
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
