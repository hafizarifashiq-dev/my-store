import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


function ProductManager({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  role
}) {

  const isAdmin =
    role === "admin";


  /*
    Demo user ID.

    Real authentication ke baad
    ye logged-in user's ID hogi.
  */

  const currentUserId =
    "demo-user";


  /*
    Admin = all products

    User = only own products
  */

  const visibleProducts =
    isAdmin
      ? products
      : products.filter(
          (product) =>
            product.ownerRole === "user" &&
            product.ownerId ===
              currentUserId
        );


  const [open, setOpen] =
    useState(false);


  const [editingProduct, setEditingProduct] =
    useState(null);


  const [deleteProductItem, setDeleteProductItem] =
    useState(null);


  const [message, setMessage] =
    useState("");


  const [error, setError] =
    useState("");


  const [saving, setSaving] =
    useState(false);


  const [form, setForm] = useState({

    title: "",

    price: "",

    description: "",

    category: "electronics",

    image: ""

  });


  const categories = [

    "electronics",

    "jewelery",

    "men's clothing",

    "women's clothing"

  ];


  /*
    FORM CHANGE
  */

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setForm({

      ...form,

      [name]: value

    });

  };


  /*
    OPEN ADD
  */

  const openAddDialog = () => {

    setEditingProduct(null);

    setForm({

      title: "",

      price: "",

      description: "",

      category: "electronics",

      image: ""

    });

    setMessage("");

    setError("");

    setOpen(true);

  };


  /*
    OPEN EDIT
  */

  const openEditDialog = (product) => {

    setEditingProduct(product);

    setForm({

      title:
        product.title,

      price:
        product.price,

      description:
        product.description,

      category:
        product.category,

      image:
        product.image

    });

    setMessage("");

    setError("");

    setOpen(true);

  };


  /*
    CLOSE DIALOG
  */

  const closeDialog = () => {

    if (saving) {
      return;
    }

    setOpen(false);

    setEditingProduct(null);

  };


  /*
    SAVE PRODUCT
  */

  const handleSubmit = async () => {

    setMessage("");

    setError("");


    if (

      !form.title.trim() ||

      !form.price ||

      !form.description.trim() ||

      !form.category ||

      !form.image.trim()

    ) {

      setError(
        "Please fill all fields."
      );

      return;

    }


    if (
      Number(form.price) <= 0
    ) {

      setError(
        "Price must be greater than 0."
      );

      return;

    }


    setSaving(true);


    try {

      /*
        UPDATE
      */

      if (editingProduct) {

        const updatedProduct = {

          ...editingProduct,

          title:
            form.title,

          price:
            Number(form.price),

          description:
            form.description,

          category:
            form.category,

          image:
            form.image

        };


        await updateProduct(
          updatedProduct
        );


        setMessage(
          "Product updated successfully."
        );

      }

      /*
        CREATE
      */

      else {

        await addProduct(

          form,

          role === "admin"
            ? "admin"
            : "user",

          role === "admin"
            ? "admin"
            : currentUserId

        );


        setMessage(
          "Product added successfully."
        );

      }


      setTimeout(() => {

        setOpen(false);

        setEditingProduct(null);

        setMessage("");

      }, 700);


    } catch (error) {

      console.log(error);

      setError(
        "Something went wrong while saving the product."
      );

    } finally {

      setSaving(false);

    }

  };


  /*
    DELETE CONFIRMATION
  */

  const openDeleteDialog = (
    product
  ) => {

    setDeleteProductItem(
      product
    );

    setError("");

  };


  const closeDeleteDialog = () => {

    setDeleteProductItem(null);

  };


  /*
    DELETE
  */

  const handleDelete = async () => {

    if (
      !deleteProductItem
    ) {

      return;

    }


    setSaving(true);


    try {

      await deleteProduct(
        deleteProductItem
      );


      setMessage(
        "Product deleted successfully."
      );


      setDeleteProductItem(
        null
      );


      setTimeout(() => {

        setMessage("");

      }, 2000);


    } catch (error) {

      console.log(error);

      setError(
        "Product could not be deleted."
      );

      setDeleteProductItem(
        null
      );

    } finally {

      setSaving(false);

    }

  };


  return (

    <Box
      sx={{
        maxWidth: 1400,
        margin: "auto",
        padding: {
          xs: 2,
          md: 4
        }
      }}
    >

      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center"
          },
          flexDirection: {
            xs: "column",
            sm: "row"
          },
          gap: 2,
          marginBottom: 4
        }}
      >

        <Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#0f172a"
            }}
          >
            {isAdmin
              ? "Admin Product Management"
              : "My Products"}
          </Typography>


          <Typography
            sx={{
              color:
                "text.secondary",
              marginTop: 0.5
            }}
          >
            {isAdmin
              ? "Manage all products in the marketplace."
              : "Manage the products you have listed."}
          </Typography>

        </Box>


        <Button
          variant="contained"
          startIcon={
            <AddIcon />
          }
          onClick={
            openAddDialog
          }
          sx={{
            borderRadius: 2.5,
            paddingX: 3,
            fontWeight: "bold",
            textTransform:
              "none"
          }}
        >
          Add Product
        </Button>

      </Box>


      {/* MESSAGES */}

      <Stack
        spacing={2}
        sx={{
          marginBottom: 3
        }}
      >

        {message && (

          <Alert
            severity="success"
          >
            {message}
          </Alert>

        )}


        {error && (

          <Alert
            severity="error"
          >
            {error}
          </Alert>

        )}

      </Stack>


      {/* STATS */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 3,
          flexWrap: "wrap"
        }}
      >

        <Paper
          elevation={0}
          sx={{
            padding: 2.5,
            borderRadius: 3,
            border:
              "1px solid #e2e8f0",
            minWidth: 180
          }}
        >

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#2563eb"
            }}
          >
            {visibleProducts.length}
          </Typography>

          <Typography
            color="text.secondary"
          >
            {isAdmin
              ? "Total Products"
              : "My Products"}
          </Typography>

        </Paper>

      </Box>


      {/* TABLE */}

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border:
            "1px solid #e2e8f0",
          borderRadius: 3,
          overflow: "auto"
        }}
      >

        <Table
          sx={{
            minWidth: 900
          }}
        >

          <TableHead>

            <TableRow
              sx={{
                backgroundColor:
                  "#f8fafc"
              }}
            >

              <TableCell
                sx={{
                  fontWeight:
                    "bold"
                }}
              >
                ID
              </TableCell>


              <TableCell
                sx={{
                  fontWeight:
                    "bold"
                }}
              >
                Product
              </TableCell>


              <TableCell
                sx={{
                  fontWeight:
                    "bold"
                }}
              >
                Category
              </TableCell>


              <TableCell
                sx={{
                  fontWeight:
                    "bold"
                }}
              >
                Price
              </TableCell>


              {isAdmin && (

                <TableCell
                  sx={{
                    fontWeight:
                      "bold"
                  }}
                >
                  Owner
                </TableCell>

              )}


              <TableCell
                align="center"
                sx={{
                  fontWeight:
                    "bold"
                }}
              >
                Actions
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {visibleProducts.map(
              (product) => (

                <TableRow
                  key={product.id}
                  hover
                >

                  <TableCell>
                    {product.id}
                  </TableCell>


                  <TableCell>

                    <Box
                      sx={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: 2,
                        maxWidth:
                          450
                      }}
                    >

                      <Box
                        component="img"
                        src={
                          product.image
                        }
                        alt={
                          product.title
                        }
                        onError={(
                          event
                        ) => {

                          event.currentTarget.style.display =
                            "none";

                        }}
                        sx={{
                          width: 55,
                          height: 55,
                          objectFit:
                            "contain",
                          borderRadius: 2
                        }}
                      />


                      <Typography
                        sx={{
                          fontWeight:
                            600
                        }}
                      >
                        {
                          product.title
                        }
                      </Typography>

                    </Box>

                  </TableCell>


                  <TableCell>

                    <Chip
                      label={
                        product.category
                      }
                      size="small"
                    />

                  </TableCell>


                  <TableCell>

                    <Typography
                      sx={{
                        fontWeight:
                          "bold"
                      }}
                    >
                      $
                      {
                        Number(
                          product.price
                        ).toFixed(2)
                      }
                    </Typography>

                  </TableCell>


                  {isAdmin && (

                    <TableCell>

                      <Chip
                        label={
                          product.ownerRole
                            ? product.ownerRole
                            : "API"
                        }
                        size="small"
                        color={
                          product.ownerRole ===
                          "user"
                            ? "success"
                            : "primary"
                        }
                      />

                    </TableCell>

                  )}


                  <TableCell
                    align="center"
                  >

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
                        openDeleteDialog(
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


            {visibleProducts.length === 0 && (

              <TableRow>

                <TableCell
                  colSpan={
                    isAdmin
                      ? 6
                      : 5
                  }
                  align="center"
                  sx={{
                    padding: 8
                  }}
                >

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight:
                        "bold"
                    }}
                  >
                    No products found
                  </Typography>


                  <Typography
                    sx={{
                      color:
                        "text.secondary",
                      marginTop: 1
                    }}
                  >
                    Click "Add Product"
                    to create a product.
                  </Typography>

                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </TableContainer>


      {/* ADD / EDIT DIALOG */}

      <Dialog
        open={open}
        onClose={
          closeDialog
        }
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle
          sx={{
            fontWeight:
              "bold"
          }}
        >
          {editingProduct
            ? "Update Product"
            : "Add Product"}
        </DialogTitle>


        <DialogContent>

          <Stack
            spacing={2}
            sx={{
              marginTop: 1
            }}
          >

            <TextField
              label="Product Title"
              name="title"
              value={
                form.title
              }
              onChange={
                handleChange
              }
              fullWidth
            />


            <TextField
              label="Price"
              name="price"
              type="number"
              value={
                form.price
              }
              onChange={
                handleChange
              }
              fullWidth
            />


            <TextField
              select
              label="Category"
              name="category"
              value={
                form.category
              }
              onChange={
                handleChange
              }
              fullWidth
            >

              {categories.map(
                (category) => (

                  <MenuItem
                    key={
                      category
                    }
                    value={
                      category
                    }
                  >
                    {category}
                  </MenuItem>

                )
              )}

            </TextField>


            <TextField
              label="Image URL"
              name="image"
              value={
                form.image
              }
              onChange={
                handleChange
              }
              fullWidth
              helperText="Use a valid direct image URL."
            />


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


        <DialogActions
          sx={{
            padding: 2
          }}
        >

          <Button
            onClick={
              closeDialog
            }
            disabled={
              saving
            }
            sx={{
              textTransform:
                "none"
            }}
          >
            Cancel
          </Button>


          <Button
            variant="contained"
            onClick={
              handleSubmit
            }
            disabled={
              saving
            }
            sx={{
              textTransform:
                "none",
              borderRadius: 2
            }}
          >
            {saving
              ? "Saving..."
              : editingProduct
              ? "Update Product"
              : "Add Product"}
          </Button>

        </DialogActions>

      </Dialog>


      {/* DELETE DIALOG */}

      <Dialog
        open={
          deleteProductItem !==
          null
        }
        onClose={
          closeDeleteDialog
        }
        maxWidth="xs"
        fullWidth
      >

        <DialogTitle
          sx={{
            fontWeight:
              "bold"
          }}
        >
          Delete Product?
        </DialogTitle>


        <DialogContent>

          <Typography>
            Are you sure you want to
            delete this product?
          </Typography>

        </DialogContent>


        <DialogActions
          sx={{
            padding: 2
          }}
        >

          <Button
            onClick={
              closeDeleteDialog
            }
            disabled={
              saving
            }
            sx={{
              textTransform:
                "none"
            }}
          >
            Cancel
          </Button>


          <Button
            color="error"
            variant="contained"
            onClick={
              handleDelete
            }
            disabled={
              saving
            }
            sx={{
              textTransform:
                "none",
              borderRadius: 2
            }}
          >
            Delete
          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  );

}

export default ProductManager;