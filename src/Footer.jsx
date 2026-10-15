import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

import StorefrontIcon from "@mui/icons-material/Storefront";


function Footer() {

  return (

    <Box
      component="footer"
      sx={{
        backgroundColor: "#0f172a",
        color: "white",
        marginTop: "auto"
      }}
    >

      <Box
        sx={{
          maxWidth: 1400,
          margin: "auto",
          padding: {
            xs: "50px 20px",
            md: "60px 40px"
          }
        }}
      >

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "2fr 1fr 1fr",
              md: "2fr 1fr 1fr"
            },
            gap: 5
          }}
        >

          {/* BRAND */}

          <Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >

              <StorefrontIcon
                sx={{
                  fontSize: 32,
                  color: "#60a5fa"
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900
                }}
              >
                My
                <Box
                  component="span"
                  sx={{
                    color: "#60a5fa"
                  }}
                >
                  Store
                </Box>
              </Typography>

            </Box>


            <Typography
              sx={{
                marginTop: 2,
                color: "#94a3b8",
                maxWidth: 430,
                lineHeight: 1.8
              }}
            >
              Your simple and convenient online
              shopping destination. Discover
              products from different categories
              all in one place.
            </Typography>

          </Box>


          {/* QUICK LINKS */}

          <Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: 2
              }}
            >
              Quick Links
            </Typography>


            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.2
              }}
            >

              <Link
                href="/"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  "&:hover": {
                    color: "#60a5fa"
                  }
                }}
              >
                Home
              </Link>


              <Link
                href="/products"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  "&:hover": {
                    color: "#60a5fa"
                  }
                }}
              >
                Products
              </Link>


              <Link
                href="/wishlist"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  "&:hover": {
                    color: "#60a5fa"
                  }
                }}
              >
                Wishlist
              </Link>


              <Link
                href="/cart"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  "&:hover": {
                    color: "#60a5fa"
                  }
                }}
              >
                Cart
              </Link>

            </Box>

          </Box>


          {/* ACCOUNT */}

          <Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: 2
              }}
            >
              Account
            </Typography>


            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.2
              }}
            >

              <Link
                href="/signin"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  "&:hover": {
                    color: "#60a5fa"
                  }
                }}
              >
                Sign In
              </Link>


              <Link
                href="/signup"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  "&:hover": {
                    color: "#60a5fa"
                  }
                }}
              >
                Create Account
              </Link>

            </Box>

          </Box>

        </Box>


        <Divider
          sx={{
            marginY: 5,
            borderColor:
              "rgba(255,255,255,0.1)"
          }}
        />


        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap"
          }}
        >

          <Typography
            variant="body2"
            sx={{
              color: "#64748b"
            }}
          >
            © {new Date().getFullYear()} MyStore.
            All rights reserved.
          </Typography>


          <Typography
            variant="body2"
            sx={{
              color: "#94a3b8"
            }}
          >
            Happy Shopping 🛍️
          </Typography>

        </Box>

      </Box>

    </Box>

  );
}


export default Footer;