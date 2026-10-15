import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../context/AuthContext";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const cartUserKey =
    currentUser?.id
      ? String(currentUser.id)
      : "guest";

  const cart = useSelector(
    (state) =>
      state.cart.cartsByUser[cartUserKey] || []
  );

  const updateQuantity = (id, amount) => {
    if (amount > 0) {
      dispatch(
        increaseQuantity({
          userId: cartUserKey,
          id,
        })
      );
    } else {
      dispatch(
        decreaseQuantity({
          userId: cartUserKey,
          id,
        })
      );
    }
  };

  const removeItem = (id) => {
    dispatch(
      removeFromCart({
        userId: cartUserKey,
        id,
      })
    );
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 12 }}>
        <Stack
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="h4"
            fontWeight={800}
          >
            Your Cart is Empty
          </Typography>

          <Button
            component={Link}
            to="/products"
            variant="contained"
          >
            Continue Shopping
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 6 }}
    >
      <Typography
        variant="h3"
        fontWeight={900}
        sx={{ mb: 4 }}
      >
        Shopping Cart
      </Typography>

      <Stack spacing={2}>
        {cart.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
                alignItems={{
                  xs: "flex-start",
                  sm: "center",
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://placehold.co/150x150?text=No+Image";
                  }}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                  }}
                />

                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight={800}>
                    {item.title}
                  </Typography>

                  <Typography>
                    ${Number(item.price).toFixed(2)}
                  </Typography>

                  <Typography color="text.secondary">
                    Seller: {item.ownerName || "MyStore"}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      updateQuantity(item.id, -1)
                    }
                  >
                    −
                  </Button>

                  <Typography>
                    {item.quantity}
                  </Typography>

                  <Button
                    variant="outlined"
                    onClick={() =>
                      updateQuantity(item.id, 1)
                    }
                  >
                    +
                  </Button>
                </Stack>

                <IconButton
                  color="error"
                  onClick={() => removeItem(item.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography>Subtotal</Typography>

              <Typography fontWeight={800}>
                ${subtotal.toFixed(2)}
              </Typography>
            </Stack>

            <Divider />

            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography
                variant="h6"
                fontWeight={800}
              >
                Total
              </Typography>

              <Typography
                variant="h6"
                fontWeight={800}
              >
                ${subtotal.toFixed(2)}
              </Typography>
            </Stack>

            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              size="large"
            >
              Proceed to Checkout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Cart;
