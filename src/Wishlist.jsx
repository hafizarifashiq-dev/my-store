import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

import {
  Link
} from "react-router-dom";


function Wishlist({
  wishlist,
  toggleWishlist,
  addToCart
}) {

  return (

    <Box
      sx={{
        maxWidth: 1400,
        margin: "auto",
        padding: {
          xs: 2,
          md: 5
        }
      }}
    >

      <Box
        sx={{
          textAlign: "center",
          marginBottom: 5
        }}
      >

        <FavoriteIcon
          sx={{
            fontSize: 45,
            color: "#ef4444"
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: "900",
            marginTop: 1
          }}
        >
          My Wishlist
        </Typography>


        <Typography
          sx={{
            color: "text.secondary",
            marginTop: 1
          }}
        >
          Your favorite products in one place.
        </Typography>

      </Box>


      {wishlist.length === 0 ? (

        <Card
          elevation={0}
          sx={{
            textAlign: "center",
            padding: 7,
            borderRadius: 4,
            border:
              "1px solid #e2e8f0"
          }}
        >

          <FavoriteIcon
            sx={{
              fontSize: 80,
              color: "#cbd5e1"
            }}
          />

          <Typography
            variant="h5"
            sx={{
              marginTop: 2,
              fontWeight: "bold"
            }}
          >
            Your Wishlist is Empty
          </Typography>


          <Typography
            sx={{
              marginTop: 1,
              color: "text.secondary"
            }}
          >
            Save products you love for later.
          </Typography>


          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{
              marginTop: 3,
              borderRadius: 3,
              paddingX: 4,
              textTransform: "none",
              fontWeight: "bold"
            }}
          >
            Browse Products
          </Button>

        </Card>

      ) : (

        <Grid
          container
          spacing={3}
        >

          {wishlist.map((product) => (

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.id}
            >

              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  border:
                    "1px solid #e2e8f0",
                  overflow: "hidden",
                  transition:
                    "all 0.3s ease",
                  "&:hover": {
                    transform:
                      "translateY(-6px)",
                    boxShadow:
                      "0 18px 35px rgba(15,23,42,0.1)"
                  }
                }}
              >

                <Box
                  sx={{
                    backgroundColor:
                      "#f8fafc",
                    position: "relative",
                    padding: 2
                  }}
                >

                  <Tooltip title="Remove">

                    <IconButton
                      onClick={() =>
                        toggleWishlist(
                          product
                        )
                      }
                      sx={{
                        position:
                          "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 2,
                        backgroundColor:
                          "white"
                      }}
                    >

                      <DeleteOutlineIcon
                        color="error"
                      />

                    </IconButton>

                  </Tooltip>


                  <CardMedia
                    component="img"
                    height="230"
                    image={
                      product.image
                    }
                    alt={
                      product.title
                    }
                    sx={{
                      objectFit:
                        "contain"
                    }}
                  />

                </Box>


                <CardContent
                  sx={{
                    flexGrow: 1,
                    padding: 3
                  }}
                >

                  <Chip
                    label={
                      product.category
                    }
                    size="small"
                    sx={{
                      marginBottom: 1.5,
                      color: "#2563eb",
                      backgroundColor:
                        "#eff6ff"
                    }}
                  />


                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      display:
                        "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient:
                        "vertical",
                      overflow: "hidden",
                      minHeight: 56
                    }}
                  >
                    {product.title}
                  </Typography>


                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: 2,
                      fontWeight: "900",
                      color: "#2563eb"
                    }}
                  >
                    $
                    {product.price.toFixed(
                      2
                    )}
                  </Typography>


                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      marginTop: 2
                    }}
                  >

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() =>
                        addToCart(
                          product
                        )
                      }
                      sx={{
                        borderRadius: 2.5,
                        textTransform:
                          "none",
                        fontWeight: "bold"
                      }}
                    >
                      Add to Cart
                    </Button>


                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/product/${product.id}`}
                      sx={{
                        borderRadius: 2.5,
                        textTransform:
                          "none",
                        fontWeight: "bold"
                      }}
                    >
                      View
                    </Button>

                  </Box>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      )}

    </Box>

  );
}

export default Wishlist;