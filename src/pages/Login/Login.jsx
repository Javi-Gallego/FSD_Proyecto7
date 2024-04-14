import { useState, useEffect } from "react";
import { MyInput } from "../../common/MyInput/MyInput";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { loginMe } from "../../services/apiCalls";
import { login } from "../../app/slices/userSlice";
import { writePhoto } from "../../app/slices/photoSlice";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

import "./Login.css";
import { MyButton } from "../../common/MyButton/MyButton";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxUser = useSelector(userData);
  sessionStorage.setItem("auth", false);

  const [msgError, setMsgError] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setCredentials((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const logMe = async () => {
    for (let credential in credentials) {
      if (credentials[credential] === "") {
        setMsgError("No has rellenado todos los campos");
        return;
      }
    }

    const fetched = await loginMe(credentials);

    if (!fetched.success) {
      setMsgError(fetched.message);
      return;
    }

    const decoded = decodeToken(fetched.token);

    const allowed = {
      token: fetched.token,
      user: decoded,
    };
    const profilePhoto = decoded.photo;
    dispatch(login({ credentials: allowed }));

    dispatch(writePhoto(profilePhoto))
    
    navigate("/");
  };

  return (
    <div className="loginDesign">
      <div className="separator"></div>
      <MyInput
        className="authInputDesign"
        type="email"
        name="email"
        placeholder="Escribe tu email"
        value={credentials.email || ""}
        onChangeFunction={inputHandler}
      />
      <div className="separator"></div>
      <MyInput
        className="authInputDesign"
        type="password"
        name="password"
        placeholder="Escribe tu password"
        value={credentials.password || ""}
        onChangeFunction={inputHandler}
      />
      <div className="separator"></div>
      <MyButton
        text="Login"
        functionClick={logMe}
        currentClass="authButtonDesign button-4"
      />
      <div className="fieldError">{msgError}</div>
    </div>
  );
};
