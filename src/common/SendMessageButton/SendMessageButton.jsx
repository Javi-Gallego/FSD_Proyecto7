import "./SendMessageButton.css";
import { useNavigate } from "react-router";
import { activateVibration } from "../../utils/functions";
import { MessageIcon } from "../MessageIcon/MessageIcon";

export const SendMessageButton = () => {
  const navigate = useNavigate();

  const sendMessage = () => {
    console.log("sendMessage");
    activateVibration(200);
    navigate("/sendMessage");
  };
  return (
    <div
      className="sendMessageButtonDesign"
      onClick={sendMessage}
      alt="newMessage"
    >
      <MessageIcon color="var(--secondary-color)" />
    </div>
  );
};
