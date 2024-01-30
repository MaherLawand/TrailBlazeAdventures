import React, { useEffect, useState, useContext } from "react";
import { IconButton, Button, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import $ from "jquery";
import { Container, Row, Col, Modal, ModalBody } from "reactstrap";
import UserContext from "components/UserContext/UserContext";

import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, InputLabel, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const UserRoleTable = ({
  userRolesData,
  onDeleteUserRole,
  fetchUserRoles,
  selectedUserForRoles,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDeleteUserRole = (userId, roleId) => {
    $.ajax({
      url: `http://localhost:5299/api/UserRole/DeleteSpecificUserRole/${userId}/${roleId}`,
      type: "DELETE",
      success: function () {
        fetchUserRoles(userId);
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Error deleting user role:", errorThrown);
      },
    });
  };

  const handleAddUserRole = (userId, roleName) => {
    $.ajax({
      url: "http://localhost:5299/api/UserRole/CreateUserRole",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        userRoleId: 0,
        userId: userId,
        roleId: roleName === "Admin" ? 2 : 1,
        roleName: roleName,
      }),
      success: function (response) {
        // Handle success if needed
        fetchUserRoles(userId);
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Error adding user role:", errorThrown);
      },
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleGuide = async (guideId) => {
    try {
      const response = await $.ajax({
        url: `http://localhost:5299/api/Guide/GetGuideById/${guideId}`,
        type: "GET",
      });

      // Log the entire response object
      console.log(response);

      // Guide found, return true
      return true;
    } catch (error) {
      // Handle other errors
      // Check if guide is not found
      if (error.status === 404) {
        // Guide not found, return false
        console.log("Guide not found");
        return false;
      }

      // Log and rethrow other errors
      console.error("Error fetching guide:", error);
      throw error;
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const closeModal = () => {
    handleClose();
    setIsModalOpen(false);
  };
  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    joiningDate: "",
    mobileNumber: "",
    emergencyNumber: "",
    photo: "",
    profession: "",
    nationality: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [id]: value,
    }));
  };
  const handleDateInputChange = (selectedDate) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      joiningDate: dayjs(selectedDate.$d).format("YYYY-MM-DDTHH:mm:ss"),
    }));
  };

  useEffect(() => {
    userInput.email = selectedUserForRoles ? selectedUserForRoles.email : "";
    userInput.dateOfBirth = selectedUserForRoles
      ? selectedUserForRoles.dateOfBirth
      : "";
    userInput.password = selectedUserForRoles
      ? selectedUserForRoles.password
      : "";
    userInput.gender = selectedUserForRoles ? selectedUserForRoles.gender : "";
    console.log(userInput);
  }, [userInput]);

  const handleRegisterMember = async (e) => {
    e.preventDefault();
    const MemberformData = new FormData();
    MemberformData.append("memberId", selectedUserForRoles.userId);
    MemberformData.append("fullName", userInput.fullName);
    MemberformData.append("email", userInput.email);
    MemberformData.append("password", userInput.password);
    MemberformData.append("dateOfBirth", userInput.dateOfBirth);
    MemberformData.append("gender", userInput.gender);
    MemberformData.append("joiningDate", userInput.joiningDate);
    MemberformData.append("mobileNumber", userInput.mobileNumber);
    MemberformData.append("emergencyNumber", userInput.emergencyNumber);
    MemberformData.append(
      "photo",
      document.getElementById("photoInput").files[0]
    );
    MemberformData.append("profession", userInput.profession);
    MemberformData.append("nationality", userInput.nationality);
    console.log(userInput.emergencyNumber);
    try {
      await $.ajax({
        url: `http://localhost:5299/api/Member/AddMember`,
        type: "POST",
        type: "POST",
        contentType: false,
        processData: false,
        data: MemberformData,
        success: function (response) {
          // Log the entire response object
          console.log(response);
          setIsModalOpen(false);
          setModalOpen(true);
          if (response.status === 200) {
            // Member found, do something else if needed
          }
        },
        error: function (xhr, status, error) {
          // Handle other errors
          console.error("error:", xhr);
          console.log(error);
        },
      });
    } catch (error) {
      console.log("Error: " + error);
    }
    const GuideformData = new FormData();
    GuideformData.append("guideId", selectedUserForRoles.userId);
    GuideformData.append("fullName", userInput.fullName);
    GuideformData.append("email", userInput.email);
    GuideformData.append("password", userInput.password);
    GuideformData.append("dateOfBirth", userInput.dateOfBirth);
    GuideformData.append("joiningDate", userInput.joiningDate);
    GuideformData.append(
      "photo",
      document.getElementById("photoInput").files[0]
    );
    GuideformData.append("profession", userInput.profession);
    try {
      await $.ajax({
        url: `http://localhost:5299/api/Guide/AddGuide`,
        type: "POST",
        contentType: false,
        processData: false,
        data: GuideformData,
        success: function (response) {
          // Log the entire response object
          console.log(response);
          setIsModalOpen(false);
          setModalOpen(true);
          if (response.status === 200) {
            // Member found, do something else if needed
          }
        },
        error: function (xhr, status, error) {
          // Handle other errors
          console.error("error:", xhr);
          console.log(error);
        },
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  function updateFileName(e) {
    console.log(e.target);
    const wrapper = document.querySelector(".file-upload-wrapper");
    const fileName = e.target.files[0]?.name || "Select your file!";
    console.log(fileName);
    wrapper.setAttribute("data-text", fileName);
  }

  return (
    <>
      {userRolesData.map((userRole) => (
        <div
          key={userRole.userRoleId}
          style={{
            display: "flex",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            <p
              style={{
                color: "white",
                marginTop: "20px",
                boxSizing: "border-box",
              }}
            >
              {userRole.roleName}
            </p>{" "}
          </div>
          <IconButton
            aria-label="delete"
            onClick={() =>
              handleDeleteUserRole(userRole.userId, userRole.roleId)
            }
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      {/* Add more roles button */}
      {!(
        userRolesData.some((role) => role.roleName === "Admin") &&
        userRolesData.some((role) => role.roleName === "Guide")
      ) && (
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ marginTop: "10px" }}
        >
          Add More Roles
        </Button>
      )}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!userRolesData.some((role) => role.roleName === "Admin") && (
          <MenuItem
            onClick={() => {
              handleAddUserRole(userRolesData[0]?.userId, "Admin");
              handleClose();
            }}
          >
            Admin
          </MenuItem>
        )}
        {!userRolesData.some((role) => role.roleName === "Guide") && (
          <MenuItem
            onClick={async () => {
              const guideFound = await handleGuide(selectedUserForRoles.userId);
              console.log(guideFound);
              if (!guideFound) {
                console.log("SDF");
                // Guide not found, open registration modal
                handleClose();
                setIsModalOpen(true);
              } else {
                console.log("Dsf");
                // Guide found, add Guide role
                handleAddUserRole(userRolesData[0]?.userId, "Guide");
                handleClose();
              }
            }}
          >
            Guide
          </MenuItem>
        )}
      </Menu>
      <Modal isOpen={isModalOpen} toggle={closeModal} centered>
        <ModalBody>
          {/* Registration form */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <h3 style={{ color: "black" }}>Become A Member</h3>

              {/* Your registration form fields go here */}
              <div className="mb-3">
                <TextField
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  variant="outlined"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                {/* <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  
                  onChange={handleInputChange}
                /> */}
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={selectedUserForRoles ? selectedUserForRoles.email : ""}
                  onChange={handleInputChange}
                  required
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
                  placeholder="Enter your password"
                  value={
                    selectedUserForRoles ? selectedUserForRoles.password : ""
                  }
                  onChange={handleInputChange}
                /> */}
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={handleInputChange}
                  value={
                    selectedUserForRoles ? selectedUserForRoles.password : ""
                  }
                  required
                />
              </div>

              <div className="mb-3">
                {/* <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="dateOfBirth"
                  value={
                    selectedUserForRoles ? selectedUserForRoles.dateOfBirth : ""
                  }
                  onChange={handleInputChange}
                /> */}
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className="dateee"
                >
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Date Of Birth"
                      onChange={handleInputChange}
                      value={dayjs(
                        selectedUserForRoles
                          ? selectedUserForRoles.dateOfBirth
                          : ""
                      )}
                      required
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="mb-3">
                {/* <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  placeholder="Enter your gender"
                  value={
                    selectedUserForRoles ? selectedUserForRoles.gender : ""
                  }
                  onChange={handleInputChange}
                /> */}
                <FormControl fullWidth required>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    value={
                      selectedUserForRoles ? selectedUserForRoles.gender : ""
                    }
                    label="Gender"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Select Gender</em>
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="mb-3">
                {/* <label htmlFor="joiningDate" className="form-label">
                  Joining Date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="joiningDate"
                  onChange={handleInputChange}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Joining Date"
                      onChange={handleDateInputChange}
                      required
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="mb-3">
                {/* <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNumber"
                  placeholder="Enter your mobile number"
                  onChange={handleInputChange}
                /> */}
                <TextField
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                {/* <label htmlFor="emergencyNumber" className="form-label">
                  Emergency Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyNumber"
                  placeholder="Enter your emergency number"
                  onChange={handleInputChange}
                /> */}
                <TextField
                  fullWidth
                  id="emergencyNumber"
                  label="Emergency Number"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                {/* <label htmlFor="photo" className="form-label">
                  Photo
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  id="photoInput"
                  placeholder="Enter the URL of your photo"
                  onChange={handleInputChange}
                /> */}
                <div class="file-upload-wrapper" data-text="Select your file!">
                  <input
                    name="file-upload-field"
                    type="file"
                    id="photoInput"
                    className="file-upload-field"
                    accept="image/*"
                    onChange={(e) => {
                      updateFileName(e);
                      handleInputChange(e);
                    }}
                  />
                </div>
              </div>

              <div className="mb-3">
                {/* <label htmlFor="profession" className="form-label">
                  Profession
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="profession"
                  placeholder="Enter your profession"
                  onChange={handleInputChange}
                /> */}
                <TextField
                  fullWidth
                  id="profession"
                  label="Profession"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                {/* <label htmlFor="nationality" className="form-label">
                  Nationality
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nationality"
                  placeholder="Enter your nationality"
                  onChange={handleInputChange}
                /> */}
                <TextField
                  fullWidth
                  id="nationality"
                  label="Nationality"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={handleRegisterMember}
              >
                Register
              </button>
            </Grid>
          </Grid>
        </ModalBody>
      </Modal>
    </>
  );
};

export default UserRoleTable;
