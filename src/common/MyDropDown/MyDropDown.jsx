import { useState } from "react";
import "./MyDropDown.css";
import { HeaderPhotoProfile } from "../HeaderPhotoProfile/HeaderPhotoProfile";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

export const MyDropDown = () => {
  const reduxUser = useSelector(userData);
  const [myDropdown, setMyDropdown] = useState(false);

  const toggleDropDown = () => {
    setMyDropdown(!myDropdown);
  };

  const closeDropDown = () => {
    setMyDropdown(false);
  };

  return (
    <div className="dropdown" onBlur={closeDropDown}>
      <button onClick={toggleDropDown} className="dropbtn">
        Dropdown
      </button>
      <div id="myDropdown" className={myDropdown ? "dropdown-content show" : "dropdown-content"}>
      <HeaderPhotoProfile
            source={reduxUser.credentials.user.photo}
            destination="/profile"
          />
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </div>
  );
};
