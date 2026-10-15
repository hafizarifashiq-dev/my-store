import { Link } from "react-router-dom";

function ProductCard({
  product,
  onAddToCart,
  wishlist,
  onToggleWishlist
}) {
  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <div className="product-card">

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

        <span className="product-category">
          {product.category}
        </span>

        <span className="sale-badge">
          -{discount}%
        </span>

        <button
          className={`wishlist-button ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() =>
            onToggleWishlist(product)
          }
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

      </div>

      <div className="product-info">

        <h3>{product.name}</h3>

        <div className="card-rating">
          ★★★★★
          <span>{product.rating}</span>
        </div>

        <div className="price-box">

          <p className="price">
            Rs{" "}
            {product.price.toLocaleString()}
          </p>

          <p className="old-price">
            Rs{" "}
            {product.oldPrice.toLocaleString()}
          </p>

        </div>

        <p className="stock-text">
          {product.stock} available
        </p>

        <div className="card-actions">

          <Link
            to={`/products/${product.id}`}
            className="details-button"
          >
            View Details
          </Link>

          <button
            className="add-cart-button"
            onClick={() =>
              onAddToCart(product)
            }
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;