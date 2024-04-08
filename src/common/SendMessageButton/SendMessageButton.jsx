import "./SendMessageButton.css";
import message from "../../assets/message.svg";
import { useNavigate } from "react-router";

export const SendMessageButton = () => {
    const navigate = useNavigate();
    
    return (
        // <div
        // className="sendMessageButtonDesign"
        // onClick={() => (navigate("/sendMessage"))}>
        <img className="sendMessageButtonDesign" onClick={() => (navigate("/sendMessage"))} src={message} alt="newMessage" />
        // </div>

    );

};