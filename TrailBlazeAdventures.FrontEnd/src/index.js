import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/scss/blk-design-system-react.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import AdminDashboard from "components/AdminDashboard/AdminDashboard";
import UserContext from "components/UserContext/UserContext.js";
import UserRoleContext from "components/UserContext/UserRoleContext";
import NotFound from "components/404NotFound/404NotFound";
import Index from "views/Index";
import IndexNavbar from "components/Navbars/IndexNavbar";
import Event from "components/EventShowCase/Event";
import Unauthorized from "components/404NotFound/Unauthorized";
import AllEvents from "components/EventShowCase/AllEvents";
const App = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <UserRoleContext.Provider value={[userRole, setUserRole]}>
        <BrowserRouter>
        <IndexNavbar />
          <Routes>
            <Route path="/TrailBlazeAdventures" element={<Index />} />
            <Route
              path="/admin-dashboard"
              element={user ? <AdminDashboard /> : <Unauthorized />}
            />
            <Route
              path="/event/:event"
              element={user ? <Event/> : <Unauthorized />}
            />
            <Route
              path="/allEvents"
              element={user ? <AllEvents /> : <Unauthorized />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserRoleContext.Provider>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
