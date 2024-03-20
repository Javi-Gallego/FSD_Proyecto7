import { Header } from "../../common/Header/Header"
import MainImage from "../../img/SocialNetwork.jpg"
import "./Home.css"

export const Home = () => {
  return (
    <div className="homeDesign">
      <Header />
      <img src={MainImage} />
    </div>
  )
}
