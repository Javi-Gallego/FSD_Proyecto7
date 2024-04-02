import "./AuthButton.css";

export const AuthButton = ({ text, functionClick, currentClass }) => {
  return (
    <div onClick={functionClick} className={currentClass}>
      {text}
    </div>
  );
};
