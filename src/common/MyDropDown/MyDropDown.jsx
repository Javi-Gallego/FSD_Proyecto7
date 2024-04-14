import { useState } from "react";
import "./MyDropDown.css";
import { HeaderPhotoProfile } from "../HeaderPhotoProfile/HeaderPhotoProfile";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import { photoData } from "../../app/slices/photoSlice";

export const MyDropDown = () => {
  const reduxUser = useSelector(userData);
  const reduxPhoto = useSelector(photoData);
  const [myDropdown, setMyDropdown] = useState(false);

  const toggleDropDown = () => {
    setMyDropdown(!myDropdown);
  };

  return (
    <div className="dropdown" onClick={toggleDropDown}>
      <div className="headerPhotoProfileDesign" onClick={toggleDropDown}>
        <img src={reduxPhoto.photo} alt="Profile photo"></img>
      </div>
      <div
        id="myDropdown"
        className={myDropdown ? "dropdown-content show" : "dropdown-content"}
      >
        <HeaderLink title="Perfil" destination="/profile" />
        <HeaderLink title="Mis posts" destination="/ownposts" />
        <HeaderLink title="Following" destination="/following" />
        <HeaderLink title="Búsqueda" destination="/search" />
      </div>
    </div>
  );
};
