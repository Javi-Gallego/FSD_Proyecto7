import { useState } from "react";
import { AuthButton } from "../../common/AuthButton/AuthButton";
import { MyInput } from "../../common/MyInput/MyInput";
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
    for (let field in userError) {
      if (userError[field] !== "") {
        let newField = field.replace("Error", "");
        setMsgError(`No has rellenado correctamente el ${newField}`);
        return;
      }
    }

    fetched = await registerMe(credentials);

    navigate("/registerSuccess");

    if (!fetched.success) {
      setMsgError(fetched.message);
      return;
    }
  };

  return (
    <div className="registerDesign">
      <div className="separator"></div>
      <MyInput
        className={`authInputDesign ${
          userError.userNameError !== "" ? "authInputDesignError" : ""
        }`}
        type="userName"
        name="userName"
        placeholder="Escribe tu nombre de usuario"
        value={credentials.userName || ""}
        onChangeFunction={inputHandler}
      />
      <div className="fieldEr">{userError.userNameError}</div>
      <MyInput
        className={`authInputDesign ${
          userError.emailError !== "" ? "authInputDesignError" : ""
        }`}
        type="email"
        name="email"
        placeholder="Escribe tu email"
        value={credentials.email || ""}
        onChangeFunction={inputHandler}
      />
      <div className="fieldEr">{userError.emailError}</div>
      <MyInput
        className={`authInputDesign ${
          userError.passwordError !== "" ? "authInputDesignError" : ""
        }`}
        type="password"
        name="password"
        placeholder="Escribe tu password"
        value={credentials.password || ""}
        onChangeFunction={inputHandler}
      />
      <div className="fieldEr">{userError.passwordError}</div>
      <AuthButton
        text="Register"
        functionClick={regUser}
        currentClass="authButtonDesign button-4"
      />
      <div className="error">{msgError}</div>
    </div>
  );
};
