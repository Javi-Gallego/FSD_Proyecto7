import { useState } from "react";
import { AuthButton } from "../../common/AuthButton/AuthButton";
import { AuthInput } from "../../common/AuthInput/AuthInput";
import { Header } from "../../common/Header/Header";
import { registerMe } from "../../services/apiCalls";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/functions";

export const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    userNameError: "",
    emailError: "",
    passwordError: "",
  });

  const [msgError, setMsgError] = useState("");

  const checkError = (e) => {
    const error = validate(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  let fetched = {};

  const inputHandler = (e) => {
    setCredentials((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));

    checkError(e);
  };

  const regUser = async () => {
    for (let credential in credentials) {
      if (credentials[credential] === "") {
        setMsgError("No has rellenado todos los campos");
        return;
      }
    }

    fetched = await registerMe(credentials);

    if (!fetched.success) {
      setMsgError(fetched.message);
      return;
    }

    navigate("/registerSuccess");
  };

  return (
    <div className="registerDesign">
      <Header />
      <div className="separator"></div>
      <AuthInput
        className={`authInputDesign ${
          userError.userNameError !== "" ? "authInputDesignError" : ""
        }`}
        type="userName"
        name="userName"
        placeholder="Escribe tu nombre de usuario"
        value={credentials.userName || ""}
        onChangeFunction={inputHandler}
        // onBlurFunction={checkError}
      />
      <div className="error">{userError.userNameError}</div>
      <AuthInput
        className={`authInputDesign ${
          userError.emailError !== "" ? "authInputDesignError" : ""
        }`}
        type="email"
        name="email"
        placeholder="Escribe tu email"
        value={credentials.email || ""}
        onChangeFunction={inputHandler}
        // onBlurFunction={checkError}
      />
      <div className="error">{userError.emailError}</div>
      <AuthInput
        className={`authInputDesign ${
          userError.passwordError !== "" ? "authInputDesignError" : ""
        }`}
        type="password"
        name="password"
        placeholder="Escribe tu password"
        value={credentials.password || ""}
        onChangeFunction={inputHandler}
        // onBlurFunction={checkError}
      />
      <div className="error">{userError.passwordError}</div>
      <AuthButton
        text="Register"
        functionClick={regUser}
        currentClass="authButtonDesign button-4"
      />
      <div className="error">{msgError}</div>
    </div>
  );
};
