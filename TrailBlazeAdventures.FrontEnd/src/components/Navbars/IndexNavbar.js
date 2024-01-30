/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "components/LoginModal/LoginModal";
import { useState, useContext } from "react";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import UserContext from "components/UserContext/UserContext";
import UserRoleContext from "components/UserContext/UserRoleContext";

export default function IndexNavbar() {
  const [user, setUser] = useContext(UserContext);
  const [userRoles, setUserRoles] = useContext(UserRoleContext);

  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    console.log(collapseOpen);
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  const scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const LogOut = () => {
    setUser(null);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(userRoles);
  }, [userRoles]);

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/TrailBlazeAdventures" tag={Link} id="navbar-brand">
            <img
              src={`${process.env.PUBLIC_URL}/Images/Logo/Logo.png`} // Adjust the path based on your project structure
              alt="TrailBlaze Adventures Logo"
              style={{ height: "auto", width: "200px" }} // Adjust the dimensions as needed
            />
          </NavbarBrand>
          <button
            aria-expanded={collapseOpen}
            className={`navbar-toggler navbar-toggler ${
              collapseOpen ? "collapsed" : ""
            }`}
            style={{ zIndex: "1000" }}
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header"></div>
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                {/* <i className="fab fa-facebook-square" /> */}
                <p className="d-lg-none d-xl-none">About</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                {/* <i className="fab fa-instagram" /> */}
                <p className="d-lg-none d-xl-none">Contact Us</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                title="Open Login Modal"
                onClick={!user ? toggleModal : LogOut}
              >
                {/* <i className="fab fa-instagram" /> */}
                {!user ? (
                  <p className="d-lg-none d-xl-none"> Login </p>
                ) : (
                  <p className="d-lg-none d-xl-none"> LogOut </p>
                )}
              </NavLink>
            </NavItem>

            {user && userRoles && userRoles.includes("Admin") && (
              <NavItem className="p-0" to="/admin-dashboard" tag={Link}>
                <NavLink
                  data-placement="bottom"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Open Admin Dashboard"
                >
                  <p className="d-lg-none d-xl-none">Dashboard</p>
                </NavLink>
              </NavItem>
            )}
            {/* <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                Getting started
              </DropdownToggle>
              <DropdownMenu className="dropdown-with-icons">
                <DropdownItem href="https://demos.creative-tim.com/blk-design-system-react/#/documentation/overview">
                  <i className="tim-icons icon-paper" />
                  Documentation
                </DropdownItem>
                <DropdownItem tag={Link} to="/register-page">
                  <i className="tim-icons icon-bullet-list-67" />
                  Register Page
                </DropdownItem>
                <DropdownItem tag={Link} to="/landing-page">
                  <i className="tim-icons icon-image-02" />
                  Landing Page
                </DropdownItem>
                <DropdownItem tag={Link} to="/profile-page">
                  <i className="tim-icons icon-single-02" />
                  Profile Page
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            <NavItem className="nav-link d-none d-lg-block">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                {/* <i className="fab fa-facebook-square" /> */}
                <p>About</p>
              </NavLink>
            </NavItem>
            <NavItem className="nav-link d-none d-lg-block">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                {/* <i className="fab fa-instagram" /> */}
                <p>Contact Us</p>
              </NavLink>
            </NavItem>
            {user && userRoles && userRoles.includes("Admin") && (
              <NavItem className="nav-link d-none d-lg-block">
                <NavItem to="/admin-dashboard" tag={Link}>
                  <NavLink
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Open Admin Dashboard"
                  >
                    <p>Dashboard</p>
                  </NavLink>
                </NavItem>
              </NavItem>
            )}
            <NavItem className="nav-link d-none d-lg-block">
              <NavLink
                data-placement="bottom"
                href="#"
                onClick={!user ? toggleModal : LogOut}
                title="Open Login Modal"
              >
                {!user ? <p>Login</p> : <p> Logout </p>}
              </NavLink>
            </NavItem>
            <LoginModal isOpen={modalOpen} toggle={toggleModal} />
            {/* <NavItem>
              <Button
                
                color="primary"
                target="_blank"
                href="https://www.creative-tim.com/product/blk-design-system-pro-react?ref=bdsr-user-archive-index-navbar-upgrade-pro"
              >
                <i className="tim-icons icon-spaceship" /> Upgrade to PRO
              </Button>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
                onClick={scrollToDownload}
              >
                <i className="tim-icons icon-cloud-download-93" /> Download
              </Button>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
