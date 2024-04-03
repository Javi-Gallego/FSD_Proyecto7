import "./LogoutLink.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/slices/userSlice";

export const LogoutLink = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutMe = () => {
    dispatch(logout({ credentials: "" }));

    navigate("/login");
  };

  return (
    <div className="logoutDesign" onClick={logoutMe}>
      {title}
    </div>
  );
};
