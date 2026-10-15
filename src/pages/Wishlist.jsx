import {
  Container,
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import {
  Link,
} from "react-router-dom";

import ProductCard from "../components/ProductCard";

function Wishlist({
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  if (wishlist.length === 0) {
    return (
      <Container
        sx={{ py: 12 }}
      >
        <Stack
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="h4"
            fontWeight={800}
          >
            Your Wishlist is Empty
          </Typography>

          <Button
            component={Link}
            to="/products"
            variant="contained"
          >
            Browse Products
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 6 }}
    >
      <Typography
        variant="h3"
        fontWeight={900}
        sx={{ mb: 4 }}
      >
        My Wishlist
      </Typography>

      <Grid
        container
        spacing={3}
      >
        {wishlist.map(
          (product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
            >
              <ProductCard
                product={product}
                addToCart={
                  addToCart
                }
                isWishlisted
                toggleWishlist={
                  toggleWishlist
                }
              />
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
}

export default Wishlist;