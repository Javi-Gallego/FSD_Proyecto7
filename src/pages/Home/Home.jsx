
import { RocketIcon } from "../../common/RocketIcon/RocketIcon";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <div className="homeDesign">
        <div className="logoHome">
          <div className="title">Rocket Network</div>
          <RocketIcon color="var(--secondary-color)" />
        </div>
      </div>
    </>
  );
};
