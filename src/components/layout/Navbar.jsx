import { Link } from "react-router-dom";

function Navbar({
  cartCount,
  wishlistCount,
  user
}) {
  return (
    <nav className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="logo"
        >
          ReTech
        </Link>


        <div className="nav-links">

          <Link
            to="/"
            className="nav-link"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="nav-link"
          >
            Products
          </Link>


          <Link
            to="/wishlist"
            className="wishlist-link"
          >
            ❤️

            <span className="nav-count">
              {wishlistCount}
            </span>
          </Link>


          <Link
            to="/cart"
            className="cart-link"
          >
            🛒 Cart

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>


          {user ? (

            <Link
              to="/account"
              className="account-link"
            >
              👤 {user.name}
            </Link>

          ) : (

            <Link
              to="/login"
              className="login-link"
            >
              Login
            </Link>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;