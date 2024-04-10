import { updateProfile } from "../../services/apiCalls";
import "./ModalChangePassword.css";
import React, { useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { MyButton } from "../MyButton/MyButton";
import { useNavigate } from "react-router";
import { MyInput } from "../MyInput/MyInput";
import { validate } from "../../utils/functions";

export const ModalChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const reduxUser = useSelector(userData);
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bodyPassword, setBodyPassword] = useState({
    newPass: "",
    repeatPass: "",
    currentPass: "",
  });

  const [bodyPasswordError, setBodyPasswordError] = useState({
    newPassError: "",
    repeatPassError: "",
    currentPassError: "",
  });
  const inputHandler = (e) => {
    console.log("hola");
    setBodyPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    checkError(e);
  };
  const checkError = (e) => {
    const error = validate(e.target.name, e.target.value);

    setBodyPasswordError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };
  const toggleModal = (e) => {
    setIsOpen(!isOpen);
  };
  const changePassword = async () => {
    try {
      if (bodyPassword.newPass !== bodyPassword.repeatPass) {
        setBodyPasswordError((prevState) => ({
          ...prevState,
          repeatPassError: "Las contraseñas no coinciden",
        }));
        return;
      }
      const updatePass = {
        newPassword: bodyPassword.newPass,
        currentPassword: bodyPassword.currentPass,
      };

      await updateProfile(updatePass, reduxUser.credentials.token);
      setIsHidden(true);
      setTimeout(() => {
        setIsHidden(false);
        toggleModal();
      }, 1500);
      setBodyPassword((prevState) => ({
        ...prevState,
        newPass: "",
        repeatPass: "",
        currentPass: "",
      }));
    } catch (error) {
      console.log("errorModal: " + error);
    }
  };
  return (
    <div>
      <MyButton
        text="Cambiar contraseña"
        functionClick={toggleModal}
        currentClass="buttonDesign"
      />
      {isOpen && (
        <div className="modal">
          <div className="backModal" onClick={toggleModal} />
          <div
            className={
              isHidden === true ? "modalContent hiddenContent" : "modalContent"
            }
          >
            <div className="fieldChangePass">Introduce nuevo password:</div>
            <MyInput
              type="password"
              name="newPass"
              value={bodyPassword.newPass || ""}
              disabled=""
              onChangeFunction={inputHandler}
              className="fieldInputDesign enabledInput"
            />
            <div className="fieldEr">{bodyPasswordError.newPassError}</div>
            <div className="fieldChangePass">Repite el nuevo password:</div>
            <MyInput
              type="password"
              name="repeatPass"
              value={bodyPassword.repeatPass || ""}
              disabled=""
              onChangeFunction={inputHandler}
              className="fieldInputDesign enabledInput"
            />
            <div className="fieldEr">{bodyPasswordError.repeatPassError}</div>
            <div className="fieldChangePass">
              Introduce el antiguo password:
            </div>
            <MyInput
              type="password"
              name="currentPass"
              value={bodyPassword.currentPass || ""}
              disabled=""
              onChangeFunction={inputHandler}
              className="fieldInputDesign enabledInput"
            />

            <div className="fieldEr">{bodyPasswordError.currentPassError}</div>
            <div className="buttonsChangePass">
              <button
                className="buttonChange acceptButton"
                onClick={changePassword}
              >
                Aceptar
              </button>
              <button
                className="buttonChange cancelButton"
                onClick={toggleModal}
              >
                Cancelar
              </button>
            </div>
          </div>
          <div
            className={
              isHidden === false
                ? "modalContent2 hiddenContent"
                : "modalContent2"
            }
          >
            Password cambiado correctamente
          </div>
        </div>
      )}
    </div>
  );
};
