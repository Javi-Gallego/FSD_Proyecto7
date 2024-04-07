import { updateProfile } from "../../services/apiCalls";
import "./ModalPrivacy.css";
import React, { useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";

export const ModalPrivacy = (privacy) => {
  const [isOpen, setIsOpen] = useState(false);
  const [publicy, setPublicy] = useState(privacy);
  const reduxUser = useSelector(userData);

  const toggleModal = (e) => {
    if (e?.target?.value) {
      setPublicy(e.target.value);
    }
    setIsOpen(!isOpen);
  };
  const changePrivacy = async () => {
    try {
      const newPolicy = {
        privacy: publicy,
      };
      await updateProfile(newPolicy, reduxUser.credentials.token);

      toggleModal();
    } catch (error) {
      console.log("errorModal: " + error);
    }
  };
  return (
    <div>
      <select
        name="isValid"
        id="isValid"
        value={publicy}
        onChange={toggleModal}
      >
        <option value="public">Público</option>
        <option value="private">Privado</option>
      </select>
      {isOpen && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal} />
          <div className="modal-content">
            <h2>Privacidad del perfil</h2>
            <p>
              Si el perfil es público aparecerás en las búsquedas de otros
              usuarios y tus posts serán visibles por todos. Si el perfil es
              privado solo tus seguidores podrán ver tus posts pero aparecerás
              en las búsquedas y podrán mandarte solicitudes de amistad.
              ¿Quieres continuar?
            </p>
            <button onClick={() => changePrivacy(isValid.value)}>
              Aceptar
            </button>
            <button onClick={toggleModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};
