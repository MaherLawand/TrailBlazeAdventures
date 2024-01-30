import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { Slide, Zoom } from "react-reveal";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* First Div */}
          
          <Col md="5">
          <Slide bottom> 
            <div className="footer-section">
              <h1 className="title">TrailBlaze Adventures</h1>
              <p className="footer-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            </Slide>
          </Col>

          {/* Second Div */}
          <Col md="4">
            <Slide bottom> 
            <div className="footer-section">
              <h1 className="title">Contacts</h1>
              <p className="footer-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            </Slide>
          </Col>

          {/* Third Div */}
          <Col md="3">
            <div className="footer-section">
              <Slide bottom>
              <h1 className="title">Follow us:</h1>
              <div className="btn-wrapper profile">
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://twitter.com/creativetim"
                  id="tooltipTwitter"
                  target="_blank"
                >
                  <i className="fab fa-twitter" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltipTwitter">
                  Twitter
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://www.facebook.com/creativetim"
                  id="tooltipFacebook"
                  target="_blank"
                >
                  <i className="fab fa-facebook-square" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltipFacebook">
                  Facebook
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://Instagram.com/creativetim"
                  id="tooltipInstagram"
                  target="_blank"
                >
                  <i className="fab fa-instagram" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltipInstagram">
                  Instagram
                </UncontrolledTooltip>
              </div>
              </Slide>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
