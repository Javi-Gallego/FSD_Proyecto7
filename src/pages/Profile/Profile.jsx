import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  getProfile,
  handleFormSubmit,
  updateProfile,
} from "../../services/apiCalls";
import { validate, validatePhoto } from "../../utils/functions";
import { userData } from "../../app/slices/userSlice";
import { writePhoto } from "../../app/slices/photoSlice";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../../img/rocket.gif";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { ModalPrivacy } from "../../common/ModalPrivacy/ModalPrivacy";
import { ModalActive } from "../../common/ModalActive/ModalActive";
import { ModalChangePassword } from "../../common/ModalChangePassoword/ModalChangePassword";
import { SendMessageButton } from "../../common/SendMessageButton/SendMessageButton";
import { CameraIcon } from "../../common/CameraIcon/CameraIcon";

export const Profile = () => {
  const navigate = useNavigate();
  const reduxUser = useSelector(userData);
  const dispatch = useDispatch();
  const [fileSelected, setFileSelected] = useState(false);
  const [isValidPhoto, setIsValidPhoto] = useState("disabled");
  const [msgError, setMsgError] = useState("");
  const [disabled, setDisabled] = useState("disabled");
  const [firstFetch, setFirstFetch] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState("");

  const [firstProfile, setFirstProfile] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    isActive: "",
    privacy: "",
  });

  const [profile, setProfile] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    isActive: "",
    privacy: "",
  });

  const [profileError, setProfileError] = useState({
    userNameError: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    photoError: "",
    isActiveError: "",
    publicyError: "",
  });

  useEffect(() => {
    if (!reduxUser.credentials.token) {
      navigate("/");
    }
    if (!firstFetch) {
      retrieveProfile();
      setProfileAvatar(`${reduxUser.credentials.userName}profilephoto`);
    }
  }, []);

  useEffect(() => {}, [profile]);

  const inputHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    checkError(e);
  };

  const retrieveProfile = async () => {
    try {
      if (profile.email === "") {
        const NewProfile = await getProfile(reduxUser.credentials.token);

        if (firstFetch === false) {
          setFirstProfile({
            userName: NewProfile.userName,
            firstName: NewProfile.firstName,
            lastName: NewProfile.lastName,
            email: NewProfile.email,
            isActive: NewProfile.is_active,
            privacy: NewProfile.privacy,
            photo: NewProfile.photo,
          });

          setProfile({
            userName: NewProfile.userName,
            firstName: NewProfile.firstName,
            lastName: NewProfile.lastName,
            email: NewProfile.email,
            isActive: NewProfile.is_active,
            privacy: NewProfile.privacy,
            photo: NewProfile.photo,
          });
        }

        setFirstFetch(true);
      }
    } catch (error) {}
  };

  const checkError = (e) => {
    const error = validate(e.target.name, e.target.value);

    setProfileError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const updateDisabled = () => {
    setDisabled("");
  };

  const changeProfile = async (updatedFields) => {
    try {
      console.log("updatedFields: ", updatedFields);
      const updated = await updateProfile(
        updatedFields,
        reduxUser.credentials.token
      );
      console.log("updated: ", updated);
      setDisabled("disabled");
      setFirstProfile({
        userName: updated.userName,
        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        isActive: updated.is_active,
        privacy: updated.privacy,
        photo: updated.photo,
      });

      setProfile({
        userName: updated.userName,
        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        isActive: updated.is_active,
        privacy: updated.privacy,
        photo: updated.photo,
      });
  
      dispatch(writePhoto(updated.photo));  
    } catch (error) {}
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const error = validatePhoto(file);
      setProfileError((prevState) => ({
        ...prevState,
        photoError: error,
      }));
      if (error === "") {
        setIsValidPhoto("");
        setFileSelected(true);
      }
    }
  };

  const updateProfilePhoto = async (event) => {
    event.preventDefault();
    try {

      const response = await handleFormSubmit(event);

      const updatedFields = {
        photo: response,
      };

      changeProfile(updatedFields);
      setIsValidPhoto("disabled");
      setFileSelected(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const updateProfileData = async () => {
    const updatedProfile = {
      ...(profile.firstName !== firstProfile.firstName && {
        firstName: profile.firstName,
      }),
      ...(profile.lastName !== firstProfile.lastName && {
        lastName: profile.lastName,
      }),
    };
    console.log("updatedProfile: ", updatedProfile);
    changeProfile(updatedProfile);
  };
 console.log("redux", reduxUser.credentials.user)
  return (
    <>
      {firstProfile.email === "" ? (
        <div className="ownPostsDesign">
          <img src={spinner}></img>
        </div>
      ) : (
        <div className="profileDesign">
          <article className="profileCardDesign">
            <img src={firstProfile.photo} alt="profile" />
            <div className="editButton">
              <form onSubmit={updateProfilePhoto}>
                <label htmlFor="photo" >
                  <div id="cam">
                    <CameraIcon color="var(--secondary-color)" />
                  </div>
                </label>
                <input
                  id="photo"
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                />
                <input
                  type="hidden"
                  name="username"
                  value={firstProfile.userName}
                />
                <input
                  type="submit"
                  value="Subir foto"
                  className={
                    fileSelected ? "submitButton fileSelected" : "submitButton"
                  }
                  disabled={isValidPhoto}
                />
              </form>
              <div className="fieldEr">{profileError.photoError}</div>
            </div>
          </article>
          <article className="profileCardDesign">
            <div className="completeField">
              <div className="fieldName">Usuario:</div>
              <MyInput
                type="text"
                name="userName"
                value={profile.userName || ""}
                disabled="disabled"
                onChangeFunction={inputHandler}
                className={
                  disabled === ""
                    ? "fieldInputDesign enabledInput"
                    : "fieldInputDesign"
                }
              />
            </div>
            <div className="fieldEr">{profileError.userNameError}</div>
            <div className="completeField">
              <div className="fieldName">Nombre:</div>
              <MyInput
                type="text"
                name="firstName"
                value={profile.firstName || ""}
                disabled={disabled}
                onChangeFunction={inputHandler}
                className={
                  disabled === ""
                    ? "fieldInputDesign enabledInput"
                    : "fieldInputDesign"
                }
              />
            </div>
            <div className="fieldEr">{profileError.firstNameError}</div>
            <div className="completeField">
              <div className="fieldName">Apellido:</div>
              <MyInput
                type="text"
                name="lastName"
                value={profile.lastName || ""}
                disabled={disabled}
                onChangeFunction={inputHandler}
                className={
                  disabled === ""
                    ? "fieldInputDesign enabledInput"
                    : "fieldInputDesign"
                }
              />
            </div>
            <div className="fieldEr">{profileError.lastNameError}</div>
            <div className="completeField">
              <div className="fieldName">Email:</div>
              <MyInput
                type="email"
                name="email"
                value={profile.email || ""}
                disabled="disabled"
                onChangeFunction={inputHandler}
                className={
                  disabled === ""
                    ? "fieldInputDesign enabledInput"
                    : "fieldInputDesign"
                }
              />
            </div>
            <div className="fieldEr">{profileError.emailError}</div>
            <ModalPrivacy privacy={firstProfile.privacy} />
          </article>
          <article className="profileCardDesign">
            <MyButton
              text={disabled === "" ? "Guardar" : "Editar"}
              functionClick={
                disabled === "" ? updateProfileData : updateDisabled
              }
              currentClass={
                disabled === "" ? "buttonDesign update" : "buttonDesign"
              }
            />
            <ModalChangePassword />
            <ModalActive active={true} />
          </article>
          <SendMessageButton />
        </div>
      )}
    </>
  );
};
