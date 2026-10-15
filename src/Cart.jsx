import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";

import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const FALLBACK_IMAGE =
  "https://placehold.co/600x400?text=No+Image";


function Cart({
  cart,
  setCart
}) {


  const increaseQuantity =
    (id) => {

      setCart(
        (previousCart) =>

          previousCart.map(
            (item) =>

              String(item.id) ===
              String(id)

                ? {
                    ...item,

                    quantity:
                      item.quantity + 1,
                  }

                : item
          )
      );

    };


  const decreaseQuantity =
    (id) => {

      setCart(
        (previousCart) =>

          previousCart

            .map(
              (item) =>

                String(item.id) ===
                String(id)

                  ? {
                      ...item,

                      quantity:
                        item.quantity - 1,
                    }

                  : item
            )

            .filter(
              (item) =>
                item.quantity > 0
            )
      );

    };


  const removeFromCart =
    (id) => {

      setCart(
        (previousCart) =>

          previousCart.filter(
            (item) =>
              String(item.id) !==
              String(id)
          )
      );

    };


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
        item.quantity,
      0
    );


  /*
    EMPTY CART
  */

  if (
    cart.length === 0
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

            background:
              "linear-gradient(135deg, #f8fafc, #ffffff)",
          }}
        >

          <ShoppingBagOutlinedIcon
            sx={{
              fontSize: 85,

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

              maxWidth: 500,

              mx: "auto",
            }}
          >
            Looks like you haven't
            added anything to your
            cart yet.
          </Typography>


          <Button
            variant="contained"

            component={Link}
            to="/"

            startIcon={
              <ArrowBackIcon />
            }

            sx={{
              mt: 4,

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
          Shopping Cart
        </Typography>


        <Typography
          color="text.secondary"
          sx={{
            mt: 0.5,
          }}
        >
          Review your products
          before checkout.
        </Typography>

      </Box>


      {/* Main Layout */}

      <Box
        sx={{
          display:
            "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) 360px",
          },

          gap: 3,
        }}
      >

        {/* Cart Items */}

        <Box>

          <Stack
            spacing={2}
          >

            {cart.map(
              (item) => (

                <Card
                  key={item.id}

                  elevation={0}

                  sx={{
                    borderRadius:
                      4,

                    border:
                      "1px solid #e2e8f0",

                    overflow:
                      "hidden",

                    transition:
                      "all 0.2s ease",

                    "&:hover": {
                      boxShadow:
                        "0 8px 24px rgba(15,23,42,0.08)",
                    },
                  }}
                >

                  <Box
                    sx={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap: 2,

                      p: {
                        xs: 1.5,
                        sm: 2,
                      },

                      flexWrap: {
                        xs: "wrap",
                        sm: "nowrap",
                      },
                    }}
                  >

                    {/* Image */}

                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          sm: 150,
                        },

                        height: {
                          xs: 180,
                          sm: 150,
                        },

                        flexShrink: 0,

                        borderRadius: 3,

                        backgroundColor:
                          "#f8faf9",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        overflow:
                          "hidden",
                      }}
                    >

                      <CardMedia
                        component="img"

                        image={
                          item.image ||
                          FALLBACK_IMAGE
                        }

                        alt={
                          item.title
                        }

                        sx={{
                          width:
                            "100%",

                          height:
                            "100%",

                          objectFit:
                            "contain",

                          p: 1.5,
                        }}

                        onError={(
                          event
                        ) => {

                          event.currentTarget.onerror =
                            null;

                          event.currentTarget.src =
                            FALLBACK_IMAGE;

                        }}
                      />

                    </Box>


                    {/* Product Info */}

                    <CardContent
                      sx={{
                        flex: 1,

                        p: {
                          xs: 0.5,
                          sm: 1,
                        },

                        "&:last-child": {
                          pb: 1,
                        },
                      }}
                    >

                      <Typography
                        variant="h6"

                        sx={{
                          fontWeight:
                            800,

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
                          mt: 0.7,

                          textTransform:
                            "capitalize",
                        }}
                      >
                        {item.category ||
                          "Product"}
                      </Typography>


                      <Typography
                        sx={{
                          mt: 1,

                          fontSize:
                            "1.15rem",

                          fontWeight:
                            800,

                          color:
                            "#1b5e20",
                        }}
                      >
                        $
                        {Number(
                          item.price ||
                            0
                        ).toFixed(2)}
                      </Typography>


                      {/* Quantity */}

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}

                        sx={{
                          mt: 2,
                        }}
                      >

                        <Typography
                          variant="body2"
                          fontWeight={700}
                        >
                          Quantity
                        </Typography>


                        <Box
                          sx={{
                            display:
                              "flex",

                            alignItems:
                              "center",

                            border:
                              "1px solid #cbd5e1",

                            borderRadius:
                              2,

                            overflow:
                              "hidden",
                          }}
                        >

                          <IconButton
                            size="small"

                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }

                            sx={{
                              width: 34,
                              height: 34,

                              borderRadius:
                                0,

                              "&:hover": {
                                backgroundColor:
                                  "#f1f5f9",
                              },
                            }}
                          >

                            <RemoveIcon
                              fontSize="small"
                            />

                          </IconButton>


                          <Typography
                            sx={{
                              minWidth:
                                38,

                              textAlign:
                                "center",

                              fontWeight:
                                800,
                            }}
                          >
                            {item.quantity}
                          </Typography>


                          <IconButton
                            size="small"

                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }

                            sx={{
                              width: 34,
                              height: 34,

                              borderRadius:
                                0,

                              "&:hover": {
                                backgroundColor:
                                  "#e8f5e9",
                              },
                            }}
                          >

                            <AddIcon
                              fontSize="small"
                            />

                          </IconButton>

                        </Box>

                      </Stack>


                      {/* Subtotal */}

                      <Typography
                        sx={{
                          mt: 1.5,

                          fontWeight:
                            800,
                        }}
                      >
                        Subtotal: $
                        {(
                          Number(
                            item.price ||
                              0
                          ) *
                          Number(
                            item.quantity ||
                              0
                          )
                        ).toFixed(2)}
                      </Typography>


                      {/* Remove */}

                      <Button
                        color="error"

                        size="small"

                        startIcon={
                          <DeleteOutlineIcon />
                        }

                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }

                        sx={{
                          mt: 1,

                          textTransform:
                            "none",

                          fontWeight:
                            700,
                        }}
                      >
                        Remove
                      </Button>

                    </CardContent>

                  </Box>

                </Card>

              )
            )}

          </Stack>


          {/* Continue Shopping */}

          <Button
            component={Link}
            to="/"

            startIcon={
              <ArrowBackIcon />
            }

            sx={{
              mt: 3,

              textTransform:
                "none",

              fontWeight:
                700,

              color:
                "#334155",
            }}
          >
            Continue Shopping
          </Button>

        </Box>


        {/* Order Summary */}

        <Card
          elevation={0}

          sx={{
            height:
              "fit-content",

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

            <Typography
              variant="h5"

              sx={{
                fontWeight:
                  900,

                mb: 3,
              }}
            >
              Order Summary
            </Typography>


            <Box
              sx={{
                display:
                  "flex",

                justifyContent:
                  "space-between",

                mb: 1.5,
              }}
            >

              <Typography
                color="text.secondary"
              >
                Items
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
                    "#f1f5f9",

                  fontWeight:
                    700,
                }}
              />

            </Box>


            <Divider
              sx={{
                my: 2,
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
                  fontWeight:
                    900,

                  color:
                    "#1b5e20",
                }}
              >
                $
                {total.toFixed(2)}
              </Typography>

            </Box>


            <Button
              fullWidth

              variant="contained"

              size="large"

              component={Link}
              to="/checkout"

              sx={{
                mt: 3,

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
              Proceed to Checkout
            </Button>


            <Typography
              variant="caption"

              color="text.secondary"

              sx={{
                display:
                  "block",

                textAlign:
                  "center",

                mt: 1.5,
              }}
            >
              Secure checkout
            </Typography>

          </CardContent>

        </Card>

      </Box>

    </Container>

  );

}


export default Cart;