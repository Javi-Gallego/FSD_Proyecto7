import { Header } from "../../common/Header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getProfile, updateProfile } from "../../services/apiCalls";
import spinner from "../../img/rocket.gif";
import profilePhoto from "../../img/userphoto.png";
// import { FieldInput } from "../../common/FieldInput/FieldInput";
// import { Button } from "../../common/Button/Button";
import { validate } from "../../utils/functions";

export const Profile = () => {
  if (sessionStorage.getItem("auth") === "false") {
    navigate("/");
  }

  const navigate = useNavigate();

  const [firstProfile, setFirstProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
  });

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
  });

  const [profileError, setProfileError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    photoError: "",
  });

  const [msgError, setMsgError] = useState("");
  const [disabled, setDisabled] = useState("disabled");
  const [firstFetch, setFirstFetch] = useState(false);

  useEffect(() => {
    if (!firstFetch) {
      getFirstProfile();
    }
  }, []);

  const inputHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getFirstProfile = async () => {
    try {
      if (sessionStorage.getItem("auth") === "false") {
        navigate("/");
      }

      if (profile.email === "") {
        const NewProfile = await getProfile(sessionStorage.getItem("token"));

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
      const updated = await updateProfile(
        sessionStorage.getItem("token"),
        updatedFields
      );
      setDisabled("disabled");
    } catch (error) {}
  };

  const changePass = () => {
    navigate("/changepassword");
  };

  return (
    <>
      <Header />
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
          </article>
          <article className="profileCardDesign">
            <p>
              Nombre:{profile.userName}
              {/* <FieldInput
                type="text"
                name="firstName"
                value={profile.firstName || ""}
                disabled={disabled}
                onChangeFunction={inputHandler}
                onBlur={checkError}
                className={
                  disabled === ""
                    ? "fieldInputDesign enabledInput"
                    : "fieldInputDesign"
                }
              /> */}
            </p>
            {/* <div className="fieldEr">{profileError.firstNameError}</div> */}
            <p>
              Apellido:
              {/* <FieldInput
                type="text"
                name="lastName"
                value={profile.lastName || ""}
                disabled={disabled}
                onChangeFunction={inputHandler}
                onBlur={checkError}
                className={
                  disabled === ""
                    ? "fieldInputDesign enabledInput"
                    : "fieldInputDesign"
                }
              /> */}
            </p>
            {/* <div className="fieldEr">{profileError.lastNameError}</div> */}
            <p>
              Email:{profile.email}
              {/* <FieldInput
                type="email"
                name="email"
                value={profile.email || ""}
                disabled={disabled}
                onChangeFunction={inputHandler}
                onBlur={checkError}
                className={
                  disabled === ""
                    ? "fieldInputDesign enabledInput"
                    : "fieldInputDesign"
                }
              /> */}
            </p>
            {/* <div className="fieldEr">{profileError.emailError}</div> */}
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
