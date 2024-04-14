import { useState } from "react";
import "./ConfigDropDown.css";
import { LogoutLink } from "../LogoutLink/LogoutLink";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import { ConfigIcon } from "../ConfigIcon/ConfigIcon";

export const ConfigDropDown = () => {
  const [myDropdown, setMyDropdown] = useState(false);

  const toggleDropDown = () => {
    setMyDropdown(!myDropdown);
  };

  return (
    <div className="dropdown" onClick={toggleDropDown}>
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
