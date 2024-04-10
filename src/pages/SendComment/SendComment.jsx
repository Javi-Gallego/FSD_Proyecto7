import "./SendComment.css";
import imageIcon from "../../assets/image.svg";
import { createCommentary, uploadImagePost } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { validatePhoto } from "../../utils/functions";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { CustomTextArea } from "../../common/CustomTextArea/CustomTextArea";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { commentData } from "../../app/slices/commentSlice";
import { useNavigate } from "react-router-dom";

export const SendComment = () => {
  const postMaxLength = 150;
  const reduxUser = useSelector(userData);
  const reduxComment = useSelector(commentData);
  const navigate = useNavigate();
  const [fileSelected, setFileSelected] = useState(false);
  const [isValidPhoto, setIsValidPhoto] = useState("disabled");
  const [image, setImage] = useState("");
  const [post, setPost] = useState({
    photoUrl: "",
    message: "",
    keyWords: "",
    refersTo: reduxComment.postId,
  });

  useEffect(() => {
    if (reduxUser.credentials.token === "") {
      navigate("/login");
    }
  }, []);
  
  useEffect(() => {
    if (fileSelected) {
      SendComment();
    }
  }, [post.photoUrl]);

  const uploadPhoto = async () => {
    try {
      const response = await uploadImagePost(image);

      setPost((prevState) => ({
        ...prevState,
        photoUrl: response,
      }));

      setIsValidPhoto("disabled");
      setFileSelected(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const error = validatePhoto(file);
      if (error === "") {
        setIsValidPhoto("");
        setFileSelected(true);
        setImage(file);
      }
    }
  };
  const handleInputChange = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };
  const startMessage = async () => {
    try {
      if (fileSelected) {
        await uploadPhoto();
      } else {
        SendComment();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const SendComment = async () => {
    try {
      console.log("token ", reduxUser.credentials.token)
      await createCommentary(post, reduxComment.postId , reduxUser.credentials.token);
      navigate("/profile");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div className="sendCommentDesign">
      <div className="sendCommentCard">
        <div className="sendMessageTitle">Escribir mensaje</div>
        <label htmlFor="photo">
          <img id="cam" src={imageIcon}></img>
        </label>
        <input
          id="photo"
          type="file"
          name="photo"
          onChange={handleFileChange}
        />
        <div className="bodyMessage">
          Texto:
          <CustomTextArea
            type="text"
            name="message"
            value={post.message || ""}
            disabled=""
            onChangeFunction={handleInputChange}
            className="postTextAreaDesign"
            maxLength={postMaxLength}
          />
          <div
            className={post.message.length > 140 ? "finalCountdown" : "counter"}
          >
            Te quedan {postMaxLength - post.message.length} carácteres
          </div>
        </div>
        <div className="keyWords">
          Palabras clave:
          <MyInput
            type="text"
            name="keyWords"
            value={post.keyWords || ""}
            disabled=""
            onChangeFunction={handleInputChange}
            className=""
          />
        </div>
        <MyButton
          text="Enviar"
          functionClick={startMessage}
          currentClass="buttonDesign"
        />
      </div>
    </div>
  );
};
