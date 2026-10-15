import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ProductManager from "../components/ProductManager";

import { useAuth } from "../context/AuthContext";

function AdminDashboard({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
  rejectProduct,
}) {
  const {
    users,
    approveSeller,
    rejectSeller,
  } = useAuth();

  const pendingSellers =
    users.filter(
      (user) =>
        user.role === "seller" &&
        user.sellerStatus ===
          "pending"
    );

  const pendingProducts =
    products.filter(
      (product) =>
        product.status ===
        "pending"
    );

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 5 }}
    >
      <Stack spacing={5}>
        <Box>
          <Typography
            variant="h3"
            fontWeight={800}
          >
            Admin Dashboard
          </Typography>

          <Typography color="text.secondary">
            Complete marketplace
            management
          </Typography>
        </Box>

        {/* SELLER APPROVAL */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            mb={2}
          >
            Seller Applications
          </Typography>

          {pendingSellers.length ===
          0 ? (
            <Alert severity="info">
              No pending seller
              applications.
            </Alert>
          ) : (
            <Stack spacing={2}>
              {pendingSellers.map(
                (user) => (
                  <Card key={user.id}>
                    <CardContent>
                      <Stack
                        direction={{
                          xs: "column",
                          sm: "row",
                        }}
                        justifyContent="space-between"
                        alignItems={{
                          xs: "flex-start",
                          sm: "center",
                        }}
                        spacing={2}
                      >
                        <Box>
                          <Typography fontWeight={800}>
                            {user.name}
                          </Typography>

                          <Typography color="text.secondary">
                            {user.email}
                          </Typography>

                          <Chip
                            size="small"
                            label="Pending Seller"
                            color="warning"
                            sx={{
                              mt: 1,
                            }}
                          />
                        </Box>

                        <Stack
                          direction="row"
                          spacing={1}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              approveSeller(
                                user.id
                              )
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() =>
                              rejectSeller(
                                user.id
                              )
                            }
                          >
                            Reject
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                )
              )}
            </Stack>
          )}
        </Box>

        <Divider />

        {/* PRODUCT APPROVAL */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            mb={2}
          >
            Pending Products
          </Typography>

          {pendingProducts.length ===
          0 ? (
            <Alert severity="info">
              No pending products.
            </Alert>
          ) : (
            <Stack spacing={2}>
              {pendingProducts.map(
                (product) => (
                  <Card
                    key={product.id}
                  >
                    <CardContent>
                      <Stack
                        direction={{
                          xs: "column",
                          md: "row",
                        }}
                        justifyContent="space-between"
                        alignItems={{
                          xs: "flex-start",
                          md: "center",
                        }}
                        spacing={2}
                      >
                        <Box>
                          <Typography fontWeight={800}>
                            {product.title}
                          </Typography>

                          <Typography color="text.secondary">
                            Seller:{" "}
                            {product.ownerName}
                          </Typography>

                          <Typography>
                            $
                            {Number(
                              product.price
                            ).toFixed(2)}
                          </Typography>
                        </Box>

                        <Stack
                          direction="row"
                          spacing={1}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              approveProduct(
                                product.id
                              )
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() =>
                              rejectProduct(
                                product.id
                              )
                            }
                          >
                            Reject
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                )
              )}
            </Stack>
          )}
        </Box>

        <Divider />

        {/* ALL PRODUCTS */}
        <ProductManager
          products={products}
          addProduct={addProduct}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
          role="admin"
        />
      </Stack>
    </Container>
  );
}

export default AdminDashboard;