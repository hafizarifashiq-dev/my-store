import { Link } from "react-router-dom";

function Orders({ user }) {
  const allOrders = JSON.parse(
  localStorage.getItem("retechOrders") || "[]"
);

const orders = allOrders.filter(
  (order) => order.email === user.email
);

  return (
    <main className="orders-page">

      <div className="orders-heading">

        <p>MY ACCOUNT</p>

        <h1>My Orders</h1>

        <span>
          View your previous orders and
          purchase details.
        </span>

      </div>


      {orders.length === 0 ? (

        <div className="no-orders">

          <div className="no-orders-icon">
            📦
          </div>

          <h2>No Orders Yet</h2>

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

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-header">

                <div>

                  <span>
                    Order ID
                  </span>

                  <strong>
                    #{order.id}
                  </strong>

                </div>


                <div>

                  <span>
                    Date
                  </span>

                  <strong>
                    {order.date}
                  </strong>

                </div>


                <div>

                  <span>
                    Status
                  </span>

                  <strong className="order-status">
                    {order.status}
                  </strong>

                </div>

              </div>


              <div className="order-products">

                {order.items.map((item) => (

                  <div
                    className="order-product"
                    key={item.id}
                  >

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                    </div>


                    <strong>
                      Rs{" "}
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </strong>

                  </div>

                ))}

              </div>


              <div className="order-footer">

                <span>
                  Total Amount
                </span>

                <strong>
                  Rs{" "}
                  {order.total.toLocaleString()}
                </strong>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}

export default Orders;