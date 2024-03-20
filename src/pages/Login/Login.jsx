import { useState, useEffect } from "react"
import { AuthButton } from "../../common/AuthButton/AuthButton"
import { AuthInput } from "../../common/AuthInput/AuthInput"
import { Header } from "../../common/Header/Header"

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  let fetched = {};
  sessionStorage.setItem("auth", false)

  return (
    <div className="loginDesign">
      <Header />
      <AuthInput
        type="email"
        name="email"
        placeholder="Escribe tu email"
        value={credentials.email || ""}
        functionChange={inputHandler}
      />
      <AuthInput
        type="password"
        name="password"
        placeholder="Escribe tu password"
        value={credentials.password || ""}
        functionChange={inputHandler}
      />
      <AuthButton
        text="Login"
        functionClick={logMe}
        currentClass="buttonDesign"
      />
    </div>
  )
}
