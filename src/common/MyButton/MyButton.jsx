import "./MyButton.css";

export const MyButton = ({ text, functionClick, currentClass }) => {
  return (
    <div onClick={functionClick} className={currentClass}>
      {text}
    </div>
  );
};
