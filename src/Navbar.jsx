import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import {
  Link
} from "react-router-dom";


function Navbar({
  cart,
  wishlist
}) {

  const cartCount =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  return (

    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        backgroundColor:
          "rgba(255,255,255,0.95)",
        backdropFilter:
          "blur(12px)",
        borderBottom:
          "1px solid #e2e8f0"
      }}
    >

      <Toolbar
        sx={{
          minHeight: {
            xs: 70,
            md: 76
          },
          maxWidth: 1400,
          width: "100%",
          margin: "auto"
        }}
      >

        {/* LOGO */}

        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "#0f172a",
            flexGrow: 1
          }}
        >

          <StorefrontIcon
            sx={{
              fontSize: 34,
              color: "#2563eb"
            }}
          />


          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              letterSpacing:
                "-0.5px"
            }}
          >
            My
            <span
              style={{
                color: "#2563eb"
              }}
            >
              Store
            </span>
          </Typography>

        </Box>


        {/* DESKTOP MENU */}

        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex"
            },
            alignItems: "center",
            gap: 0.5
          }}
        >

          <Button
            component={Link}
            to="/"
            sx={{
              color: "#334155",
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Home
          </Button>


          <Button
            component={Link}
            to="/products"
            sx={{
              color: "#334155",
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Products
          </Button>


          <Button
            component={Link}
            to="/my-products"
            startIcon={
              <Inventory2OutlinedIcon />
            }
            sx={{
              color: "#334155",
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            My Products
          </Button>


          <Button
            component={Link}
            to="/admin/products"
            startIcon={
              <AdminPanelSettingsOutlinedIcon />
            }
            sx={{
              color: "#334155",
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Admin
          </Button>


          <Button
            component={Link}
            to="/wishlist"
            startIcon={
              <Badge
                badgeContent={
                  wishlist.length
                }
                color="error"
              >
                <FavoriteBorderIcon />
              </Badge>
            }
            sx={{
              color: "#334155",
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Wishlist
          </Button>


          <Button
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
            sx={{
              color: "#334155",
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Cart
          </Button>


          <Button
            component={Link}
            to="/signin"
            startIcon={
              <LoginIcon />
            }
            sx={{
              color: "#334155",
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Sign In
          </Button>


          <Button
            variant="contained"
            component={Link}
            to="/signup"
            sx={{
              marginLeft: 1,
              borderRadius: 2.5,
              paddingX: 2.5,
              fontWeight: "bold",
              textTransform: "none"
            }}
          >
            Sign Up
          </Button>

        </Box>


        {/* MOBILE MENU */}

        <Box
          sx={{
            display: {
              xs: "flex",
              lg: "none"
            },
            alignItems: "center",
            gap: 0.3
          }}
        >

          <Tooltip
            title="Products"
          >
            <IconButton
              component={Link}
              to="/products"
            >
              <StorefrontIcon />
            </IconButton>
          </Tooltip>


          <Tooltip
            title="My Products"
          >
            <IconButton
              component={Link}
              to="/my-products"
            >
              <Inventory2OutlinedIcon />
            </IconButton>
          </Tooltip>


          <Tooltip
            title="Admin"
          >
            <IconButton
              component={Link}
              to="/admin/products"
            >
              <AdminPanelSettingsOutlinedIcon />
            </IconButton>
          </Tooltip>


          <Tooltip
            title="Wishlist"
          >
            <IconButton
              component={Link}
              to="/wishlist"
            >
              <Badge
                badgeContent={
                  wishlist.length
                }
                color="error"
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
          </Tooltip>


          <Tooltip
            title="Cart"
          >
            <IconButton
              component={Link}
              to="/cart"
            >
              <Badge
                badgeContent={
                  cartCount
                }
                color="error"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>


          <Tooltip
            title="Sign In"
          >
            <IconButton
              component={Link}
              to="/signin"
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>

        </Box>

      </Toolbar>

    </AppBar>

  );

}

export default Navbar;