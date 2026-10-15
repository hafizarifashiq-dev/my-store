import ProductCard from "./ProductCard";

function ProductList({
  products,
  onAddToCart,
  wishlist,
  onToggleWishlist
}) {
  return (
    <div className="product-grid">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          onToggleWishlist={
            onToggleWishlist
          }
        />
      ))}

    </div>
  );
}

export default ProductList;