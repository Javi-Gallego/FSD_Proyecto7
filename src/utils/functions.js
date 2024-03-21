export const validate = (type, value) => {
  switch (type) {
    case "userName":
    case "name":
    case "firstName":
    case "lastName":
      if (value.length < 3) {
        return "Por favor, el nombre debe de tener mínimo tres caracteres."
      }

      return ""

    case "email":
    case "e-mail":
    case "correo":
    case "mail":
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

      if (!emailRegex.test(value)) {
        return "Por favor, el formato del email debe de ser correcto."
      }

      return ""

    case "password":
    case "contraseña":
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,14}$/
      if (!passwordRegex.test(value)) {
        return "El password debe tener entre 6 y 14 caracteres, simbolo, mayúscula y minúscula"
      }

      return ""
    default:
      console.log("You wanted to validate a field that is not implemented.")
  }
}
