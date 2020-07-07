import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import GoogleFont from "./fonts/googleFont";

const ShowUserName = () => {
  const user_details = useSelector((state) => state.userSigning);

  return (
    <div>
      <span>
        <FontAwesomeIcon icon={faUserCircle} color={"#000000"} />
      </span>
      <span style={{ paddingLeft: 4, color: "black" }}>
        <GoogleFont
          text={user_details.firstname + " " + user_details.lastname}
          fontfamily={"labelle"}
        />
      </span>
    </div>
  );
};

export default ShowUserName;
