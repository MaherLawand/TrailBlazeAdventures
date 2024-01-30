import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import { Slide, Zoom } from "react-reveal";
import { Container, Row, Col, Modal, ModalBody } from "reactstrap";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import $ from "jquery"; // Import jQuery
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import UserContext from "components/UserContext/UserContext";
import { Link } from "react-router-dom";
import {
  NavbarBrand,
} from "reactstrap";

export default function EventShowCase({ workData }) {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const getEventsByDate = () => {
      $.ajax({
        url: `http://localhost:5299/api/Event/GetActiveEventsByDate`,
        method: "GET",
        dataType: "json",
        success: function (data) {
          setEvents(data.$values);
        },
        error: function (error) {
          console.error("Error fetching events:", error);
        },
      });
    };

    getEventsByDate();
  }, []);

  useEffect(() => {
    if (eventId) {
      const getEventById = () => {
        $.ajax({
          url: `http://localhost:5299/api/Event/GetEventById/${eventId}`,
          method: "GET",
          dataType: "json",
          success: function (data) {
            console.log(data);
            setSelectedEvent(data);
          },
          error: function (error) {
            console.error("Error fetching events:", error);
          },
        });
      };

      getEventById();
    }
  }, [eventId]);

  const openModal = async (eventId) => {
    await handleCheckMember(eventId);
    setEventId(eventId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEventId(null);
    setSelectedEvent(null);
    setModalOpen(false);
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberId, setMemberId] = useState(user ? user.userId : null);

  useEffect(() => {
    if (user) {
      setMemberId(user.userId);
    } else {
      setMemberId(null);
    }
  }, [user]);

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
            setModalOpen(false);
            setIsModalOpen(true);
          }
          console.error("error:", xhr);
        },
      });
    } catch (error) {
      // Handle other errors
      console.error("Error:", error);
    }
  };
  const [bgcolor, setbgColor] = useState("bg-info");
  const [alreadyMember, setAlreadyMember] = useState({});

  const handleJoinEvent = async () => {
    try {
      // Check if the event and user information is available
      if (!eventId || !user.userId) {
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
          eventId: eventId,
          // Add other properties if needed
        }),
        success: async function (response) {
          setAlreadyMember((prev) => ({ ...prev, [eventId]: true }));
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

  useEffect(() => {
    userInput.email = user ? user.email : "";
    userInput.dateOfBirth = user ? user.dateOfBirth : "";
    userInput.password = user ? user.password : "";
    userInput.gender = user ? user.gender : "";
    //console.log(user.userId);
  }, [userInput]);

  const handleRegisterMember = async () => {
    const MemberformData = new FormData();
    MemberformData.append("memberId", user.userId);
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
    GuideformData.append("guideId", user.userId);
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

  return (
    <div className="page-header-work eventShowCase">
      {/* <svg
        preserveAspectRatio="xMidYMid slice"
        viewBox="10 10 80 80"
        className="svg"
      >
        <path
          fill="#0073e6"
          class="out-top"
          d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
        />
        <path
          fill="#9db7fecc"
          class="in-top"
          d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
        />
        <path
          fill="#00b0f0"
          class="out-bottom"
          d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
        />
        <path
          fill="#00f5d4"
          class="in-bottom"
          d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
        />
      </svg> */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row className="row-wrapper" style={{ width: "100%" }}>
          {/* First Column with Swiper */}
          <Col lg="8" md="8" className="first-column">
            <Swiper
              breakpoints={{
                766: {
                  slidesPerView: 1, // Show 1 slide on screens equal to or smaller than 768px width
                },
                770: {
                  slidesPerView: 2, // Show 2 slides on screens equal to or smaller than 992px width
                },
              }}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {events.slice(0, 4).map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="slider-wrapper">
                    <Slide right>
                      <Row className="row-grid justify-content-between align-items-center text-left">
                        <Col lg="12" md="12" className="img-div-wrapper">
                          <Link to={`/event/${item.eventId}`} state={{ item }}>
                            <img
                              className="img-fluid"
                              src={`data:image/jpg;base64, ${item.photo}`}
                              //onClick={() => openModal(item.eventId)} // Modify this line
                            />
                          </Link>
                          {/* Top left div */}
                          <div className={"top-left-content event-header"}>
                            From {item.cost}$
                          </div>
                          {/* Bottom left div */}
                          <div className={"bottom-left-content "}>
                            <div className="img-content">
                              <p className="event-data">
                                {item.dateFrom.slice(0, 10).replace(/-/g, "/")}
                              </p>
                              <p className="event-header"> Start </p>
                            </div>
                            <div className="img-content">
                              <p className="event-data">
                                {item.dateTo.slice(0, 10).replace(/-/g, "/")}
                              </p>
                              <p className="event-header"> End </p>
                            </div>
                            <div className="img-content">
                              <p className="event-data">
                                {" "}
                                {item.eventStatus ? "Available" : "Closed"}{" "}
                              </p>
                              <p className="event-header"> Status </p>
                            </div>
                          </div>
                        </Col>
                        <Col
                          lg="12"
                          md="12"
                          className="title-desc-wrapper"
                        ></Col>
                      </Row>
                    </Slide>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>

          {/* Second Column */}

          <Col lg="4" md="4" className="second-column">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="12" md="12" className="title-desc-wrapper">
                <Zoom>
                  <h1 style={{ fontSize: "1.5em", color: "rgb(19, 48, 74)" }} id="latest-events">
                    Latest Events
                  </h1>
                  <p style={{ fontSize: "1em", color: "rgb(19, 48, 74)" }} id="latest-events-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin vel lectus et dolor venenatis lacinia. Integer sit
                    amet bibendum ipsum. Phasellus ut libero eget mi rhoncus
                    imperdiet. Vivamus volutpat erat ut est lobortis, sit amet
                    dictum justo luctus.
                  </p>
                  <NavbarBrand to="/allEvents" tag={Link} state={{ events }} id="navbar-brand"> <button className="btn btn-info" id="view-all">View All</button> </NavbarBrand>
                </Zoom>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Modal isOpen={modalOpen} toggle={closeModal} centered>
        <ModalBody>
          {selectedEvent && (
            <>
              <div className="mb-3">
                <h3>{selectedEvent.eventName}</h3>
                <p>
                  <strong>Date:</strong>{" "}
                  {`${selectedEvent.dateFrom
                    .slice(0, 10)
                    .replace(/-/g, "/")} to ${selectedEvent.dateTo
                    .slice(0, 10)
                    .replace(/-/g, "/")}`}
                </p>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
                <p>
                  <strong>Destination:</strong> {selectedEvent.destination}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedEvent.eventStatus ? "Available" : "Closed"}
                </p>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2" onClick={closeModal}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={
                    alreadyMember[eventId]
                      ? () => handleDeleteEventMember(memberId, eventId)
                      : handleJoin
                  }
                  disabled={user.userId === null}
                >
                  {alreadyMember[eventId] ? "Leave Event" : "Join Event"}
                </button>
              </div>
            </>
          )}
        </ModalBody>
      </Modal>
      <Modal isOpen={isModalOpen} toggle={closeModal} centered>
        <ModalBody>
          <>
            {/* Registration form */}
            <h3 style={{ color: "black" }}>Become A Member</h3>

            {/* Your registration form fields go here */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter your full name"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={user ? user.email : ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={user ? user.password : ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="dateOfBirth"
                value={user ? user.dateOfBirth : ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input
                type="text"
                className="form-control"
                id="gender"
                placeholder="Enter your gender"
                value={user ? user.gender : ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="joiningDate" className="form-label">
                Joining Date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="joiningDate"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="mobileNumber"
                placeholder="Enter your mobile number"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="emergencyNumber" className="form-label">
                Emergency Number
              </label>
              <input
                type="text"
                className="form-control"
                id="emergencyNumber"
                placeholder="Enter your emergency number"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Photo
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                id="photoInput"
                placeholder="Enter the URL of your photo"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="profession" className="form-label">
                Profession
              </label>
              <input
                type="text"
                className="form-control"
                id="profession"
                placeholder="Enter your profession"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nationality" className="form-label">
                Nationality
              </label>
              <input
                type="text"
                className="form-control"
                id="nationality"
                placeholder="Enter your nationality"
                onChange={handleInputChange}
              />
            </div>

            <button className="btn btn-primary" onClick={handleRegisterMember}>
              Register
            </button>
          </>
        </ModalBody>
      </Modal>
    </div>
  );
}
