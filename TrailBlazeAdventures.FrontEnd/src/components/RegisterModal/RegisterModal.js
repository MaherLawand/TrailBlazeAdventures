// RegisterModal.js
import React, { useState, useContext, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import $ from "jquery";
import UserContext from "components/UserContext/UserContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const RegisterModal = ({ isOpen, toggle, onClose }) => {
  const [user, setUser] = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if required fields are empty
    if (!name || !email || !password || !dob || !gender) {
      console.error('All required fields must be filled');
      return;
    }
    // Implement your registration logic here
    console.log("Registration clicked");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("DOB:", dob);
    console.log("Gender:", gender);

    // Use $.ajax for registration
    $.ajax({
      url: "http://localhost:5299/api/User/CreateUser",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        name: name,
        email: email,
        password: password,
        dateOfBirth: dob,
        gender: gender,
      }),
      success: function (response) {
        // Registration successful
        console.log("Registration successful:", response);

        // Close the modal
        onClose();

        // Set user data (if needed)
        setUser(response);
      },
      error: function (xhr, status, error) {
        if (xhr.status === 409) {
          // HTTP status code 409 indicates conflict (user already exists)
          alert("User with the specified email already exists.");
        } else {
          // Handle other registration failures (e.g., show a generic error message)
          console.log("Registration failed:", error);
        }
      },
    });
  };
  useEffect(() => {
    console.log(dob);
  }, [dob]);
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Register</ModalHeader>
      <ModalBody>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <TextField
              id="standard-multiline-flexible"
              label="Name"
              multiline
              maxRows={3}
              variant="standard"
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              id="standard-multiline-flexible"
              label="Email"
              multiline
              maxRows={3}
              variant="standard"
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              id="standard-multiline-flexible"
              label="Password"
              multiline
              maxRows={3}
              variant="standard"
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Date Of Birth"
                  onChange={(e) => setDob(e.$d)}
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="mb-3">
            <FormControl fullWidth required>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select Gender</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <ModalFooter>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default RegisterModal;
