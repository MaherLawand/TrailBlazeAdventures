import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
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
import { IconButton, Button, Menu, MenuItem } from "@mui/material";
import MembersTable from "./MembersTable";
import GuidesTable from "./GuidesTable";

import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, InputLabel, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EventsTable = ({ selectedMenuItem, columns, data, fetchAllEvents }) => {
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const adjustedColumns = columns.map((column) => {
    // Remove spaces and lowercase only the first letter
    const adjustedColumn = column
      .replace(/\s+/g, "")
      .replace(/^(.)/, (match) => match.toLowerCase());

    return adjustedColumn;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleAddEvent = () => {
    setIsUpdateMode(false);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleUpdateEvent = (row) => {
    console.log(row.eventId);
    setSelectedEventId(row.eventId);
    setIsUpdateMode(true);
    setFormData(row);
    setIsModalOpen(true);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleAddOrUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      if (new Date(formData.dateFrom) > new Date(formData.dateTo)) {
        alert("Error: Date From cannot be greater than Date To.");
        // You can show an error message to the user if needed.
        return;
      }
      let apiUrl = "http://localhost:5299/api/Event/AddEvent";
      if (isUpdateMode) {
        apiUrl = `http://localhost:5299/api/Event/UpdateEventById/${selectedEventId}`;
      }
      let formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await $.ajax({
        url: apiUrl,
        type: isUpdateMode ? "PUT" : "POST",
        contentType: false,
        processData: false,
        data: formDataToSend,
      });

      console.log(
        `Event ${isUpdateMode ? "updated" : "added"} successfully:`,
        response
      );
      await fetchAllEvents();
      handleModalToggle();
    } catch (error) {
      console.error(
        `Error ${isUpdateMode ? "updating" : "adding"} event:`,
        error
      );
    }
  };

  const handleDeleteBtn = async (row) => {
    // Implement the delete logic using the row data
    console.log("Delete clicked for row:", row);
    if (selectedMenuItem === "Events") {
      var eventId = row.eventId;
      try {
        // Use $ajax to delete the event
        const response = await $.ajax({
          url: `http://localhost:5299/api/Event/DeleteEvent/${eventId}`,
          type: "DELETE",
          statusCode: {
            204: function () {
              // HTTP 204 No Content: Successful deletion
              fetchAllEvents(eventId);
              console.log(`Event with ID ${eventId} deleted successfully.`);
            },
            404: function () {
              // HTTP 404 Not Found: Event not found
              console.log(`Event with ID ${eventId} not found.`);
            },
            500: function () {
              // HTTP 500 Internal Server Error
              console.log(
                `Internal Server Error during deletion of Event with ID ${eventId}.`
              );
            },
          },
        });

        // Additional check if the response status is not handled
        if (response === undefined) {
          console.log(
            `Unexpected response during deletion of Event with ID ${eventId}.`
          );
        }
      } catch (error) {
        console.error("Error deleting Event:", error);
      }
    }
  };

  const [activeTable, setActiveTable] = useState(null);

  const [eventMembers, setEventMembers] = useState([]);
  const [membersData, setMembersData] = useState([]);

  const handleFetchEventMembers = async (row) => {
    try {
      // Make AJAX request to fetch event members
      const eventMembersResponse = await $.ajax({
        url: `http://localhost:5299/api/EventMember/GetMemberIdsByEventId/${row.eventId}`,
        type: "GET",
        dataType: "json",
      });

      // Save event members in state
      setEventMembers(eventMembersResponse);

      // Iterate over event members and fetch detailed member data
      const membersDetails = await Promise.all(
        eventMembersResponse.$values.map(async (eventMember) => {
          const memberResponse = await $.ajax({
            url: `http://localhost:5299/api/Member/GetMemberById/${eventMember.memberId}`,
            type: "GET",
            dataType: "json",
          });

          return memberResponse;
        })
      );

      // Save detailed member data in state
      setMembersData(membersDetails);
    } catch (error) {
      console.error("Error fetching event members:", error);
    }
  };

  const handleViewMembers = async (row) => {
    // Set the user for whom roles are being viewed
    setActiveTable("members");
    setSelectedEvent(row);
    await handleFetchEventMembers(row);
    // Open the roles modal
    setIsMembersModalOpen(true);
  };

  const [eventGuides, setEventGuides] = useState([]);
  const [guidesData, setGuidesData] = useState([]);

  const handleFetchEventGuides = async (row) => {
    try {
      // Make AJAX request to fetch event guides
      const eventGuidesResponse = await $.ajax({
        url: `http://localhost:5299/api/EventGuide/GetGuideIdsByEventId/${row.eventId}`,
        type: "GET",
        dataType: "json",
      });

      // Save event guides in state
      setEventGuides(eventGuidesResponse);

      // Iterate over event guides and fetch detailed member data
      const guidesDetails = await Promise.all(
        eventGuidesResponse.$values.map(async (eventGuide) => {
          const guideResponse = await $.ajax({
            url: `http://localhost:5299/api/Guide/GetGuideById/${eventGuide.guideId}`,
            type: "GET",
            dataType: "json",
          });

          return guideResponse;
        })
      );

      // Save detailed member data in state
      setGuidesData(guidesDetails);
    } catch (error) {
      console.error("Error fetching event guides:", error);
    }
  };

  const handleViewGuides = async (row) => {
    setActiveTable("guides");
    // Set the user for whom roles are being viewed
    setSelectedEvent(row);
    await handleFetchEventGuides(row);
  };

  function updateFileName(e) {
    console.log(e.target);
    const wrapper = document.querySelector(".file-upload-wrapper");
    const fileName = e.target.files[0]?.name || "Select your file!";
    console.log(fileName);
    wrapper.setAttribute("data-text", fileName);
  }

  useEffect(() => {
    console.log("YES");
    console.log(formData);
  }, [formData]);

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
          {data.$values && data.$values.length > 0 ? (
            <TableBody>
              {data.$values.map((row, index) => (
                <StyledTableRow key={index}>
                  {adjustedColumns.map((column) => (
                    <StyledTableCell key={column}>
                      {column === "eventStatus"
                        ? row[column]
                          ? "Active"
                          : "Expired"
                        : column === "dateFrom"
                        ? new Date(row[column]).toLocaleDateString()
                        : column === "dateTo"
                        ? new Date(row[column]).toLocaleDateString()
                        : row[column]}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => handleUpdateEvent(row)}
                      style={{ marginRight: "8px" }}
                    >
                      Update
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => handleDeleteBtn(row)}
                      style={{ marginRight: "8px" }}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        handleViewGuides(row);
                      }}
                      style={{ marginRight: "8px" }}
                    >
                      Guides
                    </Button>
                    <Button
                      onClick={() => {
                        handleViewMembers(row);
                      }}
                    >
                      Members
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <TableRow>
              <StyledTableCell colSpan={columns.length + 1}>
                <Typography variant="h6" color="error" align="center">
                  No active Events.
                </Typography>
              </StyledTableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>

      <Button
        style={{ float: "right" }}
        color="success"
        variant="contained"
        onClick={handleAddEvent}
      >
        Add
      </Button>
      <br />
      <br />
      <br />

      <Modal isOpen={isModalOpen} toggle={handleModalToggle} centered>
        <ModalHeader toggle={handleModalToggle}>
          {isUpdateMode ? "Update Event" : "Add Event"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleAddOrUpdateEvent}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <h3 style={{ color: "black" }}>Event Details</h3>

                {/* Your form fields go here */}
                <div className="mb-3">
                  <TextField
                    fullWidth
                    id="EventId"
                    label="Event Id"
                    variant="outlined"
                    type="number"
                    value={
                      formData?.eventId !== undefined ? formData.eventId : ""
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, eventId: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    fullWidth
                    id="Name"
                    label="Name"
                    variant="outlined"
                    type="text"
                    value={formData?.eventName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, eventName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    fullWidth
                    id="Description"
                    label="Description"
                    variant="outlined"
                    type="text"
                    value={formData?.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className="dateee"
                  >
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Date From"
                        onChange={(date) =>
                          setFormData({
                            ...formData,
                            dateFrom: date ? date.toISOString() : "",
                          })
                        }
                        value={
                          formData.dateFrom ? dayjs(formData.dateFrom) : null
                        }
                        required
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="mb-3">
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className="dateee"
                  >
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Date To"
                        onChange={(date) =>
                          setFormData({
                            ...formData,
                            dateTo: date ? date.toISOString() : "",
                          })
                        }
                        value={formData.dateTo ? dayjs(formData.dateTo) : null}
                        required
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <h3 style={{ color: "black", opacity: "0" }}>Event Details</h3>
                <div className="mb-3">
                  <TextField
                    fullWidth
                    id="LookupId"
                    label="Lookup Id"
                    variant="outlined"
                    type="number"
                    value={
                      formData?.lookupId !== undefined ? formData.lookupId : ""
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, lookupId: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    fullWidth
                    id="Destination"
                    label="Destination"
                    variant="outlined"
                    type="text"
                    value={formData?.destination || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  {/* Add the file input component here */}
                  <div
                    className="file-upload-wrapper"
                    data-text="Select your file!"
                  >
                    <input
                      name="file-upload-field"
                      type="file"
                      id="photoInput"
                      className="file-upload-field"
                      accept="image/*"
                      onChange={(e) => {
                        updateFileName(e);
                        handleFileInputChange(e);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <TextField
                    fullWidth
                    id="Cost"
                    label="Cost"
                    variant="outlined"
                    type="text"
                    value={formData?.cost || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, cost: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <FormControl fullWidth required>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="Status"
                      name="Status"
                      value={formData?.eventStatus ? "Active" : "Expired"}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          eventStatus: e.target.value === "Active",
                        });
                      }}
                      required
                    >
                      <MenuItem value="">
                        <em>Select Status</em>
                      </MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Expired">Expired</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <ModalFooter>
              <Button
                color="error"
                variant="outlined"
                onClick={handleModalToggle}
              >
                Cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                {isUpdateMode ? "Update Event" : "Add Event"}
              </Button>{" "}
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>

      {activeTable === "members" && selectedEvent && (
        <MembersTable
          eventId={selectedEvent.eventId}
          membersData={membersData}
          isEvent={false}
        />
      )}

      {activeTable === "guides" && selectedEvent && (
        <GuidesTable
          eventId={selectedEvent.eventId}
          guidesData={guidesData}
          selectedMenuItem={false}
        />
      )}
    </>
  );
};

export default EventsTable;
