import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function SignUp() {
  const navigate =
    useNavigate();

  const { signup } =
    useAuth();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType:
        "customer",
    });

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleChange = (
    event
  ) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(
        "Please fill all fields."
      );
      return;
    }

    if (
      form.password.length < 6
    ) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    const result =
      signup({
        name: form.name,
        email: form.email,
        password:
          form.password,
        accountType:
          form.accountType,
      });

    if (!result.success) {
      setError(
        result.message
      );
      return;
    }

    if (
      form.accountType ===
      "seller"
    ) {
      setSuccess(
        "Seller account created. Admin approval is required before you can sell."
      );
    } else {
      setSuccess(
        "Customer account created successfully."
      );
    }

    setTimeout(() => {
      navigate("/signin");
    }, 1200);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ py: 7 }}
    >
      <Paper
        elevation={4}
        sx={{
          p: {
            xs: 3,
            sm: 5,
          },
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
        >
          Create Account
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Join the MyStore
          marketplace
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
          >
            {success}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2.5}>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={
                form.password
              }
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={
                form.confirmPassword
              }
              onChange={
                handleChange
              }
              fullWidth
            />

            <FormControl>
              <Typography
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                Account Type
              </Typography>

              <RadioGroup
                name="accountType"
                value={
                  form.accountType
                }
                onChange={
                  handleChange
                }
              >
                <FormControlLabel
                  value="customer"
                  control={<Radio />}
                  label="Customer — Buy Products"
                />

                <FormControlLabel
                  value="seller"
                  control={<Radio />}
                  label="Seller — Buy + Sell Products"
                />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Create Account
            </Button>

            <Typography textAlign="center">
              Already have an
              account?{" "}
              <Link to="/signin">
                Sign In
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignUp;