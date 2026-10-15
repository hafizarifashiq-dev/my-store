import { useEffect, useState } from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


function ProductDetails({
  addToCart,
  wishlist,
  toggleWishlist
}) {

  const { id } = useParams();


  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    axios
      .get(
        `https://fakestoreapi.com/products/${id}`
      )

      .then((response) => {

        setProduct(
          response.data
        );

        setLoading(false);

      })

      .catch((error) => {

        console.log(error);

        setError(
          "Failed to load product"
        );

        setLoading(false);

      });

  }, [id]);


  if (loading) {

    return (

      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <CircularProgress />

      </Box>

    );

  }


  if (error) {

    return (

      <Box
        sx={{
          textAlign: "center",
          padding: 8
        }}
      >

        <Typography
          variant="h5"
          color="error"
        >
          {error}
        </Typography>

      </Box>

    );

  }


  if (!product) {

    return null;

  }


  const isInWishlist =
    wishlist.some(
      (item) =>
        item.id === product.id
    );


  return (

    <Box
      sx={{
        maxWidth: 1200,
        margin: "auto",
        padding: {
          xs: 2,
          md: 5
        }
      }}
    >

      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{
          marginBottom: 3,
          textTransform: "none",
          fontWeight: "bold"
        }}
      >
        Back to Products
      </Button>


      <Card
        elevation={0}
        sx={{
          borderRadius: 5,
          border:
            "1px solid #e2e8f0",
          overflow: "hidden"
        }}
      >

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >

          {/* Product Image */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%"
              },
              minHeight: 500,
              backgroundColor:
                "#f8fafc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              padding: 4
            }}
          >

            <Tooltip
              title={
                isInWishlist
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"
              }
            >

              <IconButton
                onClick={() =>
                  toggleWishlist(
                    product
                  )
                }
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  backgroundColor:
                    "white",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.1)"
                }}
              >

                {isInWishlist ? (
                  <FavoriteIcon
                    color="error"
                  />
                ) : (
                  <FavoriteBorderIcon />
                )}

              </IconButton>

            </Tooltip>


            <CardMedia
              component="img"
              image={
                product.image
              }
              alt={
                product.title
              }
              sx={{
                width: "90%",
                height: 450,
                objectFit: "contain"
              }}
            />

          </Box>


          {/* Details */}

          <CardContent
            sx={{
              width: {
                xs: "100%",
                md: "50%"
              },
              padding: {
                xs: 3,
                md: 5
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >

            <Chip
              label={
                product.category
              }
              sx={{
                width: "fit-content",
                marginBottom: 2,
                color: "#2563eb",
                backgroundColor:
                  "#eff6ff",
                fontWeight: "bold"
              }}
            />


            <Typography
              variant="h3"
              sx={{
                fontWeight: "900",
                lineHeight: 1.15,
                marginBottom: 2
              }}
            >
              {product.title}
            </Typography>


            <Typography
              variant="h4"
              sx={{
                color: "#2563eb",
                fontWeight: "900",
                marginBottom: 3
              }}
            >
              $
              {product.price.toFixed(
                2
              )}
            </Typography>


            <Typography
              sx={{
                color: "#64748b",
                lineHeight: 1.8,
                marginBottom: 4
              }}
            >
              {product.description}
            </Typography>


            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap"
              }}
            >

              <Button
                variant="contained"
                size="large"
                startIcon={
                  <ShoppingCartOutlinedIcon />
                }
                onClick={() =>
                  addToCart(
                    product
                  )
                }
                sx={{
                  borderRadius: 3,
                  paddingX: 4,
                  paddingY: 1.5,
                  textTransform:
                    "none",
                  fontWeight: "bold"
                }}
              >
                Add to Cart
              </Button>


              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/cart"
                sx={{
                  borderRadius: 3,
                  paddingX: 4,
                  paddingY: 1.5,
                  textTransform:
                    "none",
                  fontWeight: "bold"
                }}
              >
                View Cart
              </Button>

            </Box>

          </CardContent>

        </Box>

      </Card>

    </Box>

  );
}

export default ProductDetails;