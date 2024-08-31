import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slice/authSlice";
import { RootState, AppDispatch } from "../store/index"; // Importa AppDispatch
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>(); // Usa il tipo AppDispatch
  const { loading, error, registrationSuccess } = useSelector((state: RootState) => state.auth);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(registerUser({ username, email, password })).unwrap();
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <form className="p-4 w-50" onSubmit={handleRegister}>
        <h3 className="text-center mt-3">
          Effettua la <span className="title1">Registrazione</span>
        </h3>
        <hr></hr>
        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label fw-bold">
            Username
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-user"></i> {/* Font Awesome Icon */}
            </span>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-envelope"></i> {/* Font Awesome Icon */}
            </span>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-lock"></i> {/* Font Awesome Icon */}
            </span>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div id="passwordHelpBlock" className="form-text">
            Your password must be at least 8 characters long.
          </div>
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary bt w-100" type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        {/* Success and Error Messages */}
        {registrationSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Registration successful!
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        <div className="text-center mt-5">
          <p className="text-secondary lh-base">
            Iscrivendoti, accetti le nostre <span className="lin">Condizioni.</span> Scopri in <br></br>
            che modo raccogliamo, usiamo e condividiamo i <br></br>
            tuoi dati nella nostra <span className="lin"> Informativa sulla privacy</span> e in <br></br>
            che modo usiamo cookie e tecnologie simili nella <br></br>
            nostra <span className="lin">Normativa sui cookie</span>.
          </p>
        </div>
        <div className="d-flex mt-5 justify-content-center">
          <p className="fw-bold">
            Hai un account?
            <Link className="text-decoration-none lin " to="/">
              {" "}
              Accedi
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
