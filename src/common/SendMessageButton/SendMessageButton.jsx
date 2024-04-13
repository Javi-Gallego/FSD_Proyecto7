import "./SendMessageButton.css";
import message from "../../assets/message.svg";
import { useNavigate } from "react-router";
import { activateVibration } from "../../utils/functions";

export const SendMessageButton = () => {
    const navigate = useNavigate();
    
    const sendMessage = () => {
        console.log("sendMessage");
        activateVibration(200);
        navigate("/sendMessage");
    };    
    return (
        // <img className="sendMessageButtonDesign" onClick={() => (navigate("/sendMessage"))} src={message} alt="newMessage" />
        <img className="sendMessageButtonDesign" onClick={sendMessage} src={message} alt="newMessage" />
    );
};