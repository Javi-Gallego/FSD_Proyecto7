import { HeaderLink } from "../HeaderLink/HeaderLink";
import { LogoutLink } from "../LogoutLink/LogoutLink";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";

export function Header() {
  const reduxUser = useSelector(userData)

  return (
    <div className="headerDesign">
      {reduxUser.credentials.token ? (
        <>
          <HeaderLink title="Home" destination="/" />
          <HeaderLink
            title={reduxUser.credentials.user.userName}
            destination="/profile"
          />
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

