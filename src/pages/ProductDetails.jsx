import {
  useMemo,
} from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  Link,
  useParams,
} from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FALLBACK_IMAGE =
  "https://placehold.co/600x500?text=No+Image";

function ProductDetails({
  products,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const { id } =
    useParams();

  const product =
    useMemo(
      () =>
        products.find(
          (item) =>
            String(item.id) ===
            String(id)
        ),
      [products, id]
    );

  if (!product) {
    return (
      <Container
        sx={{ py: 10 }}
      >
        <Alert severity="error">
          Product not found.
        </Alert>
      </Container>
    );
  }

  const isWishlisted =
    wishlist.some(
      (item) =>
        String(item.id) ===
        String(product.id)
    );

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 7 }}
    >
      <Grid
        container
        spacing={6}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Box
            sx={{
              height: {
                xs: 350,
                md: 500,
              },
              backgroundColor:
                "#f7f7f7",
              borderRadius: 4,
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={
                product.image ||
                FALLBACK_IMAGE
              }
              alt={product.title}
              onError={(event) => {
                event.currentTarget.src =
                  FALLBACK_IMAGE;
              }}
              sx={{
                width: "100%",
                height: "100%",
                objectFit:
                  "contain",
                p: 4,
              }}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          <Stack spacing={2.5}>
            <Typography
              color="text.secondary"
              sx={{
                textTransform:
                  "capitalize",
              }}
            >
              {product.category}
            </Typography>

            <Typography
              variant="h3"
              fontWeight={900}
            >
              {product.title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={800}
            >
              $
              {Number(
                product.price
              ).toFixed(2)}
            </Typography>

            <Typography color="text.secondary">
              Sold by:{" "}
              <strong>
                {product.ownerName ||
                  "MyStore"}
              </strong>
            </Typography>

            <Typography
              sx={{
                lineHeight: 1.8,
              }}
            >
              {
                product.description
              }
            </Typography>

            <Stack
              direction="row"
              spacing={2}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  addToCart(
                    product
                  )
                }
                startIcon={
                  <ShoppingCartIcon />
                }
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() =>
                  toggleWishlist(
                    product
                  )
                }
                startIcon={
                  isWishlisted ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )
                }
              >
                {isWishlisted
                  ? "Saved"
                  : "Wishlist"}
              </Button>
            </Stack>

            <Button
              component={Link}
              to="/products"
              sx={{
                alignSelf:
                  "flex-start",
              }}
            >
              ← Back to Products
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetails;