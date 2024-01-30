import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import { Slide, Zoom } from "react-reveal";
import { Container, Row, Col, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";

const AllEvents = () => {
  const location = useLocation();
  const { events } = location.state;
  useEffect(() => {
    console.log(events);
  }, []);

  return (
    <>
      <div className="page-header-work allEvents">
        <h1>All Events</h1>
        <div className="df"> 
        <h3 className="hr-lines">IT FEELS GOOD TO BE LOST IN THE RIGHT DIRECTION</h3>
        <div className="border"></div>
        </div>
      </div>

      <Container className="all-events-container">
        <Row className="all-events-row">
          {events.slice(0, 4).map((item, index) => (
            <Col key={index} lg="6" md="6" className="mb-4">
              <Slide right>
                <div className="alleventswrapper">
                  <Row className="row-grid justify-content-between align-items-center text-left allevents">
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
                  </Row>
                </div>
              </Slide>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllEvents;
