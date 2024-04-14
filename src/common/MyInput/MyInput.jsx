import "./MyInput.css";

export const MyInput = ({
  type,
  name,
  placeholder,
  value,
  disabled,
  onChangeFunction,
  className,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChangeFunction}
      className={className}
    />
  );
};
