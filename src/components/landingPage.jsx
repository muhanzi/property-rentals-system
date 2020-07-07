import React, { useEffect } from "react";
import project from "./subComponents/static";
import { Container, Row, Col, Image } from "react-bootstrap";
import Slider from "./subComponents/slider";
import image1 from "../pictures/testimonialImage1.jpeg";
import image2 from "../pictures/testimonialImage2.jpg";
import GoogleFont from "./subComponents/fonts/googleFont";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import ApiUtils from "../apiCalls/APIUtils";
import { user_signed_in } from "../actions";

function LandingPage({ history }) {
  const dispatch = useDispatch();
  const apiUtils = new ApiUtils();

  useEffect(() => {
    apiUtils
      .getCurrentUser()
      .then((response) => {
        if (response.data.status === 200) {
          let user_data = {
            id: response.data.session_data.user_id,
            firstname: response.data.session_data.user_firstname,
            lastname: response.data.session_data.user_lastname,
            email: response.data.session_data.user_email,
          };
          dispatch(user_signed_in(user_data));
          history.push("/home");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [apiUtils, history, dispatch]);

  return (
    <div
      style={{
        minHeight: 500,
        backgroundColor: project().background_color,
      }}
    >
      <Slider />
      <Container style={{ paddingTop: 10 }} fluid>
        <Row style={{ paddingBottom: 20 }}>
          <span
            style={{
              margin: "auto",
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            <GoogleFont
              text={"Testimonials from our customers"}
              fontfamily={"tangerine"}
            />
          </span>
        </Row>
        <Row style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
          <Col lg={6} style={{ paddingBottom: 20 }}>
            <Row>
              <Col
                style={{
                  minHeight: 200,
                  minWidth: 200,
                  paddingTop: 25,
                  paddingBottom: 25,
                  textAlign: "center",
                }}
              >
                <Image
                  fluid
                  src={image1}
                  alt="Image Loading..."
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                />
              </Col>
              <Col
                style={{
                  minHeight: 100,
                  minWidth: 200,
                  margin: "0 auto",
                  paddingTop: 50,
                  paddingBottom: 25,
                  paddingRight: 15,
                  textAlign: "center",
                }}
              >
                <Row style={{ fontSize: 17 }}>
                  <GoogleFont
                    text={
                      'I remember the time when I was looking for a room, it was a serious challenge for me until i found Lapisha Rentals, a great company that provides excellent services. "Charles Muhanzi" '
                    }
                    fontfamily={"tangerine"}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={6} style={{ paddingBottom: 20 }}>
            <Row>
              <Col
                style={{
                  minHeight: 200,
                  minWidth: 200,
                  paddingTop: 25,
                  paddingBottom: 25,
                  textAlign: "center",
                }}
              >
                <Image
                  fluid
                  src={image2}
                  alt="Image Loading..."
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                />
              </Col>
              <Col
                style={{
                  minHeight: 100,
                  minWidth: 200,
                  margin: "0 auto",
                  paddingTop: 50,
                  paddingBottom: 25,
                  paddingRight: 15,
                  textAlign: "center",
                }}
              >
                <Row style={{ fontSize: 17 }}>
                  <GoogleFont
                    text={
                      'I remember the time when I was looking for a room, it was a serious challenge for me until i found Lapisha Rentals, a great company that provides excellent services. "Charles Muhanzi" '
                    }
                    fontfamily={"tangerine"}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withRouter(LandingPage);
