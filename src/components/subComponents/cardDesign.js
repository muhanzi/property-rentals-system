import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
import projectStyles from "./styles/Styles";
import { Row, Col, Modal, Image } from "react-bootstrap";
import GoogleFont from "./fonts/googleFont";

class CardDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  showDetails = () => {
    this.setState({ showModal: true });
  };

  hideDetails = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <MDBCol
        md={this.props.md}
        style={{ paddingBottom: 20, justifyItems: "center" }}
      >
        <MDBCard wide>
          <MDBCardImage
            cascade
            className="img-fluid"
            src={this.props.details.featured_photo}
            style={{ width: "100%" }}
          />
          <MDBCardBody cascade>
            <MDBCardTitle>{this.props.details.type_name}</MDBCardTitle>
            <MDBCardText>{this.props.details.description}</MDBCardText>
            <MDBCardText>{this.props.details.location_name}</MDBCardText>
            <MDBBtn
              style={projectStyles().buttonStyle}
              onClick={this.showDetails}
            >
              Show Details
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
        {/* ---popup window--- */}
        <Modal
          show={this.state.showModal}
          onHide={this.hideDetails} // when the closeButton 'X'  is clicked
          onShow={this.showDetails}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span
                style={projectStyles().spanStyle2}
                className="badge badge m-2"
              >
                <GoogleFont
                  text={this.props.details.type_name}
                  fontfamily={"tangerine"}
                />
              </span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row style={{ minHeight: 50, paddingBottom: 10 }}>
              <Col
                style={{
                  minHeight: 200,
                  minWidth: 200,
                  textAlign: "center",
                }}
              >
                <Image
                  fluid
                  src={this.props.details.featured_photo}
                  alt="Image Loading..."
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: 6,
                  }}
                />
              </Col>
              <Col
                style={{
                  minHeight: 200,
                  minWidth: 200,
                  textAlign: "center",
                }}
              >
                <Image
                  fluid
                  src={this.props.details.gallary_photos}
                  alt="Image Loading..."
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: 6,
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <GoogleFont text={"Type"} fontfamily={"tangerine"} />
              </Col>
              <Col>
                <GoogleFont
                  text={this.props.details.type_name}
                  fontfamily={"tangerine"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <GoogleFont text={"Description"} fontfamily={"tangerine"} />
              </Col>
              <Col>
                <GoogleFont
                  text={this.props.details.description}
                  fontfamily={"tangerine"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <GoogleFont
                  text={"Property Facilities"}
                  fontfamily={"tangerine"}
                />
              </Col>
              <Col>
                <GoogleFont
                  text={this.props.details.property_facilities}
                  fontfamily={"tangerine"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <GoogleFont text={"Village"} fontfamily={"tangerine"} />
              </Col>
              <Col>
                <GoogleFont
                  text={this.props.details.village}
                  fontfamily={"tangerine"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <GoogleFont text={"Location"} fontfamily={"tangerine"} />
              </Col>
              <Col>
                <GoogleFont
                  text={this.props.details.location_name}
                  fontfamily={"tangerine"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <GoogleFont text={"Monthly Fee"} fontfamily={"tangerine"} />
              </Col>
              <Col>
                <GoogleFont
                  text={this.props.details.monthly_fee}
                  fontfamily={"tangerine"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <GoogleFont text={"Longitude"} fontfamily={"tangerine"} />
              </Col>
              <Col>
                <GoogleFont
                  text={this.props.details.longtude}
                  fontfamily={"tangerine"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <GoogleFont text={"latitude"} fontfamily={"tangerine"} />
              </Col>
              <Col>
                <GoogleFont
                  text={this.props.details.latitude}
                  fontfamily={"tangerine"}
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <MDBBtn
              style={projectStyles().buttonStyle}
              onClick={this.hideDetails}
            >
              <GoogleFont text={"Close"} fontfamily={"tangerine"} />
            </MDBBtn>
          </Modal.Footer>
        </Modal>
        {/* ---popup window--- */}
      </MDBCol>
    );
  }
}

export default CardDesign;
