import { useState, useEffect } from "react"
import { AuthButton } from "../../common/AuthButton/AuthButton"
import { AuthInput } from "../../common/AuthInput/AuthInput"
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"
import { decodeToken } from "react-jwt"
import { loginMe } from "../../services/apiCalls"

import "./Login.css"

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  let fetched = {};
  sessionStorage.setItem("auth", false)

  const navigate = useNavigate()

    const inputHandler = (e) => {
        setCredentials( (fields) => ({
            ...fields,
            [e.target.name]: e.target.value
        }))
    }

    const logMe = async () => {
        for(let credential in credentials){
            if(credentials[credential] === ""){
               setMsgError("No has rellenado todos los campos")
               return;
            }
        }
      
        fetched = await loginMe(credentials)
      
        if (!fetched.success) {
            setMsgError(fetched.message)
            return
        }

        const decoded = decodeToken(fetched.token)

        sessionStorage.setItem("token", fetched.token)
        sessionStorage.setItem("user", JSON.stringify(decoded))
        sessionStorage.setItem("userName", decoded.userName)
        sessionStorage.setItem("auth", true)
        navigate("/")
    }

  return (
    <div className="loginDesign">
      <Header />
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
        text="Login"
        functionClick={logMe}
        currentClass="authButtonDesign button-4"
      />
    </div>
  )
}
