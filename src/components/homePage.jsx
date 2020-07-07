import React, { Component } from "react";
import project from "./subComponents/static";
import { Container, Row, Col, Image } from "react-bootstrap";
import CardDesign from "./subComponents/cardDesign";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MDBRow } from "mdbreact";
import ApiUtils from "../apiCalls/APIUtils";
import ShowUserName from "./subComponents/showUserName";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorie: 0,
      all: true,
      single_room: false,
      double_room: false,
      apartments: false,
      houses: false,
      allRoomsHousesApartments: [],
      singleRoomsOnly: [],
      doubleRoomsOnly: [],
      apartmentsOnly: [],
      housesOnly: [],
    };
  }

  handleChangeCategorie = (event, categorie) => {
    this.setState({ categorie: categorie });
    switch (categorie) {
      case 0:
        this.setState({ all: true });
        this.setState({ single_room: false });
        this.setState({ double_room: false });
        this.setState({ apartments: false });
        this.setState({ houses: false });
        break;
      case 1:
        this.setState({ all: false });
        this.setState({ single_room: true });
        this.setState({ double_room: false });
        this.setState({ apartments: false });
        this.setState({ houses: false });
        break;
      case 2:
        this.setState({ all: false });
        this.setState({ single_room: false });
        this.setState({ double_room: true });
        this.setState({ apartments: false });
        this.setState({ houses: false });
        break;
      case 3:
        this.setState({ all: false });
        this.setState({ single_room: false });
        this.setState({ double_room: false });
        this.setState({ apartments: true });
        this.setState({ houses: false });
        break;
      case 4:
        this.setState({ all: false });
        this.setState({ single_room: false });
        this.setState({ double_room: false });
        this.setState({ apartments: false });
        this.setState({ houses: true });
        break;
      default:
        break;
    }
  };

  check_variant = () => {
    if (window.screen.availWidth < 500) {
      return "scrollable";
    } else {
      return "fullWidth";
    }
  };

  fetchProperties = () => {
    const apiUtils = new ApiUtils();
    apiUtils
      .getProperties()
      .then((response) => {
        let combinedArrays = [
          ...response.data.rentalDoubles,
          ...response.data.rentalApartments,
          ...response.data.rentalSingles,
          ...response.data.rentalHouses,
          ...response.data.rentalOffices,
          ...response.data.rentalSubRents,
        ];
        this.setState({ allRoomsHousesApartments: combinedArrays });
        this.setState({ singleRoomsOnly: response.data.rentalSingles });
        this.setState({ doubleRoomsOnly: response.data.rentalDoubles });
        this.setState({ apartmentsOnly: response.data.rentalApartments });
        this.setState({ housesOnly: response.data.rentalHouses });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.fetchProperties();
  }

  render() {
    return (
      <div
        style={{
          minHeight: 500,
          backgroundColor: project().background_color,
        }}
      >
        <Container style={{ paddingTop: 10 }} fluid>
          <Row style={{ paddingBottom: 10 }}>
            <Col lg={12}>
              <Paper square variant="outlined">
                <Tabs
                  value={this.state.categorie}
                  onChange={this.handleChangeCategorie}
                  variant={this.check_variant()}
                  indicatorColor={project().projectColor}
                  textColor={project().projectColor}
                  aria-label="icon tabs example"
                >
                  <Tab label="All" />
                  <Tab label="Single rooms" />
                  <Tab label="Double rooms" />
                  <Tab label="Apartments" />
                  <Tab label="Houses" />
                </Tabs>
              </Paper>
            </Col>
          </Row>
          {/* All properties */}
          <MDBRow style={{ paddingBottom: 10 }} hidden={!this.state.all}>
            {this.state.allRoomsHousesApartments.map((property) => {
              return <CardDesign md={3} details={property} />;
            })}
          </MDBRow>
          {/* single rooms */}
          <MDBRow
            style={{ paddingBottom: 10 }}
            hidden={!this.state.single_room}
          >
            {this.state.singleRoomsOnly.map((property) => {
              return <CardDesign md={3} details={property} />;
            })}
          </MDBRow>
          {/* double rooms */}
          <MDBRow
            style={{ paddingBottom: 10 }}
            hidden={!this.state.double_room}
          >
            {this.state.doubleRoomsOnly.map((property) => {
              return <CardDesign md={3} details={property} />;
            })}
          </MDBRow>
          {/* apartments */}
          <MDBRow style={{ paddingBottom: 10 }} hidden={!this.state.apartments}>
            {this.state.apartmentsOnly.map((property) => {
              return <CardDesign md={3} details={property} />;
            })}
          </MDBRow>
          {/* houses */}
          <MDBRow style={{ paddingBottom: 10 }} hidden={!this.state.houses}>
            {this.state.housesOnly.map((property) => {
              return <CardDesign md={3} details={property} />;
            })}
          </MDBRow>
          <Row style={{ paddingBottom: 10 }}>
            <Col lg={12} style={{ textAlign: "right" }}>
              <ShowUserName />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
