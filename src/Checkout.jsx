import { useState } from "react";

import {
  Link
} from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


function Checkout({
  cart,
  setCart
}) {


  const [form, setForm] =
    useState({

      name: "",
      email: "",
      phone: "",
      address: "",

    });


  const [errors, setErrors] =
    useState({});


  const [orderPlaced, setOrderPlaced] =
    useState(false);


  const total =
    cart.reduce(
      (sum, item) =>

        sum +

        Number(
          item.price || 0
        ) *

        Number(
          item.quantity || 0
        ),

      0
    );


  const totalItems =
    cart.reduce(
      (sum, item) =>
        sum +
        Number(
          item.quantity || 0
        ),

      0
    );


  const handleChange =
    (e) => {

      setForm({

        ...form,

        [e.target.name]:
          e.target.value,

      });

    };


  const validateForm =
    () => {

      const newErrors =
        {};


      if (
        !form.name.trim()
      ) {

        newErrors.name =
          "Name is required";

      }


      if (
        !form.email.trim()
      ) {

        newErrors.email =
          "Email is required";

      } else if (
        !form.email.includes(
          "@"
        )
      ) {

        newErrors.email =
          "Enter a valid email";

      }


      if (
        !form.phone.trim()
      ) {

        newErrors.phone =
          "Phone is required";

      }


      if (
        !form.address.trim()
      ) {

        newErrors.address =
          "Delivery address is required";

      }


      setErrors(
        newErrors
      );


      return (
        Object.keys(
          newErrors
        ).length === 0
      );

    };


  const handleSubmit =
    (e) => {

      e.preventDefault();


      if (
        !validateForm()
      ) {

        return;

      }


      /*
        Important:

        setCart([]) sirf current
        logged-in user ka cart
        clear karega.

        User A ka order place hone par
        User B ka cart affected nahi hoga.
      */

      setCart([]);


      setOrderPlaced(
        true
      );

    };


  /*
    EMPTY CART
  */

  if (
    cart.length === 0 &&
    !orderPlaced
  ) {

    return (

      <Container
        maxWidth="md"

        sx={{
          py: {
            xs: 8,
            md: 12,
          },
        }}
      >

        <Card
          elevation={0}

          sx={{
            textAlign:
              "center",

            borderRadius:
              5,

            border:
              "1px solid #e2e8f0",

            p: {
              xs: 4,
              md: 7,
            },
          }}
        >

          <ShoppingBagOutlinedIcon
            sx={{
              fontSize: 80,

              color:
                "#94a3b8",
            }}
          />


          <Typography
            variant="h4"

            sx={{
              mt: 2,

              fontWeight:
                900,
            }}
          >
            Your Cart is Empty
          </Typography>


          <Typography
            color="text.secondary"

            sx={{
              mt: 1,
            }}
          >
            Add some products before
            going to checkout.
          </Typography>


          <Button
            variant="contained"

            component={Link}
            to="/"

            sx={{
              mt: 3,

              borderRadius: 3,

              px: 4,

              py: 1.3,

              textTransform:
                "none",

              fontWeight:
                700,

              backgroundColor:
                "#2e7d32",

              "&:hover": {
                backgroundColor:
                  "#1b5e20",
              },
            }}
          >
            Continue Shopping
          </Button>

        </Card>

      </Container>

    );

  }


  /*
    ORDER SUCCESS
  */

  if (
    orderPlaced
  ) {

    return (

      <Container
        maxWidth="sm"

        sx={{
          py: {
            xs: 6,
            md: 10,
          },
        }}
      >

        <Card
          elevation={0}

          sx={{
            textAlign:
              "center",

            borderRadius:
              5,

            border:
              "1px solid #bbf7d0",

            p: {
              xs: 4,
              md: 6,
            },

            backgroundColor:
              "#fafffb",
          }}
        >

          <CheckCircleOutlineIcon
            sx={{
              fontSize: 90,

              color:
                "#22c55e",
            }}
          />


          <Typography
            variant="h3"

            sx={{
              mt: 2,

              fontWeight:
                900,

              color:
                "#166534",
            }}
          >
            Order Placed!
          </Typography>


          <Typography
            color="text.secondary"

            sx={{
              mt: 2,

              lineHeight:
                1.7,
            }}
          >
            Thank you for shopping
            with My Store. Your
            order has been received
            successfully.
          </Typography>


          <Button
            variant="contained"

            component={Link}
            to="/"

            sx={{
              mt: 3,

              borderRadius: 3,

              px: 4,

              py: 1.3,

              textTransform:
                "none",

              fontWeight:
                700,

              backgroundColor:
                "#2e7d32",

              "&:hover": {
                backgroundColor:
                  "#1b5e20",
              },
            }}
          >
            Continue Shopping
          </Button>

        </Card>

      </Container>

    );

  }


  /*
    CHECKOUT
  */

  return (

    <Container
      maxWidth="xl"

      sx={{
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >

      {/* Header */}

      <Box
        sx={{
          mb: 4,
        }}
      >

        <Typography
          variant="h3"

          sx={{
            fontWeight:
              900,

            fontSize: {
              xs: "2rem",
              md: "2.7rem",
            },
          }}
        >
          Checkout
        </Typography>


        <Typography
          color="text.secondary"

          sx={{
            mt: 0.5,
          }}
        >
          Complete your information
          to place your order.
        </Typography>

      </Box>


      <Box
        sx={{
          display:
            "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) 380px",
          },

          gap: 3,

          alignItems:
            "start",
        }}
      >

        {/* Customer Form */}

        <Card
          elevation={0}

          sx={{
            borderRadius:
              4,

            border:
              "1px solid #e2e8f0",
          }}
        >

          <CardContent
            sx={{
              p: {
                xs: 2.5,
                md: 4,
              },
            }}
          >

            <Typography
              variant="h5"

              sx={{
                fontWeight:
                  900,

                mb: 3,
              }}
            >
              Delivery Information
            </Typography>


            <Box
              component="form"
              onSubmit={
                handleSubmit
              }
            >

              <TextField
                fullWidth

                label="Full Name"

                name="name"

                value={
                  form.name
                }

                onChange={
                  handleChange
                }

                error={
                  Boolean(
                    errors.name
                  )
                }

                helperText={
                  errors.name
                }

                sx={{
                  mb: 2,
                }}
              />


              <TextField
                fullWidth

                label="Email Address"

                name="email"

                type="email"

                value={
                  form.email
                }

                onChange={
                  handleChange
                }

                error={
                  Boolean(
                    errors.email
                  )
                }

                helperText={
                  errors.email
                }

                sx={{
                  mb: 2,
                }}
              />


              <TextField
                fullWidth

                label="Phone Number"

                name="phone"

                value={
                  form.phone
                }

                onChange={
                  handleChange
                }

                error={
                  Boolean(
                    errors.phone
                  )
                }

                helperText={
                  errors.phone
                }

                sx={{
                  mb: 2,
                }}
              />


              <TextField
                fullWidth

                label="Delivery Address"

                name="address"

                multiline

                rows={4}

                value={
                  form.address
                }

                onChange={
                  handleChange
                }

                error={
                  Boolean(
                    errors.address
                  )
                }

                helperText={
                  errors.address
                }

                sx={{
                  mb: 3,
                }}
              />


              <Button
                type="submit"

                variant="contained"

                size="large"

                fullWidth

                sx={{
                  borderRadius: 3,

                  py: 1.5,

                  textTransform:
                    "none",

                  fontWeight:
                    800,

                  backgroundColor:
                    "#2e7d32",

                  "&:hover": {
                    backgroundColor:
                      "#1b5e20",
                  },
                }}
              >
                Place Order
              </Button>


              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0.7}

                sx={{
                  mt: 2,
                }}
              >

                <LockOutlinedIcon
                  sx={{
                    fontSize:
                      16,

                    color:
                      "#64748b",
                  }}
                />

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Secure checkout
                </Typography>

              </Stack>

            </Box>

          </CardContent>

        </Card>


        {/* Order Summary */}

        <Card
          elevation={0}

          sx={{
            borderRadius:
              4,

            border:
              "1px solid #e2e8f0",

            position: {
              md: "sticky",
            },

            top: {
              md: 90,
            },
          }}
        >

          <CardContent
            sx={{
              p: 3,
            }}
          >

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"

              sx={{
                mb: 3,
              }}
            >

              <Typography
                variant="h5"

                sx={{
                  fontWeight:
                    900,
                }}
              >
                Order Summary
              </Typography>


              <Chip
                label={`${totalItems} item${
                  totalItems !== 1
                    ? "s"
                    : ""
                }`}

                size="small"

                sx={{
                  backgroundColor:
                    "#e8f5e9",

                  color:
                    "#1b5e20",

                  fontWeight:
                    700,
                }}
              />

            </Stack>


            <Stack
              spacing={2}
            >

              {cart.map(
                (item) => (

                  <Box
                    key={item.id}
                  >

                    <Typography
                      sx={{
                        fontWeight:
                          700,

                        lineHeight:
                          1.4,
                      }}
                    >
                      {item.title}
                    </Typography>


                    <Typography
                      variant="body2"

                      color="text.secondary"

                      sx={{
                        mt: 0.5,
                      }}
                    >
                      {item.quantity}
                      {" × "}
                      $
                      {Number(
                        item.price ||
                          0
                      ).toFixed(2)}
                    </Typography>

                  </Box>

                )
              )}

            </Stack>


            <Divider
              sx={{
                my: 2.5,
              }}
            />


            <Box
              sx={{
                display:
                  "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "center",
              }}
            >

              <Typography
                variant="h6"
                fontWeight={800}
              >
                Total
              </Typography>


              <Typography
                variant="h5"

                sx={{
                  color:
                    "#1b5e20",

                  fontWeight:
                    900,
                }}
              >
                $
                {total.toFixed(2)}
              </Typography>

            </Box>

          </CardContent>

        </Card>

      </Box>

    </Container>

  );

}


export default Checkout;