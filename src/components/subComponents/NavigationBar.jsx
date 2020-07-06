import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, FormGroup } from "react-bootstrap";
import { MDBBtn } from "mdbreact";
import project from "./static";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { user_signed_out, user_signed_in } from "../../actions";
import $ from "jquery";
import GoogleFont from "./fonts/googleFont";
import FloatingLabelInput from "react-floating-label-input";
import projectStyles from "./styles/Styles";
import LinearDeterminate from "./linearProgressBar";
import ApiUtils from "../../apiCalls/APIUtils";

// history --> props object // props.history
function Navigation({ history }) {
  const dispatch = useDispatch();
  // current value in the store //
  const user_details = useSelector((state) => state.userSigning);

  const [buttonText, setButtonText] = useState("Login");
  const [showModal, setShowModal] = useState(false);
  const [signUpFormHidden, setSignUpFormHidden] = useState(true);
  const [loginFormHidden, setLoginFormHidden] = useState(false);
  const [addFirstName, setAddFirstName] = useState("");
  const [addLastName, setAddLastName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    hiddenLoginLinearDeterminate,
    setHiddenLoginLinearDeterminate,
  ] = useState(true);
  const [
    hiddenSignUpLinearDeterminate,
    setHiddenSignUpLinearDeterminate,
  ] = useState(true);

  const apiUtils = new ApiUtils();

  const open_popup_window = () => {
    if (buttonText === "Login") {
      setShowModal(true);
    } else if (buttonText === "Logout") {
      logout();
    }
  };
  const hide_popup_window = () => {
    setShowModal(false);
  };
  const showLogin = function () {
    setLoginFormHidden(false);
    setSignUpFormHidden(true);
  };
  const showSignUp = function () {
    setSignUpFormHidden(false);
    setLoginFormHidden(true);
  };

  // sign up
  const handleChangeFirstName = (event) => {
    setAddFirstName(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setAddLastName(event.target.value);
  };
  const handleChangeAddEmail = (event) => {
    setAddEmail(event.target.value);
  };
  const handleChangeAddPassword = (event) => {
    setAddPassword(event.target.value);
  };
  // sign in
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = function () {
    if (addFirstName.trim().replace(" ", "").length < 1) {
      $("#registrationWarningTextId").html("firstname is required !");
      return false;
    } else if (addLastName.trim().replace(" ", "").length < 1) {
      $("#registrationWarningTextId").html("lastname is required !");
      return false;
    } else if (addEmail.trim().replace(" ", "").length < 1) {
      $("#registrationWarningTextId").html("email is required !");
      return false;
    } else if (addPassword.length < 6) {
      $("#registrationWarningTextId").html(
        "password must have at least 6 characters"
      );
      return false;
    } else {
      $("#registrationWarningTextId").html("");
      return true;
    }
  };

  const validateFormLogin = function () {
    if (email.trim().replace(" ", "").length < 1) {
      $("#loginWarningTextId").html("email is required !");
      return false;
    } else if (password.length < 6) {
      $("#loginWarningTextId").html("password must have at least 6 characters");
      return false;
    } else {
      $("#loginWarningTextId").html("");
      return true;
    }
  };

  const performSignIn = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHiddenLoginLinearDeterminate(false);
    //
    const user_credentials = {
      email: email,
      password: password,
    };
    const results = apiUtils.login(user_credentials); // returns an object
    if (results.status) {
      if (results.status === 200) {
        dispatch(user_signed_in(results.user_data));
        history.push("/home");
        setHiddenLoginLinearDeterminate(true);
        setButtonText("Logout");
        emptySignInForm();
        hide_popup_window();
      } else {
        setHiddenLoginLinearDeterminate(true);
        $("#loginWarningTextId").html(results.message);
      }
    } else {
      setHiddenLoginLinearDeterminate(true);
      $("#loginWarningTextId").html("An Error occurred");
    }
  };

  const performSignUp = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHiddenSignUpLinearDeterminate(false);
    //
    const user_data = {
      firstname: addFirstName,
      lastname: addLastName,
      email: addEmail,
      password: addPassword,
    };
    apiUtils
      .signup(user_data)
      .then((response) => {
        if (response.data.status === 200) {
          // login now
          const user_credentials = {
            email: addEmail,
            password: addPassword,
          };
          const results = apiUtils.login(user_credentials); // returns an object
          if (results.status === 200) {
            dispatch(user_signed_in(results.user_data));
            history.push("/home");
            setHiddenSignUpLinearDeterminate(true);
            setButtonText("Logout");
            emptySignUpForm();
            hide_popup_window();
          } else {
            setHiddenSignUpLinearDeterminate(true);
            $("#registrationWarningTextId").html(results.message);
          }
          //
        } else {
          setHiddenSignUpLinearDeterminate(true);
          $("#registrationWarningTextId").html(response.data.message);
        }
      })
      .catch((error) => {
        setHiddenSignUpLinearDeterminate(true);
        $("#registrationWarningTextId").html(
          "sign up failed! " + error.message
        );
      });
  };
  const emptySignUpForm = () => {
    setAddFirstName("");
    setAddLastName("");
    setAddEmail("");
    setAddPassword("");
  };

  const emptySignInForm = () => {
    setEmail("");
    setPassword("");
  };

  const logout = () => {
    apiUtils
      .Logout()
      .then((response) => {
        //
        if (response.data.status === 200) {
          dispatch(user_signed_out());
          history.push("/");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
      <Container fluid>
        <Row
          style={{
            minHeight: 60,
            backgroundColor: project().projectColor,
            color: "white",
          }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "center", // center vertically using flexbox
            }}
          >
            <span
              className="badge badge m-2"
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "bold",
              }}
            >
              <GoogleFont
                text={project().companyName}
                fontfamily={"tangerine"}
              />
            </span>
          </Col>
          <Col
            style={{
              margin: "auto", // center vertically
              textAlign: "right",
            }}
          >
            <Button
              className="badge badge m-2"
              style={{
                fontSize: 14,
                backgroundColor: "white",
                color: project().projectColor,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 12,
                paddingBottom: 12,
                border: "0px",
              }}
              onClick={open_popup_window}
            >
              <GoogleFont text={buttonText} fontfamily={"tangerine"} />
            </Button>
          </Col>
        </Row>
      </Container>
      {/* ---popup window--- */}
      <Modal
        show={showModal}
        onHide={hide_popup_window} // when the closeButton 'X'  is clicked
        onShow={showLogin}
        centered
      >
        {/* Registration form */}
        <form onSubmit={performSignUp} hidden={signUpFormHidden}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span
                style={projectStyles().spanStyle2}
                className="badge badge m-2"
              >
                Sign up
              </span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              <FormGroup>
                <FloatingLabelInput
                  id="FirstNameId"
                  label="firstname"
                  onBlur=""
                  value={addFirstName}
                  onChange={handleChangeFirstName}
                  style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                />
              </FormGroup>
              <FormGroup>
                <FloatingLabelInput
                  id="LastNameId"
                  label="lastname"
                  onBlur=""
                  value={addLastName}
                  onChange={handleChangeLastName}
                  style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                />
              </FormGroup>
              <FormGroup>
                <FloatingLabelInput
                  id="addEmailId"
                  label={"Email"}
                  type="email"
                  onBlur=""
                  value={addEmail}
                  onChange={handleChangeAddEmail}
                  style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                />
              </FormGroup>
              <FormGroup>
                <FloatingLabelInput
                  id="AddPasswordId"
                  label={"Password"}
                  onBlur=""
                  type="password"
                  value={addPassword}
                  onChange={handleChangeAddPassword}
                  style={{ fontSize: 15 }}
                />
              </FormGroup>
              Already have an account ?{" "}
              <a
                href="#"
                style={{ color: project().projectColor }}
                onClick={showLogin}
              >
                Sign In
              </a>
              <FormGroup
                style={{ paddingTop: 20 }}
                hidden={hiddenSignUpLinearDeterminate}
              >
                <LinearDeterminate />
              </FormGroup>
              <FormGroup>
                <span
                  className="text-danger"
                  id="registrationWarningTextId"
                ></span>
              </FormGroup>
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={hide_popup_window}>
              Cancel
            </Button>
            <MDBBtn
              style={projectStyles().buttonStyle}
              disabled={!validateForm()}
              type="submit"
            >
              Save
            </MDBBtn>
          </Modal.Footer>
        </form>
        {/* Login form */}
        <form onSubmit={performSignIn} hidden={loginFormHidden}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span
                style={projectStyles().spanStyle2}
                className="badge badge m-2"
              >
                Login
              </span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              <FormGroup>
                <FloatingLabelInput
                  id="LoginEmailId"
                  label={"Email"}
                  type="email"
                  onBlur=""
                  name="email"
                  value={email}
                  onChange={handleChangeEmail}
                  style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                />
              </FormGroup>
              <FormGroup>
                <FloatingLabelInput
                  id="LoginPasswordId"
                  label={"Password"}
                  onBlur=""
                  type="password"
                  name="Password"
                  value={password}
                  onChange={handleChangePassword}
                  style={{ fontSize: 15 }}
                />
              </FormGroup>
              Don't have an account ?{" "}
              <a
                href="#"
                style={{ color: project().projectColor }}
                onClick={showSignUp}
              >
                Register
              </a>
              <FormGroup
                style={{ paddingTop: 20 }}
                hidden={hiddenLoginLinearDeterminate}
              >
                <LinearDeterminate />
              </FormGroup>
              <FormGroup>
                <span className="text-danger" id="loginWarningTextId"></span>
              </FormGroup>
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={hide_popup_window}>
              Cancel
            </Button>
            <MDBBtn
              style={projectStyles().buttonStyle}
              disabled={!validateFormLogin()}
              type="submit"
            >
              Sign In
            </MDBBtn>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default withRouter(Navigation);
