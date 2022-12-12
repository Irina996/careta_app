import { useCallback, useState } from "react";
import { Container, Card, Form, Button, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { useAuthContext } from "../contexts";

const Auth = () => {
  const { login, isAuthenticated, setCredentials } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const onRegistr = async () => {
    // if(isLogin){
    // const response = await login(email, password)
    // }else{
    const response = await registration(
      first_name,
      last_name,
      address,
      phone,
      email,
      password
    );

    setCredentials({ token: response.data.data, role: response.data.role })

    navigate("/");
  };


  const onLogin = useCallback(() => {
    login(
      { email, password },
      {
        onSuccess() {
          navigate("/");
        },
      }
    );
  }, [email, password]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Login" : "Registration"}</h2>
        <Form className="d-flex flex-column ">
          {isLogin ? (
            <div>
              <Form.Control
                className="mt-3"
                placeholder="Email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Password"
                type="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <Form.Control
                className="mt-3"
                placeholder="First name"
                value={first_name || ""}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Last name"
                value={last_name || ""}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Address"
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Phone"
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Password"
                type="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <Row className="d-flex justify-content-center align-items-center pl-3 pr-3">
            {isLogin ? (
              <Button
                onClick={onLogin}
                className="mt-4"
                variant={"outline-secondary"}
              >
                {" "}
                Login
              </Button>
            ) : (
              <Button
                onClick={onRegistr}
                className="mt-4"
                variant={"outline-secondary"}
              >
                {" "}
                Register
              </Button>
            )}

            {isLogin ? (
              <div>
                Don't have an account?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Register now!</NavLink>
              </div>
            ) : (
              <div>
                Are you have an account?{" "}
                <NavLink to={LOGIN_ROUTE}>Login now!</NavLink>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
