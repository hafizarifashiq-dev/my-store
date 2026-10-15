import { useState } from "react";

import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";

function Checkout() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const cartUserKey =
    currentUser?.id
      ? String(currentUser.id)
      : "guest";

  const cart = useSelector(
    (state) =>
      state.cart.cartsByUser[cartUserKey] || []
  );

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    address: "",
    city: "",
    phone: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.phone
    ) {
      setError(
        "Please complete all checkout fields."
      );
      return;
    }

    const order = {
      id: `order-${Date.now()}`,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      items: cart,
      total,
      shipping: form,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const existingOrders =
      JSON.parse(
        localStorage.getItem("mystore_orders")
      ) || [];

    localStorage.setItem(
      "mystore_orders",
      JSON.stringify([
        ...existingOrders,
        order,
      ])
    );

    dispatch(clearCart(cartUserKey));
    setSuccess(true);
  };

  if (success) {
    return (
      <Container sx={{ py: 12 }}>
        <Stack
          alignItems="center"
          spacing={2}
        >
          <Alert severity="success">
            Order placed successfully.
          </Alert>

          <Typography
            variant="h4"
            fontWeight={800}
          >
            Thank You!
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

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 12 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ mb: 2 }}
        >
          Your cart is empty.
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="contained"
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{ py: 6 }}
    >
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{ mb: 1 }}
          >
            Checkout
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Total: ${total.toFixed(2)}
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}

          <Stack
            component="form"
            onSubmit={handleSubmit}
            spacing={2}
          >
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Place Order
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Checkout;
