import React from "react";
import { Container, Row, Col } from "reactstrap";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Slide, Zoom, Fade } from "react-reveal";
import "bootstrap/dist/css/bootstrap.min.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#0b323f"}} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    color: "black !important", // Set the text color to black
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function AboutUs() {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Fade> 
    <div className="page-header-work aboutus">
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
        <Row
          className="row-wrapper justify-content-center aboutus"
          style={{ width: "100%" }}
        >
          {/* First Div */}
          <Slide top>
            <div className="first-div text-center">
              <h1 id="about-us">About Us</h1>
              <h6 className="blue-line" id="about-us-slogan">We live for nature</h6>
            </div>
          </Slide>
          {/* Second Div */}
          <div className="second-div">
            <Row className="row-grid text-left">
              {/* First Column */}
              <Col lg="6" md="6" className="first-column">
                <div className="first-column-div text-center d-flex">
                  <Slide bottom>
                    <p
                      className="mx-2 aboutus-desc"
                      style={{
                        borderRight: "1px solid white",
                        paddingRight: "10px",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quisquam, dolorem dolorum nemo laudantium error alias nisi
                      ea saepe possimus eligendi reiciendis exercitationem
                      tempore temporibus pariatur incidunt quasi doloremque iure
                      magnam.
                    </p>
                    <p className="mx-2 aboutus-desc">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quisquam, dolorem dolorum nemo laudantium error alias nisi
                      ea saepe possimus eligendi reiciendis exercitationem
                      tempore temporibus pariatur incidunt quasi doloremque iure
                      magnam.
                    </p>
                  </Slide>
                </div>
                {/* <div className="text-center mt-3">
                  <button className="btn btn-info">Read More</button>
                </div> */}
              </Col>

              {/* Second Column */}
              <Col lg="6" md="6" className="second-column">
                <div className="second-column-div">
                  <Slide right>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography style={{ color: "#0b323f" }}>
                        Collapsible Group Item #1
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography style={{ color: "white",fontFamily:"FallIsComingRegular",fontSize:"1.5em" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <Typography style={{ color: "#0b323f" }}>
                        Collapsible Group Item #2
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography style={{ color: "white",fontFamily:"FallIsComingRegular",fontSize:"1.5em" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                    >
                      <Typography style={{ color: "#0b323f" }}>
                        Collapsible Group Item #3
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography style={{ color: "white",fontFamily:"FallIsComingRegular",fontSize:"1.5em" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  </Slide>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </div>
    </Fade>
  );
}
