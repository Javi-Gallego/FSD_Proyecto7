import "./HeaderPhotoProfile.css";
import { useNavigate } from "react-router-dom";

export const HeaderPhotoProfile = ({ source, destination }) => {
  const navigate = useNavigate();

  return (
    <div
      data-name={source}
      className="headerPhotoProfileDesign"
      onClick={() => navigate(destination)}
    >
      <img src={source} alt="Profile photo"></img>
    </div>
  );
};