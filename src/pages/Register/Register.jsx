import { useState } from "react"
import { AuthButton } from "../../common/AuthButton/AuthButton"
import { AuthInput } from "../../common/AuthInput/AuthInput"
import { Header } from "../../common/Header/Header"
import { registerMe } from "../../services/apiCalls"
import "./Register.css"
import { useNavigate } from "react-router-dom"

export const Register = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: ""
  })

  let fetched = {}

  const inputHandler = (e) => {
    setCredentials((fields) => ({
      ...fields,
      [e.target.name]: e.target.value
    }))
  }

  const regUser = async () => {
    for (let credential in credentials) {
      if (credentials[credential] === "") {
        setMsgError("No has rellenado todos los campos")
        return
      }
    }

    fetched = await registerMe(credentials)

    if (!fetched.success) {
      setMsgError(fetched.message)
      return
    }

    navigate("/registerSuccess")
  }

  return (
    <div className="registerDesign">
      <Header />
      <div className="separator"></div>
      <AuthInput
        type="userName"
        name="userName"
        placeholder="Escribe tu nombre de usuario"
        value={credentials.userName || ""}
        functionChange={inputHandler}
      />
      <div className="separator"></div>
      <AuthInput
        type="email"
        name="email"
        placeholder="Escribe tu email"
        value={credentials.email || ""}
        functionChange={inputHandler}
      />
      <div className="separator"></div>
      <AuthInput
        type="password"
        name="password"
        placeholder="Escribe tu password"
        value={credentials.password || ""}
        functionChange={inputHandler}
      />
      <div className="separator"></div>
      <AuthButton
        text="Register"
        functionClick={regUser}
        currentClass="authButtonDesign button-4"
      />
    </div>
  )
}
