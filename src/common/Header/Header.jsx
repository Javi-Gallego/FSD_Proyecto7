import { HeaderLink } from "../HeaderLink/HeaderLink";
import { LogoutLink } from "../LogoutLink/LogoutLink";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { HeaderPhotoProfile } from "../HeaderPhotoProfile/HeaderPhotoProfile";
import { MyDropDown } from "../MyDropDown/MyDropDown";
import { ConfigDropDown } from "../ConfigDropDown/ConfigDropDown";

export function Header() {
  const reduxUser = useSelector(userData);

  return (
    <div className="headerDesign">
      {reduxUser.credentials.token ? (
        <>
          <MyDropDown />
          {/* <HeaderPhotoProfile
            source={reduxUser.credentials.user.photo}
            destination="/profile"
          />
          <HeaderLink title="OwnPosts" destination="/ownposts" /> */}
          <HeaderLink title="Lanzadera" destination="/timeline" />
          
          <ConfigDropDown />
        </>
      ) : (
        <>
          <HeaderLink title="Home" destination="/" />
          <HeaderLink title="Register" destination="/register" />
          <HeaderLink title="Login" destination="/login" />
        </>
      )}
    </div>
  );
}
