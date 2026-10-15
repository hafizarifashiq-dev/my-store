import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Stack,
  Box,
  Chip,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://placehold.co/600x400?text=No+Image";

function ProductCard({
  product,
  addToCart,
  isWishlisted = false,
  toggleWishlist,
}) {
  const image =
    product.image || FALLBACK_IMAGE;

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        boxShadow:
          "0 4px 14px rgba(15, 23, 42, 0.06)",
        transition:
          "all 0.25s ease",

        "&:hover": {
          transform:
            "translateY(-6px)",
          boxShadow:
            "0 14px 30px rgba(15, 23, 42, 0.12)",
        },
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#f7faf8",
          borderBottom:
            "1px solid #edf1ee",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={product.title}
          sx={{
            width: "100%",
            height: 210,
            objectFit: "contain",
            p: 2.5,
          }}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              FALLBACK_IMAGE;
          }}
        />

        {/* WISHLIST */}
        <IconButton
          onClick={() =>
            toggleWishlist(product)
          }
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor:
              "rgba(255,255,255,0.95)",
            boxShadow:
              "0 3px 10px rgba(0,0,0,0.10)",

            "&:hover": {
              backgroundColor: "#ffffff",
            },
          }}
        >
          {isWishlisted ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* CATEGORY */}
        <Box
          sx={{
            mb: 1.2,
          }}
        >
          <Chip
            label={
              product.category ||
              "Product"
            }
            size="small"
            sx={{
              fontWeight: 700,
              maxWidth: "100%",
            }}
          />
        </Box>

        {/* TITLE */}
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 58,
          }}
        >
          {product.title}
        </Typography>

        {/* SELLER */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            mt: 1.5,
          }}
        >
          <StorefrontOutlinedIcon
            fontSize="small"
            color="action"
          />

          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
          >
            {product.ownerName ||
              "MyStore"}
          </Typography>
        </Stack>

        {/* PRICE */}
        <Typography
          variant="h5"
          fontWeight={900}
          sx={{
            color: "#198754",
            mt: 1.5,
          }}
        >
          $
          {Number(
            product.price || 0
          ).toFixed(2)}
        </Typography>

        {/* BUTTONS */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mt: "auto",
            pt: 2,
          }}
        >
          <Button
            component={Link}
            to={`/products/${product.id}`}
            variant="outlined"
            startIcon={
              <VisibilityIcon />
            }
            sx={{
              flex: 1,
              fontWeight: 700,
            }}
          >
            View
          </Button>

          <Button
            variant="contained"
            startIcon={
              <ShoppingCartIcon />
            }
            onClick={() =>
              addToCart(product)
            }
            sx={{
              flex: 1,
              fontWeight: 700,
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductCard;