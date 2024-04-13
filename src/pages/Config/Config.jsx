import { useEffect, useState } from "react";
import "./Config.css";
import camera from "../../assets/camera.svg";
import { CameraIcon } from "../../common/CameraIcon/CameraIcon";

export const Config = () => {
  const [primaryColor, setPrimaryColor] = useState("#ffffff");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");

  useEffect(() => {
    const root = document.documentElement;
    const primColor = root.style.getPropertyValue("--primary-color");
    const secColor = root.style.getPropertyValue("--secondary-color");
    setPrimaryColor(primColor);
    setSecondaryColor(secColor);
  }, [primaryColor, secondaryColor]);

  const handleChange = (event) => {
    const root = document.documentElement;
    if (event.target.name === "primaryColor") {
        setPrimaryColor(event.target.value);
      root.style.setProperty("--primary-color", event.target.value);
    }
    if (event.target.name === "secondaryColor") {
        setSecondaryColor(event.target.value);
      root.style.setProperty("--secondary-color", event.target.value);
    }
  };

  return (
    <div className="configDesign">
        Elige el color principal para la app
      <input
        name="primaryColor"
        type="color"
        onChange={handleChange}
        value={primaryColor}
      ></input>
        Elige el color secundario para la app
      <input
        name="secondaryColor"
        type="color"
        onChange={handleChange}
        value={secondaryColor}
      ></input>
    </div>
  );
};
