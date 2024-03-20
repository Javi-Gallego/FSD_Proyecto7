import "./HeaderLink.css"
import { useNavigate } from "react-router-dom"

export const HeaderLink = ({ title, destination }) => {
  const navigate = useNavigate()

  return (
    <div className="headerLinkDesign" onClick={() => navigate(destination)}>
      {title}
    </div>
  )
}
