import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
      <div className="login">
        <div className="container"> 
        <div className="row d-flex justify-content-center">
        <div className="col-md-4">
        <h4>  Ready2Move </h4>
        <div className="mb-3">
          <input
            type="text"
            class="form-control form-control-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            required
          />
        </div>
        <div className="mb-3">
          <input
          
            type="password"
            class="form-control form-control-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <button
            className="btn btn-secondary"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
          </button>
          </div>
          <div className="mb-3">
          <button
            className="btn btn-primary"
            onClick={signInWithGoogle}>
              Login with Google
          </button>
          </div>
          <div className="mb-3">
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
          </div>
        </div>
      </div>
      </div>
      </div>
  );
}

export default Login;
