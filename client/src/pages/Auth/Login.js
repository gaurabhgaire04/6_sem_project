import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      //   if (res.data.success) {
      //     toast.success(res.data && res.data.message);
      //     setAuth({
      //       ...auth,
      //       user: res.data.user,
      //       token: res.data.token,
      //     });
      //     localStorage.setItem("auth", JSON.stringify(res.data));

      //     navigate(location.state || "/");
      //   } else {
      //     toast.error(res.data.message);
      //   }
      if (res.data.success) {
        toast.success(res.data && res.data.message);

        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong..");
    }
    // console.log(name, email, password, phone, address);
    toast.success("Login Successfully");
  };

  return (
    <Layout title={"Watch Nexus-Login"}>
      <div className="form-container">
        <h1 className="tt">Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3"></div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputname"
              placeholder="enter your email.."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter your password.."
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
