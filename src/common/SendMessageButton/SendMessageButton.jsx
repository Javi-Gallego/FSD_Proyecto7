import "./SendMessageButton.css";
import message from "../../assets/message.svg";
import { useNavigate } from "react-router";

export const SendMessageButton = () => {
    const navigate = useNavigate();
    
    return (
        <img className="sendMessageButtonDesign" onClick={() => (navigate("/sendMessage"))} src={message} alt="newMessage" />
    );
};