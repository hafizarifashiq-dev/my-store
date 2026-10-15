import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home({
  products = [],
  addToCart,
  wishlist = [],
  toggleWishlist,
}) {
  const featured = products.slice(0, 4);

  const categories = [
    {
      title: "Electronics",
      description: "Latest gadgets and electronic products",
    },
    {
      title: "Jewelery",
      description: "Beautiful jewellery for every occasion",
    },
    {
      title: "Men's Clothing",
      description: "Modern and comfortable men's fashion",
    },
    {
      title: "Women's Clothing",
      description: "Trendy styles for women",
    },
  ];

  return (
    <Box>
      {/* ================= HERO SECTION ================= */}

      <Box
        sx={{
          background:
            "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            sx={{
              alignItems: "center",
            }}
          >
            {/* LEFT SIDE */}

            <Grid
              size={{
                xs: 12,
                md: 7,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  fontSize: {
                    xs: "2.5rem",
                    md: "4rem",
                  },
                }}
              >
                Welcome to MyStore
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  maxWidth: 650,
                  lineHeight: 1.7,
                }}
              >
                Discover quality products at great prices.
                Shop electronics, fashion, jewellery and
                much more.
              </Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
                sx={{
                  alignItems: {
                    xs: "stretch",
                    sm: "center",
                  },
                }}
              >
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "white",
                    color: "primary.main",
                    px: 4,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  Shop Now
                </Button>

                <Button
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    px: 4,
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor:
                        "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Create Account
                </Button>
              </Stack>
            </Grid>

            {/* RIGHT SIDE */}

            <Grid
              size={{
                xs: 12,
                md: 5,
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  p: 4,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "5rem",
                      md: "8rem",
                    },
                    lineHeight: 1,
                  }}
                >
                  🛍️
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mt: 2,
                  }}
                >
                  Everything You Need
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= FEATURED PRODUCTS ================= */}

      <Container
        maxWidth="xl"
        sx={{
          py: 8,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
              }}
            >
              Featured Products
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              Explore our latest products
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/products"
            variant="outlined"
          >
            View All Products
          </Button>
        </Stack>

        <Grid
          container
          spacing={3}
        >
          {featured.map((product) => (
            <Grid
              key={product.id}
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <ProductCard
                product={product}
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ================= CATEGORIES ================= */}

      <Box
        sx={{
          backgroundColor: "grey.100",
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              fontWeight: 800,
              mb: 5,
            }}
          >
            Shop by Category
          </Typography>

          <Grid
            container
            spacing={3}
          >
            {categories.map((category) => (
              <Grid
                key={category.title}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <Card
                  component={Link}
                  to="/products"
                  sx={{
                    height: "100%",
                    textDecoration: "none",
                    color: "inherit",
                    transition:
                      "transform 0.2s, box-shadow 0.2s",

                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      minHeight: 180,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {category.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= CTA ================= */}

      <Box
        sx={{
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              p: {
                xs: 3,
                md: 6,
              },
              textAlign: "center",
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 2,
              }}
            >
              Ready to Start Shopping?
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mb: 4,
              }}
            >
              Browse our complete collection and find
              something you love.
            </Typography>

            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
              sx={{
                px: 5,
              }}
            >
              Explore Products
            </Button>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;