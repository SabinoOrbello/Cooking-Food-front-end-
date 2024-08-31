import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slice/loginSlice";
import { RootState, AppDispatch } from "../store";
import { Link, useNavigate } from "react-router-dom";
// Componente di login
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.login);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      if (isAuthenticated) {
        navigate("/main");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <form className="p-4 w-50" onSubmit={handleLogin}>
        <h3 className="text-center mt-3">
          Effettua il <span className="title1">Login</span>
        </h3>
        <hr></hr>
        <div className="form-group mb-3">
          <label className="form-label fw-bold">
            Email:
            <div className="input-group">
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
        </div>
        <div className="form-group mb-3">
          <label className="form-label fw-bold">
            Password:
            <div className="input-group">
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
        </div>
        <button className="btn btn-primary bt" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div className="d-flex mt-5 ">
          <p className="fw-bold">
            Non hai un account?
            <Link className="text-decoration-none lin " to="/register">
              {" "}
              Registrati
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
