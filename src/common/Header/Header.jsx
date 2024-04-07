import { HeaderLink } from "../HeaderLink/HeaderLink";
import { LogoutLink } from "../LogoutLink/LogoutLink";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { HeaderPhotoProfile } from "../HeaderPhotoProfile/HeaderPhotoProfile";

export function Header() {
  const reduxUser = useSelector(userData);

  return (
    <div className="headerDesign">
      {reduxUser.credentials.token ? (
        <>
          <HeaderPhotoProfile
            source={reduxUser.credentials.user.photo}
            destination="/profile"
          />
          <HeaderLink title="Home" destination="/" />
          <HeaderLink title="Timeline" destination="/timeline" />
          <LogoutLink title="logout" />
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
