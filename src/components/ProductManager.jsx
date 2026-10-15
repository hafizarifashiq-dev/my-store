import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useAuth } from "../context/AuthContext";

const EMPTY_FORM = {
  title: "",
  price: "",
  category: "",
  image: "",
  description: "",
};

const FALLBACK_IMAGE =
  "https://placehold.co/300x200?text=No+Image";

function ProductManager({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  role,
}) {
  const { currentUser } = useAuth();

  const isAdmin =
    role === "admin";

  const [open, setOpen] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [form, setForm] =
    useState(EMPTY_FORM);

  const [error, setError] =
    useState("");

  const [imageError, setImageError] =
    useState(false);

  const visibleProducts = useMemo(() => {
    if (isAdmin) {
      return products;
    }

    return products.filter(
      (product) =>
        product.ownerId ===
        currentUser?.id
    );
  }, [
    products,
    isAdmin,
    currentUser,
  ]);

  const openAddDialog = () => {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setError("");
    setImageError(false);
    setOpen(true);
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);

    setForm({
      title: product.title || "",
      price: product.price || "",
      category: product.category || "",
      image: product.image || "",
      description:
        product.description || "",
    });

    setError("");
    setImageError(false);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setError("");
    setImageError(false);
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  };

  const handleSubmit = async () => {
    setError("");

    if (
      !form.title.trim() ||
      !form.price ||
      !form.category.trim() ||
      !form.image.trim() ||
      !form.description.trim()
    ) {
      setError(
        "Please fill all product fields."
      );
      return;
    }

    const price =
      Number(form.price);

    if (
      Number.isNaN(price) ||
      price <= 0
    ) {
      setError(
        "Price must be a valid number greater than 0."
      );
      return;
    }

    const productData = {
      ...form,
      title: form.title.trim(),
      category:
        form.category.trim(),
      description:
        form.description.trim(),
      image: form.image.trim(),
      price,
    };

    try {
      if (editingProduct) {
        await updateProduct({
          ...editingProduct,
          ...productData,
        });
      } else {
        await addProduct(
          productData
        );
      }

      closeDialog();
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong."
      );
    }
  };

  const handleDelete = async (
    product
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${product.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(
        product
      );
    } catch (err) {
      alert(
        err.message ||
          "Delete failed."
      );
    }
  };

  return (
    <Box>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "stretch",
          sm: "center",
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
          >
            {isAdmin
              ? "All Products"
              : "My Products"}
          </Typography>

          <Typography
            color="text.secondary"
          >
            {isAdmin
              ? "Manage the complete marketplace catalog."
              : "Manage products belonging to your store."}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={
            openAddDialog
          }
        >
          Add Product
        </Button>
      </Stack>

      <TableContainer
        component={Card}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Product
              </TableCell>

              {isAdmin && (
                <TableCell>
                  Seller
                </TableCell>
              )}

              <TableCell>
                Category
              </TableCell>

              <TableCell>
                Price
              </TableCell>

              <TableCell>
                Status
              </TableCell>

              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleProducts.map(
              (product) => (
                <TableRow
                  key={product.id}
                >
                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Box
                        component="img"
                        src={
                          product.image ||
                          FALLBACK_IMAGE
                        }
                        alt=""
                        onError={(
                          event
                        ) => {
                          event.currentTarget.src =
                            FALLBACK_IMAGE;
                        }}
                        sx={{
                          width: 60,
                          height: 60,
                          objectFit:
                            "contain",
                          borderRadius: 2,
                          backgroundColor:
                            "#f5f5f5",
                        }}
                      />

                      <Typography
                        sx={{
                          maxWidth: 280,
                        }}
                      >
                        {product.title}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {isAdmin && (
                    <TableCell>
                      {product.ownerName ||
                        "MyStore"}
                    </TableCell>
                  )}

                  <TableCell>
                    {product.category}
                  </TableCell>

                  <TableCell>
                    $
                    {Number(
                      product.price
                    ).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={
                        product.status ||
                        "approved"
                      }
                      color={
                        product.status ===
                        "approved"
                          ? "success"
                          : product.status ===
                            "rejected"
                          ? "error"
                          : "warning"
                      }
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        openEditDialog(
                          product
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(
                          product
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}

            {visibleProducts.length ===
              0 && (
              <TableRow>
                <TableCell
                  colSpan={
                    isAdmin
                      ? 6
                      : 5
                  }
                  align="center"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingProduct
            ? "Update Product"
            : "Add Product"}
        </DialogTitle>

        <DialogContent>
          <Stack
            spacing={2}
            sx={{ pt: 1 }}
          >
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            <TextField
              label="Product Title"
              name="title"
              value={form.title}
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              label="Category"
              name="category"
              value={form.category}
              onChange={
                handleChange
              }
              placeholder="Electronics"
              fullWidth
            />

            <TextField
              label="Image URL"
              name="image"
              value={form.image}
              onChange={(event) => {
                handleChange(
                  event
                );
                setImageError(false);
              }}
              placeholder="https://..."
              fullWidth
            />

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Use a direct image URL. Preview
              will appear below.
            </Typography>

            <Box
              sx={{
                height: 180,
                borderRadius: 2,
                backgroundColor:
                  "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                overflow: "hidden",
              }}
            >
              {!imageError &&
              form.image ? (
                <Box
                  component="img"
                  src={form.image}
                  alt="Preview"
                  onError={() =>
                    setImageError(
                      true
                    )
                  }
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit:
                      "contain",
                  }}
                />
              ) : (
                <Typography color="text.secondary">
                  {imageError
                    ? "Image URL could not be loaded"
                    : "Image preview"}
                </Typography>
              )}
            </Box>

            <TextField
              label="Description"
              name="description"
              value={
                form.description
              }
              onChange={
                handleChange
              }
              multiline
              rows={4}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={closeDialog}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            {editingProduct
              ? "Update"
              : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProductManager;