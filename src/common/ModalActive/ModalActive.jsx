import "./ModalActive.css";
import React, { useState } from "react";
import { userData, logout } from "../../app/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { MyButton } from "../MyButton/MyButton";
import { deactivateUser } from "../../services/apiCalls";
import { useNavigate } from "react-router";

export const ModalActive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const reduxUser = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleModal = (e) => {
    if (e?.target?.value) {
      setIsActive(e.target.value);
    }
    setIsOpen(!isOpen);
  };
  const changeActive = async () => {
    try {
      await deactivateUser(reduxUser.credentials.token);
        dispatch(logout({ credentials: "" }));
      navigate("/");
    } catch (error) {
      console.log("errorModal: " + error);
    }
  };
  return (
    <div>
      <MyButton
        text="Desactivar"
        functionClick={toggleModal}
        currentClass="buttonInactive"
      />
      {isOpen && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal} />
          <div className="modal-content">
            <h2>Perfil activo/inactivo</h2>
            <p>
              Si desactivas tu cuenta no podrás volver a entrar en tu cuenta. Ni tu perfil ni tus
              mensajes serán accesibles para nadie. ¿Quieres continuar?
            </p>
            <button onClick={changeActive}>
              Aceptar
            </button>
            <button onClick={toggleModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};
