import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  RENT_ROUTE,
  BOOKING_ROUTE,
  FINES_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  ADMINRENT_ROUTE,
  ADMINFINES_ROUTE,
} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useAuthContext } from "../contexts";

const NavBar = observer(() => {
  const { isAuthenticated, logout, role } = useAuthContext();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink
          style={{ color: "white" }}
          to={role === "admin" ? ADMIN_ROUTE : HOME_ROUTE}
        >
          CAReta
        </NavLink>
        {isAuthenticated ? (
          role === "admin" ? (
            <Nav>
              <NavLink
                style={{ color: "white" }}
                className=" mx-5"
                to={ADMINRENT_ROUTE}
              >
                Rental list
              </NavLink>
              <NavLink
                style={{ color: "white" }}
                className=" mx-5"
                to={ADMINFINES_ROUTE}
              >
                Fines management
              </NavLink>
              <NavLink
                style={{ color: "white" }}
                onClick={logout}
                className=" mx-5"
                to={LOGIN_ROUTE}
              >
                LogOut
              </NavLink>
            </Nav>
          ) : (
            <Nav>
              <NavLink
                style={{ color: "white" }}
                className=" mx-5"
                to={BOOKING_ROUTE}
              >
                Booking list
              </NavLink>
              <NavLink
                style={{ color: "white" }}
                className=" mx-5"
                to={RENT_ROUTE}
              >
                Rental list
              </NavLink>
              <NavLink
                style={{ color: "white" }}
                className=" mx-5"
                to={FINES_ROUTE}
              >
                Fines
              </NavLink>
              <NavLink
                style={{ color: "white" }}
                onClick={logout}
                className=" mx-5"
                to={LOGIN_ROUTE}
              >
                LogOut
              </NavLink>
            </Nav>
          )
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <NavLink style={{ color: "white" }} to={LOGIN_ROUTE}>
              Log in
            </NavLink>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
