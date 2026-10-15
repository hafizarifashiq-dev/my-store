import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function SignIn() {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setError("");

    const result = login(
      email,
      password
    );

    if (!result.success) {
      setError(
        result.message
      );
      return;
    }

    if (
      result.user.role ===
      "admin"
    ) {
      navigate("/admin");
      return;
    }

    if (
      result.user.role ===
        "seller" &&
      result.user.sellerStatus ===
        "approved"
    ) {
      navigate("/seller");
      return;
    }

    navigate("/products");
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
          Sign In
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Login to MyStore
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2.5}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Sign In
            </Button>

            <Typography textAlign="center">
              Don't have an
              account?{" "}
              <Link to="/signup">
                Create Account
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignIn;