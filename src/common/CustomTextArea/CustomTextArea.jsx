import "./CustomTextArea.css";

export const CustomTextArea = ({
  type,
  name,
  value,
  disabled,
  onChangeFunction,
  className,
  maxLength,
}) => {
  return (
    <textarea
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChangeFunction}
      className={className}
      maxLength={maxLength}
    />
  );
};
