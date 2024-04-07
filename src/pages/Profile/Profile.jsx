import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  getProfile,
  handleFormSubmit,
  updateProfile,
} from "../../services/apiCalls";
import { validate, validatePhoto } from "../../utils/functions";
import { userData, login } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../../img/rocket.gif";
import camera from "../../assets/camera.svg";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";

export const Profile = () => {
  const navigate = useNavigate();
  const reduxUser = useSelector(userData);
  const dispatch = useDispatch();
  const [fileSelected, setFileSelected] = useState(false);
  const [isValidPhoto, setIsValidPhoto] = useState("disabled");

  const [firstProfile, setFirstProfile] = useState({
    userName: "",
    lastName: "",
    email: "",
    photo: "",
  });

  const [profile, setProfile] = useState({
    userName: "",
    lastName: "",
    email: "",
    photo: "",
  });

  const [profileError, setProfileError] = useState({
    userNameError: "",
    lastNameError: "",
    emailError: "",
    photoError: "",
  });

  const [msgError, setMsgError] = useState("");
  const [disabled, setDisabled] = useState("disabled");
  const [firstFetch, setFirstFetch] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState("");

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
            email: NewProfile.email,
            isActive: NewProfile.is_active,
            privacy: NewProfile.privacy,
            photo: NewProfile.photo,
          });

          setProfile({
            userName: NewProfile.userName,
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

  const changeProfile = async (profile) => {
    try {
      let updatedFields = {};

      for (let field in firstProfile) {
        if (firstProfile[field] !== profile[field] || field === "photo") {
          updatedFields[field] = profile[field];
        }
      }

      const updated = await updateProfile(
        updatedFields,
        reduxUser.credentials.token
      );

      setFirstProfile(updated);
      setProfile(updated);
      setDisabled("disabled");
      const updateCredentials = {
        ...reduxUser.credentials,
        user: updated,
      };
      dispatch(login({ credentials: updateCredentials }));
    } catch (error) {}
  };

  const changePass = () => {
    navigate("/changepassword");
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
    try {
      const response = await handleFormSubmit(event);
      setProfile((prevState) => {
        const updatedProfile = {
          ...prevState,
          photo: response,
        };
        changeProfile(updatedProfile);
        return updatedProfile;
      });
      setIsValidPhoto("disabled");
      setFileSelected(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      {firstProfile.email === "" ? (
        <div className="profileDesign">
          <img src={spinner}></img>
        </div>
      ) : (
        <div className="profileDesign">
          <article className="profileCardDesign">
            <img src={profile.photo} alt="profile" />
            <div className="editButton">
              <form onSubmit={updateProfilePhoto}>
                <label htmlFor="photo">
                  <img id="cam" src={camera}></img>
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
            <p>
              Nombre:
              <MyInput
                type="text"
                name="firstName"
                value={profile.userName || ""}
                disabled={disabled}
                onChangeFunction={inputHandler}
                className={
                  disabled === ""
                    ? "fieldInputDesign enabledInput"
                    : "fieldInputDesign"
                }
              />
            </p>
            {/* <div className="fieldEr">{profileError.userNameError}</div> */}
            <p>
              Apellido:
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
            </p>
            <div className="fieldEr">{profileError.lastNameError}</div>
            <p>
              Email:
              <MyInput
                type="email"
                name="email"
                value={profile.email || ""}
                disabled={disabled}
                onChangeFunction={inputHandler}
                className={
                  disabled === ""
                    ? "fieldInputDesign enabledInput"
                    : "fieldInputDesign"
                }
              />
            </p>
            <div className="fieldEr">{profileError.emailError}</div>
          </article>
          <article className="profileCardDesign">
            <MyButton
              text={disabled === "" ? "Guardar" : "Edit"}
              functionClick={disabled === "" ? changeProfile : updateDisabled}
              currentClass={
                disabled === "" ? "buttonDesign update" : "buttonDesign"
              }
            />
            <div className="separator"></div>
            <MyButton
              text="Cambiar contraseña"
              functionClick={changePass}
              currentClass="buttonDesign"
            />
          </article>
        </div>
      )}
    </>
  );
};
