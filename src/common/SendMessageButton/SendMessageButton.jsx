import "./SendMessageButton.css";
import { useNavigate } from "react-router";
import { activateVibration } from "../../utils/functions";
import { MessageIcon } from "../MessageIcon/MessageIcon";

export const SendMessageButton = () => {
  const navigate = useNavigate();

  const sendMessage = () => {
    activateVibration(200);
    navigate("/sendMessage");
  };
  
  return (
    <div
      className="sendMessageButtonDesign"
      onClick={sendMessage}
      alt="newMessage"
    >
      <MessageIcon color1="var(--primary-color)" color2="var(--secondary-color)"/>
    </div>
  );
};
