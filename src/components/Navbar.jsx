import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../context/AuthContext";

function Navbar({
  cartCount = 0,
  wishlistCount = 0,
}) {
  const navigate =
    useNavigate();

  const {
    currentUser,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            gap: 1,
            minHeight: 70,
          }}
        >
          <Typography
            component={Link}
            to="/"
            variant="h5"
            fontWeight={900}
            sx={{
              color: "inherit",
              textDecoration:
                "none",
              mr: 2,
            }}
          >
            MyStore
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems:
                "center",
              gap: 0.5,
              flexGrow: 1,
              overflowX:
                "auto",
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
            >
              Home
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/products"
            >
              Products
            </Button>

            {currentUser?.role ===
              "seller" &&
              currentUser?.sellerStatus ===
                "approved" && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/seller"
                  startIcon={
                    <StorefrontOutlinedIcon />
                  }
                >
                  My Store
                </Button>
              )}

            {currentUser?.role ===
              "admin" && (
              <Button
                color="inherit"
                component={Link}
                to="/admin"
                startIcon={
                  <AdminPanelSettingsOutlinedIcon />
                }
              >
                Admin
              </Button>
            )}

            <Button
              color="inherit"
              component={Link}
              to="/wishlist"
              startIcon={
                <Badge
                  badgeContent={
                    wishlistCount
                  }
                  color="error"
                >
                  <FavoriteBorderIcon />
                </Badge>
              }
            >
              Wishlist
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/cart"
              startIcon={
                <Badge
                  badgeContent={
                    cartCount
                  }
                  color="error"
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              }
            >
              Cart
            </Button>
          </Box>

          {!currentUser ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/signin"
              >
                Sign In
              </Button>

              <Button
                color="inherit"
                variant="outlined"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                  fontSize: 14,
                  whiteSpace:
                    "nowrap",
                }}
              >
                {currentUser.name}
              </Typography>

              <Button
                color="inherit"
                onClick={
                  handleLogout
                }
                startIcon={
                  <LogoutIcon />
                }
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;