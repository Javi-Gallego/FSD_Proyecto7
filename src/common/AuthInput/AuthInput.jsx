import "./AuthInput.css"

export const AuthInput = ({
  type,
  name,
  placeholder,
  value,
  functionChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={functionChange}
      className="authInputDesign"
    />
  )
}