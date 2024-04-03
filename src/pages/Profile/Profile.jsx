import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getProfile, updateProfile } from "../../services/apiCalls";
import { validate } from "../../utils/functions";
import { userData, login } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../../img/rocket.gif";
import profilePhoto from "../../img/userphoto.png";
import camera from "../../assets/camera.svg";
import { MyInput } from "../../common/MyInput/MyInput";

export const Profile = () => {
  const navigate = useNavigate();
  const reduxUser = useSelector(userData);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!reduxUser.credentials.token){
      navigate("/");
    }
    if (!firstFetch) {
      retrieveProfile();
    }
  }, []);

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
        console.log(NewProfile.userName)
        if(firstFetch === false){
          setFirstProfile({
            userName: NewProfile.userName,
            email: NewProfile.email,
            isActive: NewProfile.is_active,
            privacy: NewProfile.privacy,
          });
  
          setProfile({
            userName: NewProfile.userName,
            email: NewProfile.email,
            isActive: NewProfile.is_active,
            privacy: NewProfile.privacy,
          });
        } else{
          setFirstProfile({
            userName: profile.userName,
            email: profile.email,
            isActive: profile.is_active,
            privacy: profile.privacy,
          });
  
          setProfile({
            userName: NewProfile.userName,
            email: NewProfile.email,
            isActive: NewProfile.is_active,
            privacy: NewProfile.privacy,
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

  const changeProfile = async () => {
    try {
      let updatedFields = {};
      for (let field in firstProfile) {
        if (firstProfile[field] !== profile[field]) {
          updatedFields[field] = profile[field];
        }
      }
      const updated = await updateProfile(reduxUser.credentials.token);
      setDisabled("disabled");
    } catch (error) {}
  };

  const changePass = () => {
    navigate("/changepassword");
  };

  return (
    <>
      {profile.email === "" ? (
        <div className="profileDesign">
          <img src={spinner}></img>
        </div>
      ) : (
        <div className="profileDesign">
          <article className="profileCardDesign">
            {profile.photo ? (
              <img src={profile.photo} alt="profile" />
            ) : (
              <img src={profilePhoto} alt="profile" />
            )}
            <div className="editButton">
              <img src={camera}></img>
            </div>
            <form
              action="http://localhost:4000/API/upload/"
              encType="multipart/form-data"
              method="post"
            >
              <input type="file" name="photo" id="photo" />
              <input type="submit" value="Subir foto" />
            </form>
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
            {/* <Button
              text={disabled === "" ? "Guardar" : "Edit"}
              functionClick={disabled === "" ? changeProfile : updateDisabled}
              currentClass={
                disabled === "" ? "buttonDesign update" : "buttonDesign"
              }
            /> */}
            <div className="separator"></div>
            {/* <Button
              text="Cambiar contraseña"
              functionClick={changePass}
              currentClass="buttonDesign"
            /> */}
          </article>
        </div>
      )}
    </>
  );
};
