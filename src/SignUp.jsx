import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";


function SignUp() {

  const navigate =
    useNavigate();


  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });


  const [error, setError] =
    useState("");


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");


    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {

      setError(
        "Please fill all fields"
      );

      return;

    }


    if (
      form.password !==
      form.confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;

    }


    if (
      form.password.length < 6
    ) {

      setError(
        "Password must be at least 6 characters"
      );

      return;

    }


    navigate("/signin");

  };


  return (

    <Box
      sx={{
        minHeight: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        background:
          "linear-gradient(135deg, #eff6ff, #f8fafc)"
      }}
    >

      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 5,
          border:
            "1px solid #e2e8f0",
          boxShadow:
            "0 20px 50px rgba(15,23,42,0.08)"
        }}
      >

        <CardContent
          sx={{
            padding: {
              xs: 3,
              md: 5
            }
          }}
        >

          <Box
            sx={{
              textAlign: "center",
              marginBottom: 3
            }}
          >

            <StorefrontIcon
              sx={{
                fontSize: 48,
                color: "#2563eb"
              }}
            />


            <Typography
              variant="h4"
              sx={{
                fontWeight: "900",
                marginTop: 1
              }}
            >
              Create Account
            </Typography>


            <Typography
              sx={{
                color: "text.secondary",
                marginTop: 1
              }}
            >
              Join My Store today
            </Typography>

          </Box>


          {error && (

            <Alert
              severity="error"
              sx={{
                marginBottom: 2
              }}
            >
              {error}
            </Alert>

          )}


          <Box
            component="form"
            onSubmit={handleSubmit}
          >

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              sx={{
                marginBottom: 2
              }}
            />


            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              sx={{
                marginBottom: 2
              }}
            />


            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              sx={{
                marginBottom: 2
              }}
            />


            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={
                form.confirmPassword
              }
              onChange={handleChange}
              sx={{
                marginBottom: 3
              }}
            />


            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              startIcon={
                <PersonAddOutlinedIcon />
              }
              sx={{
                borderRadius: 3,
                paddingY: 1.5,
                textTransform:
                  "none",
                fontWeight: "bold"
              }}
            >
              Create Account
            </Button>

          </Box>


          <Typography
            sx={{
              textAlign: "center",
              marginTop: 3,
              color: "text.secondary"
            }}
          >
            Already have an account?
          </Typography>


          <Button
            fullWidth
            component={Link}
            to="/signin"
            sx={{
              marginTop: 1,
              textTransform: "none",
              fontWeight: "bold"
            }}
          >
            Sign In
          </Button>

        </CardContent>

      </Card>

    </Box>

  );
}

export default SignUp;