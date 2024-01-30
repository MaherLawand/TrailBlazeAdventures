import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import $ from "jquery";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import UserRoleTable from "./UserRoleTable";

import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DashboardTable({
  selectedMenuItem,
  columns,
  data,
  onDeleteUser,
  fetchAllUsers,
}) {
  const adjustedColumns = columns.map((column) => {
    // Remove spaces and lowercase only the first letter
    const adjustedColumn = column
      .replace(/\s+/g, "")
      .replace(/^(.)/, (match) => match.toLowerCase());

    return adjustedColumn;
  });

  const handleDeleteBtn = async (row) => {
    // Implement the delete logic using the row data
    console.log("Delete clicked for row:", row);
    if (selectedMenuItem === "Users") {
      var userId = row.userId;
      try {
        // Use $ajax to delete the user
        const response = await $.ajax({
          url: `http://localhost:5299/api/User/DeleteUserById/${userId}`,
          type: "DELETE",
          statusCode: {
            204: function () {
              // HTTP 204 No Content: Successful deletion
              onDeleteUser(userId);
              console.log(`User with ID ${userId} deleted successfully.`);
            },
            404: function () {
              // HTTP 404 Not Found: User not found
              console.log(`User with ID ${userId} not found.`);
            },
            500: function () {
              // HTTP 500 Internal Server Error
              console.log(
                `Internal Server Error during deletion of user with ID ${userId}.`
              );
            },
          },
        });

        // Additional check if the response status is not handled
        if (response === undefined) {
          console.log(
            `Unexpected response during deletion of user with ID ${userId}.`
          );
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      try {
        // Use $ajax to delete the user
        const response = await $.ajax({
          url: `http://localhost:5299/api/Guide/DeleteGuide/${userId}`,
          type: "DELETE",
          statusCode: {
            204: function () {
              // HTTP 204 No Content: Successful deletion
              console.log(`Guide with ID ${userId} deleted successfully.`);
            },
            404: function () {
              // HTTP 404 Not Found: User not found
              console.log(`Guide with ID ${userId} not found.`);
            },
            500: function () {
              // HTTP 500 Internal Server Error
              console.log(
                `Internal Server Error during deletion of user with ID ${userId}.`
              );
            },
          },
        });

        // Additional check if the response status is not handled
        if (response === undefined) {
          console.log(
            `Unexpected response during deletion of guide with ID ${userId}.`
          );
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      try {
        // Use $ajax to delete the user
        const response = await $.ajax({
          url: `http://localhost:5299/api/Member/DeleteMemberById/${userId}`,
          type: "DELETE",
          statusCode: {
            204: function () {
              // HTTP 204 No Content: Successful deletion
              console.log(`Member with ID ${userId} deleted successfully.`);
            },
            404: function () {
              // HTTP 404 Not Found: User not found
              console.log(`Member with ID ${userId} not found.`);
            },
            500: function () {
              // HTTP 500 Internal Server Error
              console.log(
                `Internal Server Error during deletion of member with ID ${userId}.`
              );
            },
          },
        });

        // Additional check if the response status is not handled
        if (response === undefined) {
          console.log(
            `Unexpected response during deletion of member with ID ${userId}.`
          );
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleAddBtn = () => {
    setIsUpdateMode(false);
    setIsModalOpen(true);

    setFormData({});
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      // Make sure to replace the URL with your actual API endpoint
      const apiUrl = "http://localhost:5299/api/User/CreateUser";

      // Perform the POST request to add a new user
      const response = await $.ajax({
        url: apiUrl,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
      });

      console.log("User added successfully:", response);

      // You can update your local state or perform any other actions as needed
    } catch (error) {
      if (error.status === 409) {
        try {
          const responseJson = JSON.parse(error.responseText);
          if (responseJson && responseJson.message) {
            alert(responseJson.message);
          } else {
            console.error("Unexpected error response:", responseJson);
          }
        } catch (jsonError) {
          console.error("Error parsing JSON response:", jsonError);
        }
      } else {
        // Handle other errors
        console.error(
          "Failed to add user. Server response:",
          error.responseText
        );
      }
    } finally {
      // Close the modal whether the request succeeds or fails
      await fetchAllUsers();
      handleModalToggle();
    }
  };

  const handleUpdateBtn = (row) => {
    // Set the modal to update mode, populate form data, and open the modal
    console.log(row);
    setIsUpdateMode(true);
    setSelectedUserId(row.userId);
    console.log(formData);
    setFormData(row);
    setIsModalOpen(true);
  };

  const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();
    try {
      // Make sure to replace the URL with your actual API endpoint
      let apiUrl = "http://localhost:5299/api/User/CreateUser";

      // If it's in update mode, switch to the update API endpoint
      if (isUpdateMode) {
        apiUrl = `http://localhost:5299/api/User/UpdateUserById/${selectedUserId}`;
      }
      // Perform the POST or PUT request to add or update the user
      const response = await $.ajax({
        url: apiUrl,
        type: isUpdateMode ? "PUT" : "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
      });

      console.log(
        `User ${isUpdateMode ? "updated" : "added"} successfully:`,
        response
      );
    } catch (error) {
      // Handle errors accordingly
      console.error(
        `Failed to ${isUpdateMode ? "update" : "add"} user. Server response:`,
        error.responseText
      );
    } finally {
      // Close the modal whether the request succeeds or fails
      await fetchAllUsers();
      setIsModalOpen(false);
    }
  };

  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
  const [selectedUserForRoles, setSelectedUserForRoles] = useState(null);
  const [userRolesData, setUserRolesData] = useState([]);

  const handleViewRoles = (row) => {
    // Set the user for whom roles are being viewed
    setSelectedUserForRoles(row);

    // Open the roles modal
    setIsRolesModalOpen(true);
  };

  const handleRolesModalToggle = () => {
    setIsRolesModalOpen(!isRolesModalOpen);
  };

  const fetchUserRoles = async (userId) => {
    try {
      const response = await $.ajax({
        url: `http://localhost:5299/api/UserRole/GetuserRolesById/${userId}`,
        type: "GET",
        dataType: "json",
      });

      // Assuming userRolesData is an array of roles for the user
      console.log("User Roles:", response.$values);

      // You can set the user roles data to a state variable for rendering in the modal
      setUserRolesData(response.$values);
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column}>{column}</StyledTableCell>
              ))}
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.$values.map((row, index) => (
              <StyledTableRow key={index}>
                {adjustedColumns.map((column) => (
                  <StyledTableCell key={column}>
                    {column === "dateOfBirth"
                      ? new Date(row[column]).toLocaleDateString()
                      : row[column]}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="right">
                  <Button
                    onClick={() => handleUpdateBtn(row)}
                    variant="contained"
                    style={{ marginRight: "8px" }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteBtn(row)}
                    variant="contained"
                    color="error"
                    style={{ marginRight: "8px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      handleViewRoles(row);
                      fetchUserRoles(row.userId);
                    }}
                    variant="contained"
                  >
                    View Roles
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        style={{ float: "right" }}
        color="success"
        onClick={handleAddBtn}
        variant="contained"
      >
        Add
      </Button>

      <Modal isOpen={isModalOpen} toggle={handleModalToggle} centered>
        <ModalHeader toggle={handleModalToggle}>Add User</ModalHeader>
        <ModalBody>
          <form onSubmit={handleAddOrUpdateUser}>
            <div className="mb-3" key="UserId">
              <TextField
                label="User Id"
                type="number"
                fullWidth
                value={formData?.userId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3" key="Name">
              <TextField
                label="Name"
                fullWidth
                value={formData?.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3" key="Email">
              <TextField
                label="Email"
                fullWidth
                value={formData?.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3" key="Password">
              <TextField
                label="Password"
                fullWidth
                value={formData?.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3" key="DateOfBirth">
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date Of Birth"
                  value={new Date(formData?.dateOfBirth || "")}
                  onChange={(date) =>
                    setFormData({ ...formData, dateOfBirth: date })
                  }
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date Of Birth"
                    onChange={(date) =>
                      setFormData({ ...formData, dateOfBirth: date })
                    }
                    value={dayjs(formData?.dateOfBirth)}
                    required
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="mb-3" key="Gender">
              {/* <TextField
          label="Gender"
          fullWidth
          value={formData?.gender || ""}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          required
        /> */}
              <FormControl fullWidth required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={formData?.gender || ""}
                  label="Gender"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
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
              <Button
                color="error"
                variant="outlined"
                onClick={handleModalToggle}
              >
                Cancel
              </Button>
              <Button type="submit" color="success" variant="contained">
                {isUpdateMode ? "Update User" : "Add User"}
              </Button>{" "}
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen={isRolesModalOpen} toggle={handleRolesModalToggle} centered>
        <ModalHeader toggle={handleRolesModalToggle}>
          View Roles for {selectedUserForRoles?.name}
        </ModalHeader>
        <ModalBody>
          <UserRoleTable
            userRolesData={userRolesData}
            fetchUserRoles={fetchUserRoles}
            selectedUserForRoles={selectedUserForRoles}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="error"
            variant="outlined"
            onClick={handleRolesModalToggle}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
