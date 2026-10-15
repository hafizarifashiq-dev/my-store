import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("retechUser")
    );

    if (!savedUser) {
      setError(
        "No account found. Please create an account first."
      );
      return;
    }

    if (
      savedUser.email !== email ||
      savedUser.password !== password
    ) {
      setError(
        "Email or password is incorrect."
      );
      return;
    }

    onLogin(savedUser);

    navigate("/account");
  }

  return (
    <main className="auth-page">

      <div className="auth-box">

        <div className="auth-heading">

          <p>WELCOME BACK</p>

          <h1>Login</h1>

          <span>
            Login to your ReTech account
          </span>

        </div>


        <form onSubmit={handleSubmit}>

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>


        <p className="auth-switch">

          Don't have an account?

          {" "}

          <Link to="/signup">
            Create Account
          </Link>

        </p>

      </div>

    </main>
  );
}

export default Login;