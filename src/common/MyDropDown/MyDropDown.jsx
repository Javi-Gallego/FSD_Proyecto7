import { useState } from "react";
import "./MyDropDown.css";
import { HeaderPhotoProfile } from "../HeaderPhotoProfile/HeaderPhotoProfile";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { HeaderLink } from "../HeaderLink/HeaderLink";

export const MyDropDown = () => {
  const reduxUser = useSelector(userData);
  const [myDropdown, setMyDropdown] = useState(false);

  const toggleDropDown = () => {
    setMyDropdown(!myDropdown);
  };

  return (
    <div className="dropdown">
      {/* <button onClick={toggleDropDown} className="dropbtn">
        Dropdown
      </button> */}
      <div className="headerPhotoProfileDesign" onClick={toggleDropDown}>
        <img src={reduxUser.credentials.user.photo} alt="Profile photo"></img>
      </div>
      <div
        id="myDropdown"
        className={myDropdown ? "dropdown-content show" : "dropdown-content"}
      >
        {/* <HeaderPhotoProfile
            source={reduxUser.credentials.user.photo}
            destination="/profile"
          /> */}
        <HeaderLink title="Perfil" destination="/profile" />
        <HeaderLink title="Mis posts" destination="/ownposts" />
        <HeaderLink title="Búsqueda" destination="/search" />
      </div>
    </div>
  );
};
