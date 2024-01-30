import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import $ from "jquery";

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

const MembersTable = ({ membersData,isEvent }) => {
  const [eventMembers, setEventMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeMember,setActiveMember] = useState(false);
  const handleGetEventMembers = (memberId) => {
    setActiveMember(true);
    setEvents([]);
    $.ajax({
      url: `http://localhost:5299/api/EventMember/GetEventMemberById/${memberId}`,
      type: "GET",
      dataType: "json",
      success: function (eventMembersResponse) {
        console.log(eventMembersResponse)
        setEventMembers(eventMembersResponse);
        // Immediately call getEventById for each event
        eventMembersResponse.$values.forEach((eventMember) => {
          handleGetEventById(eventMember.eventId);
        });
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Error fetching event members:", errorThrown);
      },
    });
  };

  const handleGetEventById = (eventId) => {
    $.ajax({
      url: `http://localhost:5299/api/Event/GetEventById/${eventId}`,
      type: "GET",
      dataType: "json",
      success: function (eventResponse) {
        setEvents((prevEvents) => [...prevEvents, eventResponse]);
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Error fetching event details:", errorThrown);
      },
    });
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Member ID</StyledTableCell>
            <StyledTableCell>Full Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Date of Birth</StyledTableCell>
            <StyledTableCell>Joining Date</StyledTableCell>
            <StyledTableCell>Mobile Number</StyledTableCell>
            <StyledTableCell>Nationality</StyledTableCell>
            <StyledTableCell>Photo</StyledTableCell>
            <StyledTableCell>Profession</StyledTableCell>
            {isEvent && <StyledTableCell>Actions</StyledTableCell> }
            {/* Add more columns as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {membersData.map((member) => (
            <StyledTableRow key={member.memberId}>
              <StyledTableCell>{member.memberId}</StyledTableCell>
              <StyledTableCell>{member.fullName}</StyledTableCell>
              <StyledTableCell>{member.email}</StyledTableCell>
              <StyledTableCell>{member.gender}</StyledTableCell>
              <StyledTableCell>
                {new Date(member.dateOfBirth).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell>
                {new Date(member.joiningDate).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell>{member.mobileNumber}</StyledTableCell>
              <StyledTableCell>{member.nationality}</StyledTableCell>
              <StyledTableCell> <img
                    src={`data:image/png;base64, ${member.photo}`} // Assuming the image format is PNG; adjust accordingly
                    alt="Guide Photo"
                    style={{
                      width: "100px", // Adjust the width as needed
                      height: "100px", // Adjust the height as needed
                      borderRadius: "50%",
                    }}
                  /></StyledTableCell>
              <StyledTableCell>{member.profession}</StyledTableCell>
              {isEvent && <StyledTableCell>
                <Button
                  variant="outlined"
                  onClick={() => handleGetEventMembers(member.memberId)}
                >
                  View Events
                </Button> 
              </StyledTableCell>}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      {membersData.length === 0 && (
        <Typography variant="h6" color="error" align="center">
          No active members.
        </Typography>
      )}
      <br />
      <br />
      <br />
      {/* Display Events Table */}
      <div>
        {isEvent && activeMember && <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Event ID</StyledTableCell>
                <StyledTableCell>Event Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Destination</StyledTableCell>
                <StyledTableCell>Date From</StyledTableCell>
                <StyledTableCell>Date To</StyledTableCell>
                <StyledTableCell>Cost</StyledTableCell>
                <StyledTableCell>eventStatus</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <StyledTableRow key={event.eventId}>
                  <StyledTableCell>{event.eventId}</StyledTableCell>
                  <StyledTableCell>{event.eventName}</StyledTableCell>
                  <StyledTableCell>{event.description}</StyledTableCell>
                  <StyledTableCell>{event.destination}</StyledTableCell>
                  <StyledTableCell>{event.dateFrom}</StyledTableCell>
                  <StyledTableCell>{event.dateTo}</StyledTableCell>
                  <StyledTableCell>{event.cost}</StyledTableCell>
                  <StyledTableCell>
                    {event.eventStatus ? "Active" : "Expired"}
                  </StyledTableCell>
                  {/* Add more cells as needed */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          {events.length === 0 && (
            <Typography variant="h6" color="error" align="center">
              No Joined Events.
            </Typography>
          )}
        </TableContainer> }
      </div>
      </>
  );
};

export default MembersTable;
