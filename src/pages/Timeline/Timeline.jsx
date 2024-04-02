
import { useEffect, useState } from "react"
import { Header } from "../../common/Header/Header"
import { TablonTimeline } from "../../common/TablonTimeline/TablonTimeline"
import { getTimeline } from "../../services/apiCalls"
import "./Timeline.css"

export const Timeline = () => {

    const [msg, setMsg] = useState({}) 

    useEffect(() => {
        if (Object.keys(msg).length === 0) {
            getData()
        }        
    }, [msg])

    const getData = async () => {
        try {
            if (sessionStorage.getItem("auth") === "true") {
                const token = sessionStorage.getItem("token")
                const currentTimeline = await getTimeline(token)
                setMsg(currentTimeline)
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="timelineDesign">
            <Header />
            {Object.keys(msg).length !== 0 &&
                <TablonTimeline tablon={msg}/>
            }
        </div>            
    )
}