import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  addToCart as addToCartAction,
  setCarts
} from "./redux/cartSlice";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AccessDenied from "./pages/AccessDenied";


const API_URL =
  "https://fakestoreapi.com/products";


const STORAGE = {
  manual:
    "mystore_manual_products",

  deleted:
    "mystore_deleted_products",

  updated:
    "mystore_updated_products",

  carts:
    "mystore_carts",
};


function readJSON(key, fallback) {
  try {
    return (
      JSON.parse(
        localStorage.getItem(key)
      ) ?? fallback
    );
  } catch {
    return fallback;
  }
}


function MarketplaceApp() {

  const { currentUser } = useAuth();


  const [apiProducts, setApiProducts] =
    useState([]);


  const [manualProducts, setManualProducts] =
    useState(() =>
      readJSON(
        STORAGE.manual,
        []
      )
    );


  const [deletedProductIds, setDeletedProductIds] =
    useState(() =>
      readJSON(
        STORAGE.deleted,
        []
      )
    );


  const [updatedProducts, setUpdatedProducts] =
    useState(() =>
      readJSON(
        STORAGE.updated,
        {}
      )
    );


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  const dispatch = useDispatch();

  /*
    ------------------------------------------------
    REDUX CART
    ------------------------------------------------

    Redux now manages the cart.
    Each user still has a separate cart.
  */

  const cartsByUser = useSelector(
    (state) => state.cart.cartsByUser
  );

  const cartUserKey =
    currentUser?.id
      ? String(currentUser.id)
      : "guest";

  const cart =
    cartsByUser[cartUserKey] || [];

  /*
    Products API
  */

  useEffect(() => {

    const loadProducts =
      async () => {

        try {

          setLoading(true);

          setError("");


          const response =
            await axios.get(
              API_URL
            );


          /*
            Teacher ke requirement ke
            according 2 seconds loading.
          */

          await new Promise(
            (resolve) =>
              setTimeout(
                resolve,
                2000
              )
          );


          const products =
            response.data.map(
              (product) => ({

                ...product,

                ownerRole:
                  "admin",

                ownerId:
                  "admin-1",

                ownerName:
                  "MyStore",

                status:
                  "approved",

                source:
                  "api",

              })
            );


          setApiProducts(
            products
          );

        } catch (err) {

          console.error(err);

          setError(
            "Products API could not be loaded."
          );

        } finally {

          setLoading(false);

        }

      };


    loadProducts();

  }, []);


  /*
    Manual products storage
  */

  useEffect(() => {

    localStorage.setItem(
      STORAGE.manual,
      JSON.stringify(
        manualProducts
      )
    );

  }, [manualProducts]);


  /*
    Deleted products storage
  */

  useEffect(() => {

    localStorage.setItem(
      STORAGE.deleted,
      JSON.stringify(
        deletedProductIds
      )
    );

  }, [deletedProductIds]);


  /*
    Updated products storage
  */

  useEffect(() => {

    localStorage.setItem(
      STORAGE.updated,
      JSON.stringify(
        updatedProducts
      )
    );

  }, [updatedProducts]);


  /*
    Cross-tab storage sync
  */

  useEffect(() => {

    const handleStorage =
      (event) => {

        if (
          event.key ===
          STORAGE.manual
        ) {

          setManualProducts(
            readJSON(
              STORAGE.manual,
              []
            )
          );

        }


        if (
          event.key ===
          STORAGE.deleted
        ) {

          setDeletedProductIds(
            readJSON(
              STORAGE.deleted,
              []
            )
          );

        }


        if (
          event.key ===
          STORAGE.updated
        ) {

          setUpdatedProducts(
            readJSON(
              STORAGE.updated,
              {}
            )
          );

        }


        if (
          event.key ===
          STORAGE.carts
        ) {

          const latestCarts = readJSON(
            STORAGE.carts,
            {}
          );

          dispatch(
            setUserCart({
              userId: cartUserKey,
              cart: latestCarts[cartUserKey] || [],
            })
          );

        }

      };


    window.addEventListener(
      "storage",
      handleStorage
    );


    return () => {

      window.removeEventListener(
        "storage",
        handleStorage
      );

    };

  }, [dispatch, cartUserKey]);


  /*
    Persist Redux cart to localStorage.
  */

  useEffect(() => {
    localStorage.setItem(
      STORAGE.carts,
      JSON.stringify(cartsByUser)
    );
  }, [cartsByUser]);


  /*
    Combine API + manual products
  */

  const products =
    useMemo(() => {

      const apiList =
        apiProducts

          .filter(
            (product) =>
              !deletedProductIds.includes(
                product.id
              )
          )

          .map(
            (product) => {

              const updated =
                updatedProducts[
                  product.id
                ];


              return updated
                ? {
                    ...product,
                    ...updated,
                  }

                : product;

            }
          );


      return [
        ...apiList,
        ...manualProducts,
      ];

    }, [
      apiProducts,
      manualProducts,
      deletedProductIds,
      updatedProducts,
    ]);


  /*
    Only approved products
    appear publicly.
  */

  const publicProducts =
    products.filter(
      (product) =>
        product.status ===
        "approved"
    );


  /*
    ADD TO CART

    Product pages still receive this function through props,
    but the actual cart state is now handled by Redux.
  */

  const addToCart = (product) => {
    dispatch(
      addToCartAction({
        userId: cartUserKey,
        product,
      })
    );
  };


  /*
    WISHLIST

    Existing wishlist system remains
    unchanged for this phase.
  */

  const [wishlist, setWishlist] =
    useState(() =>
      readJSON(
        "mystore_wishlist",
        []
      )
    );


  const toggleWishlist = (product) => {

    setWishlist(
      (previous) => {

        const exists =
          previous.some(
            (item) =>
              String(item.id) ===
              String(product.id)
          );


        if (exists) {

          return previous.filter(
            (item) =>
              String(item.id) !==
              String(product.id)
          );

        }


        return [
          ...previous,
          product,
        ];

      }
    );

  };


  useEffect(() => {

    localStorage.setItem(
      "mystore_wishlist",
      JSON.stringify(
        wishlist
      )
    );

  }, [wishlist]);


  /*
    ADD PRODUCT
  */

  const addProduct =
    async (productData) => {

      if (!currentUser) {

        throw new Error(
          "Please login first."
        );

      }


      const isAdmin =
        currentUser.role ===
        "admin";


      const isSeller =
        currentUser.role ===
        "seller";


      if (
        !isAdmin &&
        !isSeller
      ) {

        throw new Error(
          "Only sellers and admins can add products."
        );

      }


      if (
        isSeller &&
        currentUser.sellerStatus !==
          "approved"
      ) {

        throw new Error(
          "Admin approval is required before selling."
        );

      }


      try {

        await axios.post(
          API_URL,
          productData
        );

      } catch {

        console.log(
          "Demo API POST failed; using local marketplace storage."
        );

      }


      const newProduct = {

        ...productData,

        id:
          `local-${Date.now()}`,

        ownerRole:
          currentUser.role,

        ownerId:
          currentUser.id,

        ownerName:
          currentUser.name,

        source:
          "manual",

        status:
          isAdmin
            ? "approved"
            : "pending",

        createdAt:
          new Date().toISOString(),

      };


      setManualProducts(
        (previous) => [

          ...previous,

          newProduct,

        ]
      );


      return newProduct;

    };


  /*
    UPDATE PRODUCT
  */

  const updateProduct =
    async (product) => {

      if (!currentUser) {

        throw new Error(
          "Please login first."
        );

      }


      const isAdmin =
        currentUser.role ===
        "admin";


      const isOwner =
        product.ownerId ===
        currentUser.id;


      if (
        !isAdmin &&
        !isOwner
      ) {

        throw new Error(
          "You can only update your own products."
        );

      }


      if (
        product.source ===
        "manual"
      ) {

        const updatedProduct = {

          ...product,

          status:
            isAdmin
              ? "approved"
              : "pending",

          updatedAt:
            new Date().toISOString(),

        };


        setManualProducts(
          (previous) =>

            previous.map(
              (item) =>

                String(item.id) ===
                String(product.id)

                  ? updatedProduct

                  : item
            )
        );


        return updatedProduct;

      }


      if (!isAdmin) {

        throw new Error(
          "You cannot update marketplace-owned products."
        );

      }


      try {

        await axios.put(
          `${API_URL}/${product.id}`,
          product
        );

      } catch {

        console.log(
          "Demo API PUT failed; using local update."
        );

      }


      setUpdatedProducts(
        (previous) => ({

          ...previous,

          [product.id]:
            product,

        })
      );


      return product;

    };


  /*
    DELETE PRODUCT
  */

  const deleteProduct =
    async (product) => {

      if (!currentUser) {

        throw new Error(
          "Please login first."
        );

      }


      const isAdmin =
        currentUser.role ===
        "admin";


      const isOwner =
        product.ownerId ===
        currentUser.id;


      if (
        !isAdmin &&
        !isOwner
      ) {

        throw new Error(
          "You can only delete your own products."
        );

      }


      if (
        product.source ===
        "manual"
      ) {

        setManualProducts(
          (previous) =>

            previous.filter(
              (item) =>
                String(item.id) !==
                String(product.id)
            )
        );


        return;

      }


      if (!isAdmin) {

        throw new Error(
          "Only admin can delete marketplace-owned products."
        );

      }


      try {

        await axios.delete(
          `${API_URL}/${product.id}`
        );

      } catch {

        console.log(
          "Demo API DELETE failed; using local deletion."
        );

      }


      setDeletedProductIds(
        (previous) => [

          ...previous,

          product.id,

        ]
      );

    };


  /*
    APPROVE PRODUCT
  */

  const approveProduct =
    (productId) => {

      setManualProducts(
        (previous) =>

          previous.map(
            (product) =>

              String(product.id) ===
              String(productId)

                ? {

                    ...product,

                    status:
                      "approved",

                    approvedAt:
                      new Date().toISOString(),

                  }

                : product
          )
      );

    };


  /*
    REJECT PRODUCT
  */

  const rejectProduct =
    (productId) => {

      setManualProducts(
        (previous) =>

          previous.map(
            (product) =>

              String(product.id) ===
              String(productId)

                ? {

                    ...product,

                    status:
                      "rejected",

                    rejectedAt:
                      new Date().toISOString(),

                  }

                : product
          )
      );

    };


  /*
    LOADING
  */

  if (loading) {

    return (

      <Box
        sx={{
          minHeight:
            "100vh",

          display:
            "flex",

          flexDirection:
            "column",

          alignItems:
            "center",

          justifyContent:
            "center",

          gap: 2,
        }}
      >

        <CircularProgress />

        <Typography>
          Loading marketplace...
        </Typography>

      </Box>

    );

  }


  /*
    ERROR
  */

  if (error) {

    return (

      <Box
        sx={{
          minHeight:
            "100vh",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          p: 3,
        }}
      >

        <Typography
          color="error"
          textAlign="center"
        >
          {error}
        </Typography>

      </Box>

    );

  }


  return (

    <>

      <Navbar
        wishlistCount={
          wishlist.length
        }
      />


      <Routes>

        <Route
          path="/"
          element={
            <Home
              products={
                publicProducts
              }

              addToCart={
                addToCart
              }

              wishlist={
                wishlist
              }

              toggleWishlist={
                toggleWishlist
              }
            />
          }
        />


        <Route
          path="/products"
          element={
            <Products
              products={
                publicProducts
              }

              addToCart={
                addToCart
              }

              wishlist={
                wishlist
              }

              toggleWishlist={
                toggleWishlist
              }
            />
          }
        />


        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={
                products
              }

              addToCart={
                addToCart
              }

              wishlist={
                wishlist
              }

              toggleWishlist={
                toggleWishlist
              }
            />
          }
        />


        <Route
          path="/cart"
          element={
            <Cart />
          }
        />


        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={
                wishlist
              }

              toggleWishlist={
                toggleWishlist
              }

              addToCart={
                addToCart
              }
            />
          }
        />


        <Route
          path="/checkout"
          element={
            <ProtectedRoute
              allowedRoles={[
                "customer",
                "seller",
                "admin",
              ]}
            >

              <Checkout />

            </ProtectedRoute>
          }
        />


        <Route
          path="/signin"
          element={
            <SignIn />
          }
        />


        <Route
          path="/signup"
          element={
            <SignUp />
          }
        />


        <Route
          path="/access-denied"
          element={
            <AccessDenied />
          }
        />


        <Route
          path="/seller"
          element={
            <ProtectedRoute
              allowedRoles={[
                "seller",
              ]}
            >

              <SellerDashboard
                products={
                  products
                }

                addProduct={
                  addProduct
                }

                updateProduct={
                  updateProduct
                }

                deleteProduct={
                  deleteProduct
                }
              />

            </ProtectedRoute>
          }
        />


        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >

              <AdminDashboard
                products={
                  products
                }

                addProduct={
                  addProduct
                }

                updateProduct={
                  updateProduct
                }

                deleteProduct={
                  deleteProduct
                }

                approveProduct={
                  approveProduct
                }

                rejectProduct={
                  rejectProduct
                }
              />

            </ProtectedRoute>
          }
        />


        <Route
          path="*"
          element={

            <Box
              sx={{
                p: 10,
                textAlign:
                  "center",
              }}
            >

              <Typography
                variant="h3"
                fontWeight={900}
              >
                404
              </Typography>

              <Typography>
                Page Not Found
              </Typography>

            </Box>

          }
        />

      </Routes>


      <Footer />

    </>

  );

}


function App() {

  return (

    <BrowserRouter>

      <AuthProvider>

        <MarketplaceApp />

      </AuthProvider>

    </BrowserRouter>

  );

}


export default App;