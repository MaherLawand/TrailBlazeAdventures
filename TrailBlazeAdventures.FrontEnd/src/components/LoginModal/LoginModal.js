import React, { useState, useContext, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import RegisterModal from "components/RegisterModal/RegisterModal";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import UserContext from "components/UserContext/UserContext";
import UserRoleContext from "components/UserContext/UserRoleContext";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const LoginModal = ({ isOpen, toggle }) => {
  const [user, setUser] = useContext(UserContext);
  const [userRoles, setUserRoles] = useContext(UserRoleContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = () => {
    // Assuming email and password are the state variables
    const userEmail = email;
    const userPassword = password; // assuming password is a state variable

    $.ajax({
      url: `http://localhost:5299/api/User/GetUserByEmail/${userEmail}`,
      type: "GET",
      success: function (response) {
        // Check if the user exists based on the response
        if (response) {
          // User exists, now check if the passwords match
          if (response.password === userPassword) {
            toggle();
            setUser(response);

            // Call the function to get user roles based on userId
            getUserRoles(response.userId);

            // Passwords match, login successful
            console.log("Login successful:", response);

            // You may want to store user information in state or context here
          } else {
            // Passwords do not match, handle login failure
            console.log("Incorrect password");
          }
        } else {
          // User not found, handle login failure
          console.log("User not found");
        }
      },
      error: function (xhr, status, error) {
        // Handle login failure (e.g., show error message)
        console.log("Login failed:", error);
      },
    });
  };

  const getUserRoles = (userId) => {
    $.ajax({
      url: `http://localhost:5299/api/UserRole/GetuserRolesById/${parseInt(
        userId
      )}`,
      type: "GET",
      success: function (response) {
        // Handle the retrieved user roles, e.g., store them in state or context
        console.log("User roles:", response);

        // Map through response.$values and extract roleName values
        const userRoles = response.$values.map((role) => role.roleName);

        // Set user roles in state or context
        setUserRoles(userRoles);
        // You may want to set user roles in state or context here
      },
      error: function (xhr, status, error) {
        // Handle error (e.g., show error message)
        console.log("Failed to get user roles:", error);
      },
    });
  };

  const handleRegister = () => {
    setShowLogin(false);
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleRegisterModalClose = () => {
    setShowLogin(true);
  };

  return (
    <>
      {showLogin ? (
        <Modal isOpen={isOpen} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Login</ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                {/* <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                /> */}
                <TextField
                  id="standard-multiline-flexible"
                  label="Email"
                  multiline
                  maxRows={3}
                  variant="standard"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                {/* <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /> */}
                <TextField
                  id="standard-multiline-flexible"
                  label="Password"
                  multiline
                  maxRows={3}
                  variant="standard"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
                <br/>
            <Button
              onClick={showLogin ? handleLogin : handleRegister}
              className="mr-2" variant="contained"
            >
              {showLogin ? "Login" : "Register"}
            </Button>
            <Button  onClick={toggleForm} variant="contained">
              {showLogin ? "Register" : "Login"}
            </Button>
          </ModalBody>
        </Modal>
      ) : (
        // Register Form (using your RegisterModal component)
        <RegisterModal
          isOpen={isOpen}
          toggle={toggle}
          onClose={handleRegisterModalClose}
        />
      )}
    </>
  );
};

export default LoginModal;
