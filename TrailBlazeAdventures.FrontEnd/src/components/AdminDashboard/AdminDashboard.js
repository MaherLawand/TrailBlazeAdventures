import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import GroupsIcon from "@mui/icons-material/Groups";

import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { NavbarBrand } from "reactstrap";
import DashboardTable from "./DashboardTable";
import { useState, useEffect } from "react";
import $ from "jquery";
import EventsTable from "./EventsTable";
import MembersTable from "./MembersTable";
import GuidesTable from "./GuidesTable";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminDashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedMenuItem === "Users") {
        await fetchAllUsers();
      }
      if (selectedMenuItem === "Events") {
        await fetchAllEvents();
      }
      if(selectedMenuItem === "Guides"){
        await fetchAllGuides();
      }
      if (selectedMenuItem === "Members") {
        await fetchAllMembers();
      }
    };

    fetchData();
  }, [selectedMenuItem]);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const fetchAllUsers = async () => {
    setIsLoading(true);
    await $.ajax({
      url: "http://localhost:5299/api/User/GetAllUsers", // Adjust the URL as per your backend API
      type: "GET",
      success: function (response) {
        // Handle the retrieved users, e.g., store them in state or context
        console.log("All users:", response);

        // Set all users in state or context
        setAllUsers(response);
        setIsLoading(false);
      },
      error: function (xhr, status, error) {
        // Handle error (e.g., show error message)
        console.log("Failed to get all users:", error);
      },
    });
  };

  const [allEvents, setAllEvents] = useState([]);

  const fetchAllEvents = async () => {
    setIsLoading(true);
    await $.ajax({
      url: "http://localhost:5299/api/Event/GetAllEvents", // Adjust the URL as per your backend API
      type: "GET",
      success: function (response) {
        // Handle the retrieved Events, e.g., store them in state or context
        console.log("All Events:", response);

        // Set all Eventss in state or context
        setAllEvents(response);
        setIsLoading(false);
      },
      error: function (xhr, status, error) {
        // Handle error (e.g., show error message)
        console.log("Failed to get all Events:", error);
      },
    });
  };

  const handleDeleteUser = (deletedUserId) => {
    // Update allUsers by filtering out the deleted user
    setAllUsers((prevUsers) => {
      if (prevUsers && prevUsers.$values && Array.isArray(prevUsers.$values)) {
        const updatedUsers = {
          ...prevUsers,
          $values: prevUsers.$values.filter(
            (user) => user.userId !== deletedUserId
          ),
        };
        return updatedUsers;
      } else {
        return prevUsers; // Return prevUsers unchanged if the structure is not as expected
      }
    });
  };

  const [allMembers, setAllMembers] = useState([]);

  const fetchAllMembers = async () => {
    setIsLoading(true);
    await $.ajax({
      url: "http://localhost:5299/api/Member", // Adjust the URL as per your backend API
      type: "GET",
      success: function (response) {
        // Handle the retrieved Members, e.g., store them in state or context
        console.log("All Members:", response.$values);

        // Set all Memberss in state or context
        setAllMembers(response.$values);
        setIsLoading(false);
      },
      error: function (xhr, status, error) {
        // Handle error (e.g., show error message)
        console.log("Failed to get all Members:", error);
      },
    });
  };


  const [allGuides, setAllGuides] = useState([]);

const fetchAllGuides = async () => {
  setIsLoading(true);

  try {
    // Fetch user roles for guides
    const userRolesResponse = await $.ajax({
      url: "http://localhost:5299/api/UserRole/GetUserRolesByName/Guide",
      type: "GET",
      dataType: "json",
    });

    // Map through user roles and fetch detailed guide information
    const guidesDetails = await Promise.all(
      userRolesResponse.$values.map(async (userRole) => {
        try {
          const guideResponse = await $.ajax({
            url: `http://localhost:5299/api/Guide/GetGuideById/${userRole.userId}`,
            type: "GET",
            dataType: "json",
          });
    
          return guideResponse;
        } catch (error) {
          // Check if the error is due to a 404 (Not Found) status
          if (error.status === 404) {
            console.log(`Guide with userId ${userRole.userId} not found.`);
            return null; // Return null for not found guides
          } else {
            // If it's another error, log it and rethrow
            console.error('Error fetching guide:', error);
            throw error;
          }
        }
      })
    );
    
    // Filter out null values (guides that were not found)
    const foundGuides = guidesDetails.filter((guide) => guide !== null);

    // Set all guides in state
    setAllGuides(foundGuides);
    setIsLoading(false);
  } catch (error) {
    // Handle error (e.g., show error message)
    console.error("Failed to get all Guides:", error);
    setIsLoading(false);
  }
};

useEffect(()=>{
  if(allGuides && allGuides.length >0){
    console.log(allGuides);
  }
},[allGuides])

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <NavbarBrand to="/TrailBlazeAdventures" tag={Link} id="navbar-brand">
          <img
              src={`${process.env.PUBLIC_URL}/Images/Logo/Logo.png`} // Adjust the path based on your project structure
              alt="TrailBlaze Adventures Logo"
              style={{ height: "auto", width: "200px" }} // Adjust the dimensions as needed
            />
          </NavbarBrand>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Users", "Events", "Guides", "Members"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleMenuItemClick(text)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 && <PersonOutlineIcon />}
                  {index === 1 && <EventAvailableIcon />}
                  {index === 2 && <EmojiPeopleIcon />}
                  {index === 3 && <GroupsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Main content area */}
        {selectedMenuItem === "Users" &&
          allUsers.$values &&
          allUsers.$values.length > 0 &&
          !isLoading && (
            <DashboardTable
              selectedMenuItem={selectedMenuItem}
              columns={[
                "User Id",
                "Name",
                "Email",
                "Password",
                "Date Of Birth",
                "Gender",
              ]}
              data={allUsers}
              onDeleteUser={handleDeleteUser} // Pass the callback function to handle user deletion
              fetchAllUsers={fetchAllUsers}
            />
          )}
        {selectedMenuItem === "Events" &&

            <EventsTable
              selectedMenuItem={selectedMenuItem}
              columns={[
                "Event Id",
                "Event Name",
                "Description",
                "Destination",
                "Date From",
                "Date To",
                "Cost",
                "eventStatus",
              ]}
              data={allEvents}
              fetchAllEvents={fetchAllEvents}
            />
          }
        {selectedMenuItem === "Guides" &&
          allGuides &&
          allGuides.length > 0 &&
          !isLoading && (
            <GuidesTable
              guidesData={allGuides}
              fetchAllGuides={fetchAllGuides}
              selectedMenuItem={selectedMenuItem==="Guides" ? true : false}
            />
          )}
        {selectedMenuItem === "Members" &&
          allMembers &&
          allMembers.length > 0 &&
          !isLoading && (
            <MembersTable
              membersData={allMembers}
              fetchAllMembers={fetchAllMembers}
              isEvent={true}
            />
          )}
      </Box>
    </Box>
  );
}
