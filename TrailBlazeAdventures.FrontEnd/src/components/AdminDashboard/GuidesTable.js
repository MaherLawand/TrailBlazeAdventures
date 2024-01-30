import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import $, { event } from "jquery"; // Import jQuery
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
import Checkbox from "@mui/material/Checkbox";

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

const GuidesTable = ({ guidesData, selectedMenuItem }) => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState({});
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [timeConflictMessage, setTimeConflictMessage] = useState("");

  const openAssignModal = (guide) => {
    setSelectedGuide(guide);
    getEventsByDate(guide); // Fetch events before opening modal
    setIsAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setSelectedEvents([]);
    setIsAssignModalOpen(false);
  };

  const [events, setEvents] = useState([]);

  const getEventsByDate = (guide) => {
    $.ajax({
      url: "http://localhost:5299/api/Event/GetActiveEventsByDate",
      method: "GET",
      dataType: "json",
      success: function (data) {
        const promises = data.$values.map((event) => {
          return hasUserJoinedEvent(guide.guideId, event.eventId).catch(
            (error) => {
              // Handle error for individual promise
              console.error("Error checking if user has joined event:", error);
              return false; // Assuming not joined in case of an error
            }
          );
        });

        Promise.all(promises)
          .then((results) => {
            const filteredEvents = data.$values.filter((event, index) => {
              return !results[index];
            });
            setEvents(filteredEvents);
          })
          .catch((error) => {
            console.error("Error in Promise.all:", error);
          });
      },
      error: function (error) {
        console.error("Error fetching events:", error);
      },
    });
  };

  const hasUserJoinedEvent = (guideId, eventId) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5299/api/EventGuide/GetByGuideandEventId/${guideId}/${eventId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
          resolve(data != null);
        },
        error: function (error) {
          console.error("Error checking if user has joined event:", error);
          reject(error);
        },
      });
    });
  };

  const handleCheckboxChange = (selectedEvent) => {
    // Check for time conflicts with already selected events
    const hasTimeConflict = selectedEvents.some(
      (selected) =>
        new Date(selected.dateFrom) <= new Date(selectedEvent.dateTo) &&
        new Date(selected.dateTo) >= new Date(selectedEvent.dateFrom) &&
        selected !== selectedEvent
    );

    if (!hasTimeConflict) {
      // Add or remove the event from the selectedEvents array based on checkbox state
      setSelectedEvents((prevSelectedEvents) => {
        const existingIndex = prevSelectedEvents.findIndex(
          (event) => event.eventId === selectedEvent.eventId
        );

        if (existingIndex === -1) {
          // Add the event to the selectedEvents array
          return [...prevSelectedEvents, selectedEvent];
        } else {
          // Remove the event from the selectedEvents array
          const updatedEvents = [...prevSelectedEvents];
          updatedEvents.splice(existingIndex, 1);
          return updatedEvents;
        }
      });

      setTimeConflictMessage(""); // Clear any previous conflict message
    } else {
      // Set the conflict message
      setTimeConflictMessage(
        "Time conflict detected! Please choose a different time."
      );
    }
  };

  const handleAssignEventGuide = () => {
    // Assuming you have the selected guideId stored in some variable (replace 'selectedGuideId' with the actual variable)

    // Map through all selected events and call the addEventGuide API
    selectedEvents.forEach(async (selectedEvent, index) => {
      console.log(index);
      const eventGuideData = {
        eventGuideId: index,
        eventId: selectedEvent.eventId,
        guideId: selectedGuide.guideId,
      };

      // Make the API call to addEventGuide
      await $.ajax({
        url: "http://localhost:5299/api/EventGuide/AddEventGuide", // Replace with your actual API URL
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(eventGuideData),
        success: function (response) {
          // Handle success, if needed
          console.log("Event guide added successfully:", response);
        },
        error: function (xhr, status, error) {
          // Handle error (e.g., show error message)
          console.error("Failed to add event guide:", error);
        },
      });
    });

    // Close the modal or perform any other necessary actions
    closeAssignModal();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Guide ID</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Date of Birth</StyledTableCell>
              <StyledTableCell>Joining Date</StyledTableCell>
              <StyledTableCell>Photo</StyledTableCell>
              <StyledTableCell>Profession</StyledTableCell>
              {selectedMenuItem && <StyledTableCell>Actions</StyledTableCell>}
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {guidesData.map((guide) => (
              <TableRow key={guide.guideId}>
                <StyledTableCell>{guide.guideId}</StyledTableCell>
                <StyledTableCell>{guide.fullName}</StyledTableCell>
                <StyledTableCell>{guide.email}</StyledTableCell>
                <StyledTableCell>
                  {new Date(guide.dateOfBirth).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(guide.joiningDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <img
                    src={`data:image/png;base64, ${guide.photo}`} // Assuming the image format is PNG; adjust accordingly
                    alt="Guide Photo"
                    style={{
                      width: "100px", // Adjust the width as needed
                      height: "100px", // Adjust the height as needed
                      borderRadius: "50%",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>{guide.profession}</StyledTableCell>
                {selectedMenuItem && (
                  <StyledTableCell>
                    {" "}
                    <Button
                      onClick={() => {
                        openAssignModal(guide);
                      }}
                      variant="contained"
                      color="success"
                    >
                      {" "}
                      Assign{" "}
                    </Button>{" "}
                  </StyledTableCell>
                )}
                {/* Add more cells as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {guidesData.length === 0 && (
          <Typography variant="h6" color="error" align="center">
            No active guides.
          </Typography>
        )}
      </TableContainer>
      <Modal isOpen={isAssignModalOpen} toggle={closeAssignModal} centered>
        <ModalHeader>Active Events</ModalHeader>
        <ModalBody>
          {/* Swiper Slider */}
          <Swiper
            breakpoints={{
              766: {
                slidesPerView: 1,
              },
              770: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
            slidesPerView={2}
          >
            {events.slice(0, 4).map((event, index) => (
              <SwiperSlide key={index}>
                {/* Event details and checkbox */}
                <div className="event-details">
                  <h3
                    style={{
                      color: "white",
                      fontFamily: "NeueMachina-Regular",
                      fontSize: "0.9em",
                    }}
                  >
                    {event.eventName}
                  </h3>
                  <p>
                    Date From:{" "}
                    <span style={{ color: "white" }}>
                      {" "}
                      {new Date(event.dateFrom).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Date To:
                    <span style={{ color: "white" }}>
                      {" "}
                      {new Date(event.dateTo).toLocaleDateString()}
                    </span>
                  </p>
                  <Checkbox
                    checked={selectedEvents.some(
                      (selected) => selected.eventId === event.eventId
                    )}
                    onChange={() => handleCheckboxChange(event)}
                  />
                  <br />
                  <br />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Assign Button */}
          <Button
            onClick={handleAssignEventGuide}
            style={{ float: "right" }}
            color="success"
            variant="contained"
          >
            Assign Guide
          </Button>
          {timeConflictMessage && (
            <ModalFooter> {timeConflictMessage} </ModalFooter>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default GuidesTable;
