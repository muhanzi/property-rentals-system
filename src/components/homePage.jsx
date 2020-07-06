import React, { useEffect } from "react";
import project from "./subComponents/static";
import { Container, Row, Col, Image } from "react-bootstrap";
import CardDesign from "./subComponents/cardDesign";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MDBRow } from "mdbreact";
import ApiUtils from "../apiCalls/APIUtils";

const HomePage = () => {
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      minWidth: 300,
    },
  });
  const classes = useStyles();

  const [categorie, setCategorie] = React.useState(0);
  const [all, setAll] = React.useState(true);
  const [single_room, setSingle_room] = React.useState(false);
  const [double_room, setDouble_room] = React.useState(false);
  const [apartments, setApartments] = React.useState(false);
  const [houses, setHouses] = React.useState(false);
  //
  const [
    allRoomsHousesApartments,
    setAllRoomsHousesApartments,
  ] = React.useState([]);
  const [singleRoomsOnly, setSingleRoomsOnly] = React.useState([]);
  const [doubleRoomsOnly, setDoubleRoomsOnly] = React.useState([]);
  const [apartmentsOnly, setApartmentsOnly] = React.useState([]);
  const [housesOnly, setHousesOnly] = React.useState([]);

  const handleChangeCategorie = (event, categorie) => {
    setCategorie(categorie);
    switch (categorie) {
      case 0:
        setAll(true);
        setSingle_room(false);
        setDouble_room(false);
        setApartments(false);
        setHouses(false);
        break;
      case 1:
        setAll(false);
        setSingle_room(true);
        setDouble_room(false);
        setApartments(false);
        setHouses(false);
        break;
      case 2:
        setAll(false);
        setSingle_room(false);
        setDouble_room(true);
        setApartments(false);
        setHouses(false);
        break;
      case 3:
        setAll(false);
        setSingle_room(false);
        setDouble_room(false);
        setApartments(true);
        setHouses(false);
        break;
      case 4:
        setAll(false);
        setSingle_room(false);
        setDouble_room(false);
        setApartments(false);
        setHouses(true);
        break;
      default:
        break;
    }
  };

  const check_variant = () => {
    if (window.screen.availWidth < 500) {
      return "scrollable";
    } else {
      return "fullWidth";
    }
  };

  // just show them //
  const all_properties = {
    rentalDoubles: [
      {
        property_id: "41",
        property_name: "DefaultDouble",
        description: "Category Double",
        monthly_fee: "0",
        featured_photo:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        gallary_photos:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        property_facilities: "In Default,,,,,,,,",
        village: "Lapisha",
        uploaded_at: "2020-03-09 19:19:57",
        updated_at: "2020-3-17",
        type_name: "Double",
        location_name: "Munyonyo",
        user_id: "22",
        longtude: "32.6247428",
        latitude: "0.2870831",
        location_id: "3",
      },
    ],
    rentalApartments: [
      {
        property_id: "44",
        property_name: "DefaultApartment",
        description: "Category Apartment",
        monthly_fee: "0",
        featured_photo:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        gallary_photos:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        property_facilities: "In Default,,,,,,,,",
        village: "Lapisha",
        uploaded_at: "2020-03-09 01:03:01",
        updated_at: "2020-3-17",
        type_name: "Apartment",
        location_name: "Kabalagala",
        user_id: "22",
        longtude: "32.5967308",
        latitude: "0.2996852",
        location_id: "1",
      },
    ],
    rentalSingles: [
      {
        property_id: "45",
        property_name: "DefaultSingle",
        description: "Category Single",
        monthly_fee: "0",
        featured_photo:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        gallary_photos:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        property_facilities: "In Default,,,,,,,,",
        village: "Mubaraka",
        uploaded_at: "2020-02-26 16:29:21",
        updated_at: "2020-3-17",
        type_name: "Single",
        location_name: "Makindye",
        user_id: "22",
        longtude: "32.5967647",
        latitude: "0.2996727",
        location_id: "4",
      },
    ],
    rentalHouses: [
      {
        property_id: "46",
        property_name: "DefaultHouse",
        description: "Category House",
        monthly_fee: "0",
        featured_photo:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        gallary_photos:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        property_facilities: "In Default,,,,,,,,",
        village: "Lapisha",
        uploaded_at: "2020-03-09 18:27:25",
        updated_at: "2020-3-17",
        type_name: "House",
        location_name: "Kabalagala",
        user_id: "22",
        longtude: "32.5967647",
        latitude: "0.2996727",
        location_id: "1",
      },
    ],
    rentalOffices: [
      {
        property_id: "47",
        property_name: "DefaultOffice",
        description: "Category Office",
        monthly_fee: "0",
        featured_photo:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        gallary_photos:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        property_facilities: "In Default,,,,,,,,",
        village: "Lapisha",
        uploaded_at: "2020-03-09 19:57:41",
        updated_at: "2020-3-17",
        type_name: "Office",
        location_name: "Makindye",
        user_id: "22",
        longtude: "32.5967647",
        latitude: "0.2996727",
        location_id: "4",
      },
    ],
    rentalSubRents: [
      {
        property_id: "50",
        property_name: "DefaultSubRent",
        description: "Category SubRent",
        monthly_fee: "0",
        featured_photo:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        gallary_photos:
          "https://nipashi.lapishagroup.com/app/v1/uploads/placeholder-3.png",
        property_facilities: "In Default,,,,,,,,",
        village: "Lapisha",
        uploaded_at: "2020-03-10 20:26:46",
        updated_at: "2020-3-17",
        type_name: "Sub-Rent",
        location_name: "Munyonyo",
        user_id: "22",
        longtude: "32.5967647",
        latitude: "0.2996727",
        location_id: "3",
      },
    ],
  };

  const combinedArrays = [
    ...all_properties.rentalDoubles,
    ...all_properties.rentalApartments,
    ...all_properties.rentalSingles,
    ...all_properties.rentalHouses,
    ...all_properties.rentalOffices,
    ...all_properties.rentalSubRents,
  ];

  const HardCoded_AllRoomsHousesApartments = combinedArrays;
  const HardCoded_SingleRoomsOnly = all_properties.rentalSingles;
  const HardCoded_DoubleRoomsOnly = all_properties.rentalDoubles;
  const HardCoded_ApartmentsOnly = all_properties.rentalApartments;
  const HardCoded_HousesOnly = all_properties.rentalHouses;

  useEffect(() => {
    /*
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
        setAllRoomsHousesApartments(combinedArrays);
        setSingleRoomsOnly(response.data.rentalSingles);
        setDoubleRoomsOnly(response.data.rentalDoubles);
        setApartmentsOnly(response.data.rentalApartments);
        setHousesOnly(response.data.rentalHouses);
      })
      .catch((error) => {
        console.log(error.message);
      });
      */
  });

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
            <Paper square className={classes.root} variant="outlined">
              <Tabs
                value={categorie}
                onChange={handleChangeCategorie}
                variant={check_variant()}
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
        {/* /////////// retrieved properties from lapisha group api
        <MDBRow style={{ paddingBottom: 10 }} hidden={!all}>
          {allRoomsHousesApartments.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
        <MDBRow style={{ paddingBottom: 10 }} hidden={!single_room}>
          {singleRoomsOnly.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
        <MDBRow style={{ paddingBottom: 10 }} hidden={!double_room}>
          {doubleRoomsOnly.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
        <MDBRow style={{ paddingBottom: 10 }} hidden={!apartments}>
          {apartmentsOnly.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
        <MDBRow style={{ paddingBottom: 10 }} hidden={!houses}>
          {housesOnly.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
        */}
        {/* /////////////////////////        hard code // just to see output         ///////////////////////// */}
        {/* All properties */}
        <MDBRow style={{ paddingBottom: 10 }} hidden={!all}>
          {HardCoded_AllRoomsHousesApartments.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
        {/* single rooms */}
        <MDBRow style={{ paddingBottom: 10 }} hidden={!single_room}>
          {HardCoded_SingleRoomsOnly.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
        {/* double rooms */}
        <MDBRow style={{ paddingBottom: 10 }} hidden={!double_room}>
          {HardCoded_DoubleRoomsOnly.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
        {/* apartments */}
        <MDBRow style={{ paddingBottom: 10 }} hidden={!apartments}>
          {HardCoded_ApartmentsOnly.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
        {/* houses */}
        <MDBRow style={{ paddingBottom: 10 }} hidden={!houses}>
          {HardCoded_HousesOnly.map((property) => {
            return <CardDesign md={3} details={property} />;
          })}
        </MDBRow>
      </Container>
    </div>
  );
};

export default HomePage;
