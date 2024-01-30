import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Slide, Zoom, Fade } from "react-reveal";
import Typography from "@material-ui/core/Typography";
import UserContext from "components/UserContext/UserContext";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Button from "@mui/material/Button";

const Event = () => {
  const [user, setUser] = useContext(UserContext);
  const location = useLocation();
  const { item } = location.state;

  var pic = `data:image/jpeg;base64, ${item.photo}`;
  var img = new Image();
  img.src = pic;

  const containerStyle = {
    backgroundImage: "url('" + img.src + "')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "80%",
    margin: "auto",
    marginTop: "100px",
    background: "rgba(255, 255, 255, 0.7)",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const leftColumnStyle = {
    padding: "20px",
    width: "50%",
  };

  const rightColumnStyle = {
    padding: "20px",
    width: "50%",
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
      console.log(guidesDetails);

      // Save detailed member data in state
      setGuidesData(guidesDetails);
    } catch (error) {
      console.error("Error fetching event guides:", error);
    }
  };

  const [memberId, setMemberId] = useState(user ? user.userId : null);
  const handleJoin = async () => {
    try {
      // Call your API to get member by ID
      await $.ajax({
        url: `http://localhost:5299/api/Member/GetMemberById/${memberId}`,
        type: "GET",
        success: async function (response) {
          // Log the entire response object
          console.log(response);
          await handleJoinEvent();
        },
        error: function (xhr, status, error) {
          // Handle other errors
          // Check if member is not found
          if (xhr.status === 404) {
            // Open the registration modal
            console.log("Member not found");
          }
          console.error("error:", xhr);
        },
      });
    } catch (error) {
      // Handle other errors
      console.error("Error:", error);
    }
  };

  const [alreadyMember, setAlreadyMember] = useState({});
  const handleJoinEvent = async () => {
    try {
      // Check if the event and user information is available
      if (!item.eventId || !user.userId) {
        console.error("Event ID or User ID not available.");
        return;
      }

      // Call your API to add the user as a member to the event
      await $.ajax({
        url: "http://localhost:5299/api/EventMember/AddEventMember",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          memberId: user.userId,
          eventId: item.eventId,
          // Add other properties if needed
        }),
        success: async function (response) {
          setAlreadyMember((prev) => ({ ...prev, [item.eventId]: true }));
        },
      });
    } catch (error) {
      // Handle errors
      console.error("Error:", error);

      // Check if the status code is 409 (Conflict)
      if (error && error.status === 409) {
        console.log("hey");
        console.log("Already a member of this event.");
        // You can show a message to the user if needed
      } else {
        // Handle other status codes or unexpected errors
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleCheckMember = async (eventId) => {
    try {
      // Call your API to get member by ID
      await $.ajax({
        url: `http://localhost:5299/api/EventMember/GetByMemberandEventId/${memberId}/${eventId}`,
        type: "GET",
        success: async function (response) {
          // Log the entire response object
          setAlreadyMember((prev) => ({ ...prev, [eventId]: true }));
        },
        error: function (xhr, status, error) {
          // Handle other errors
          // Check if member is not found
          if (xhr.status === 404) {
            // Open the registration modal
            console.log("Member not found");
          }
          if (xhr.status === 409) {
            console.log("alreadymember");
            setAlreadyMember((prev) => ({ ...prev, [eventId]: true }));
          }
          console.error("error:", xhr);
        },
      });
    } catch (error) {
      // Handle other errors
      console.error("Error:", error);
    }
  };

  const handleDeleteEventMember = async (memberId, eventId) => {
    try {
      const response = await $.ajax({
        url: `http://localhost:5299/api/EventMember/DeleteEventMember/${memberId}/${eventId}`,
        type: "DELETE",
        success: function (response) {
          // Log the entire response object
          setAlreadyMember((prevAlreadyMember) => {
            const updatedAlreadyMember = { ...prevAlreadyMember };
            delete updatedAlreadyMember[eventId];
            return updatedAlreadyMember;
          });
          console.log(response);
        },
        error: function (xhr, status, error) {
          // Handle other errors
          console.error("error:", xhr);
        },
      });
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (item) {
      handleFetchEventGuides(item);
      handleCheckMember(item.eventId);
      console.log(item);
    }
  }, [item]);

  return (
    <Fade>
      <div style={containerStyle} className="event-content-container">
        <Slide top>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h1
              style={{ color: "Black", marginTop: "150px" }}
              className="event-name"
            >
              {item.eventName}
            </h1>
          </div>
        </Slide>
        <Zoom>
          <div style={contentContainerStyle} className="event-column-container">
            {/* Content for the left column */}
            <div style={leftColumnStyle} className="event-left-column">
              <h2
                style={{
                  color: "#0b323f",
                  fontFamily: "NeueMachina-UltraBold",
                }}
              >
                Event Details
              </h2>
              <p
                style={{ color: "black" }}
                className="event-details event-description"
              >
                {" "}
                {item.description}
              </p>
              <p className="event-details">
                <span className="event-title"> Cost: </span>
                {item.cost}$
              </p>
              <p className="event-details">
                <span className="event-title"> Location: </span>
                {item.destination}
              </p>
              <p className="event-details">
                <span className="event-title"> Start Date: </span>
                {new Date(item.dateFrom).toLocaleDateString()}
              </p>
              <p className="event-details">
                <span className="event-title"> End Date: </span>
                {new Date(item.dateTo).toLocaleDateString()}
              </p>
              <Button
                onClick={
                  alreadyMember[item.eventId]
                    ? () => handleDeleteEventMember(memberId, item.eventId)
                    : handleJoin
                }
                disabled={user.userId === null}
                color={!alreadyMember[item.eventId] ? "success" : "error"}
                variant="contained"
              >
                {alreadyMember[item.eventId] ? "Leave Event" : "Join Event"}
              </Button>
            </div>
            {/* Content for the right column */}
            <div style={rightColumnStyle} className="event-right-column">
              {/* Display guidesData if not empty, otherwise show a message */}
              {guidesData.length > 0 ? (
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  className="mySwiper"
                  style={{ width: "100%" }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                >
                  {guidesData.map((guide, index) => {
                    var pic = `data:image/jpeg;base64, ${guide.photo}`;
                    var img = new Image();
                    img.src = pic;

                    return (
                      <SwiperSlide key={index}>
                        <div>
                          {/* Display guide details here */}
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexWrap: "wrap",
                            }}
                          >
                            {/* Image */}
                            {/* <img
                              className="img-fluid"
                              src={pic}
                              style={{ width: "150px", height: "300px" }}
                              alt={`Guide ${index}`}
                            /> */}
                            <div
                              style={{
                                backgroundImage: "url('" + img.src + "')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "250px",
                                width: "180px",
                              }}
                            ></div>

                            {/* Text content */}
                            <div
                              className="guide-details"
                              style={{ fontFamily: "NeueMachina-UltraBold" }}
                            >
                              <h2 style={{ color: "#0b323f" }}> Guide </h2>
                              <p className="guide-details">{guide.fullName}</p>
                              <p className="guide-details">
                                {guide.profession}
                              </p>
                              <hr style={{ width: "100%" }} />
                              <p className="guide-details"> {guide.email} </p>
                              {/* Add other guide details as needed */}
                            </div>
                          </div>
                          <br />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <Typography variant="h5" color="error" align="center">
                  No Assigned Guide Yet
                </Typography>
              )}
            </div>
          </div>
        </Zoom>
      </div>
    </Fade>
  );
};

export default Event;
