import "./AuthInput.css"

export const AuthInput = ({
  type,
  name,
  placeholder,
  value,
  onChangeFunction,
  onBlurFunction,
  className
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChangeFunction}
      onBlur={onBlurFunction}
      className={className}
    />
  )
}