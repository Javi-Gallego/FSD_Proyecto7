import "./HeaderPhotoProfile.css";
import { useNavigate } from "react-router-dom";
import { RocketIcon } from "../RocketIcon/RocketIcon";

export const HeaderPhotoProfile = ({ destination }) => {
  const navigate = useNavigate();

  return (
        <div className="dropdown" onClick={() => navigate(destination)}>
        <div onClick={() => navigate(destination)} className="dropIcon">
          <RocketIcon color="var(--secondary-color)" />
        </div>
        </div>
  );
};