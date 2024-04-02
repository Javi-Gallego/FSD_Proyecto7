import "./MyInput.css"

export const MyInput = ({
  type,
  name,
  placeholder,
  value,
  onChangeFunction,
  className
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChangeFunction}
      className={className}
    />
  )
}