import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "../CommonComponents/Style";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost/demo/login.php", {
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Response from server: ", result);

      if (result.success) {
        // Notify the user
        toast.success("Login successful!");
        const role = result.user.role;
        console.log(role)
        // Store user data in sessionStorage
        localStorage.setItem("user", role);
        localStorage.setItem("user1", JSON.stringify(result.user))
        sessionStorage.setItem("user", result.user)
        //   // Redirect to home page
        setTimeout(() => {
          navigate("/");
          window.location.reload();

        }, [1000]);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  if (formData.username == "admin" && formData.password == "admin123") {
    toast.success("Admin Login successful!");
    const role = "Super Admin";
    // console.log(role)
    // Store user data in sessionStorage
    localStorage.setItem("admin", role);

    setTimeout(() => {
      navigate("/Dashboard")
      window.location.reload();

    }, [1000]);
  }
  return (
    <>
      <section className="login_box_area section_gap">
        <ToastContainer position="top-center" />
        <Style />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login_box_img">
                <img className="img-fluid" src="img/login.jpg" alt="" />
                <div className="hover">
                  <h4>New to our website?</h4>
                  <p>
                    Discover a range of options and opportunities available for
                    Auctioneers, Bidders, and Administrators.
                  </p>
                  <a className="primary-btn" href="/Register">
                    Create an Account
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login_form_inner">
                <h3>Log in to enter</h3>
                <form className="row login_form" onSubmit={handleSubmit}>
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Email"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {error && (
                    <div className="col-md-12 form-group">
                      <p style={{ color: "red" }}>{error}</p>
                    </div>
                  )}
                  <div className="col-md-12 form-group">
                    <button type="submit" className="primary-btn">
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Login;