import { useEffect, useState } from "react";
import "./ConfigDropDown.css";
import config from "../../assets/config.svg";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { LogoutLink } from "../LogoutLink/LogoutLink";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import { ConfigIcon } from "../ConfigIcon/ConfigIcon";

export const ConfigDropDown = () => {
  const reduxUser = useSelector(userData);
  const [myDropdown, setMyDropdown] = useState(false);

  const toggleDropDown = () => {
    setMyDropdown(!myDropdown);
  };

  return (
    <div className="dropdown" onClick={toggleDropDown}>
      {/* <button onClick={toggleDropDown} className="dropbtn">
        <ConfigIcon color="var(--secondary-color)" />
      </button> */}
      <div onClick={toggleDropDown} className="dropIcon">
        <ConfigIcon color="var(--secondary-color)" />
      </div>
      <div
        id="myDropdown"
        className={myDropdown ? "dropdown-content show" : "dropdown-content"}
      >
        <HeaderLink title="Config" destination="/config" />
        <LogoutLink title="logout" />
      </div>
    </div>
  );
};
