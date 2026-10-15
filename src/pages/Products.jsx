import { useMemo, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
function Products({ products, addToCart, wishlist, toggleWishlist }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesPrice =
        !maxPrice || Number(product.price) <= Number(maxPrice);
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, category, maxPrice]);
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {" "}
      <Box sx={{ mb: 4 }}>
        {" "}
        <Typography variant="h3" fontWeight={900}>
          {" "}
          Marketplace{" "}
        </Typography>{" "}
        <Typography color="text.secondary">
          {" "}
          Discover products from MyStore and independent sellers.{" "}
        </Typography>{" "}
      </Box>{" "}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        {" "}
        <TextField
          fullWidth
          label="Search products"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />{" "}
        <FormControl sx={{ minWidth: { xs: "100%", md: 220 } }}>
          {" "}
          <InputLabel> Category </InputLabel>{" "}
          <Select
            value={category}
            label="Category"
            onChange={(event) => setCategory(event.target.value)}
          >
            {" "}
            <MenuItem value="all"> All Categories </MenuItem>{" "}
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {" "}
                {item}{" "}
              </MenuItem>
            ))}{" "}
          </Select>{" "}
        </FormControl>{" "}
        <TextField
          sx={{ minWidth: { xs: "100%", md: 180 } }}
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
        />{" "}
      </Stack>{" "}
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {" "}
        Showing {filteredProducts.length} products{" "}
      </Typography>{" "}
      <Grid container spacing={3}>
        {" "}
        {filteredProducts.map((product) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
            key={product.id}
          >
            {" "}
            <ProductCard
              product={product}
              addToCart={addToCart}
              isWishlisted={wishlist.some(
                (item) => String(item.id) === String(product.id),
              )}
              toggleWishlist={toggleWishlist}
            />{" "}
          </Grid>
        ))}{" "}
      </Grid>{" "}
      {filteredProducts.length === 0 && (
        <Typography textAlign="center" sx={{ py: 8 }}>
          {" "}
          No products found.{" "}
        </Typography>
      )}{" "}
    </Container>
  );
}
export default Products;
