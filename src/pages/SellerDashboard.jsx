import {
  Alert,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ProductManager from "../components/ProductManager";
import { useAuth } from "../context/AuthContext";

function SellerDashboard({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
}) {
  const { currentUser } =
    useAuth();

  const sellerApproved =
    currentUser?.sellerStatus ===
    "approved";

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 5 }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h3"
            fontWeight={800}
          >
            Seller Dashboard
          </Typography>

          <Typography color="text.secondary">
            Welcome,{" "}
            {currentUser?.name}
          </Typography>
        </Box>

        {!sellerApproved && (
          <Alert severity="warning">
            Your seller account is
            waiting for admin approval.
            You can browse and buy
            products, but selling
            features are locked until
            approval.
          </Alert>
        )}

        {sellerApproved && (
          <ProductManager
            products={products}
            addProduct={addProduct}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            role="seller"
          />
        )}
      </Stack>
    </Container>
  );
}

export default SellerDashboard;