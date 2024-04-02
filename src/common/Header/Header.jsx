import { HeaderLink } from "../HeaderLink/HeaderLink";
import { LogoutLink } from "../LogoutLink/LogoutLink";
import "./Header.css";

export function Header() {
  return (
    <div className="headerDesign">
      {sessionStorage.getItem("auth") === "true" ? (
        <>
          <HeaderLink title="Home" destination="/" />
          <HeaderLink
            title={sessionStorage.getItem("userName")}
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
