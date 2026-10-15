import {
  Link,
  useNavigate
} from "react-router-dom";

function Account({ user, onLogout }) {

  const navigate = useNavigate();


  function handleLogout() {
    onLogout();
    navigate("/login");
  }


  const allOrders = JSON.parse(
    localStorage.getItem("retechOrders") || "[]"
  );

  const userOrders = allOrders.filter(
    (order) => order.email === user.email
  );


  return (
    <main className="account-page">

      <div className="account-container">

        {/* PROFILE */}

        <section className="account-box">

          <div className="account-icon">
            👤
          </div>

          <p className="account-label">
            MY ACCOUNT
          </p>

          <h1>
            Welcome, {user.name}
          </h1>


          <div className="account-info">

            <div>
              <span>Name</span>

              <strong>
                {user.name}
              </strong>
            </div>


            <div>
              <span>Email</span>

              <strong>
                {user.email}
              </strong>
            </div>

          </div>


          <div className="account-actions">

            <Link
              to="/orders"
              className="account-action-button"
            >
              📦 My Orders
            </Link>


            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </section>


        {/* ORDER SUMMARY */}

        <section className="account-orders-preview">

          <div className="account-section-heading">

            <div>

              <p>
                ORDER HISTORY
              </p>

              <h2>
                Recent Orders
              </h2>

            </div>


            {userOrders.length > 0 && (

              <Link to="/orders">
                View All →
              </Link>

            )}

          </div>


          {userOrders.length === 0 ? (

            <div className="account-no-orders">

              <span>
                📦
              </span>

              <p>
                You haven't placed any orders yet.
              </p>

              <Link
                to="/products"
                className="shop-button"
              >
                Start Shopping
              </Link>

            </div>

          ) : (

            userOrders
              .slice(0, 3)
              .map((order) => (

                <div
                  className="mini-order"
                  key={order.id}
                >

                  <div>

                    <strong>
                      #{order.id}
                    </strong>

                    <span>
                      {order.date}
                    </span>

                  </div>


                  <div>

                    <span className="order-status">
                      {order.status}
                    </span>

                    <strong>
                      Rs{" "}
                      {order.total.toLocaleString()}
                    </strong>

                  </div>

                </div>

              ))

          )}

        </section>

      </div>

    </main>
  );
}

export default Account;